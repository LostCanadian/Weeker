import {
  ChangeEvent,
  FocusEvent,
  FormEvent,
  KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import './App.css';

type FocusItem = {
  id: string;
  title: string;
  targetHours: number;
  spentHours: number;
  note: string;
};

const initialFocus: FocusItem[] = [];

type WeekStorage = Record<string, FocusItem[]>;

type PersistedWeeksPayload = {
  schemaVersion: number;
  appVersion: string;
  weeks: WeekStorage;
};

const STORAGE_SCHEMA_VERSION = 2;

const STORAGE_NAMESPACE = (() => {
  const explicit = import.meta.env.VITE_STORAGE_NAMESPACE?.trim();
  if (explicit) {
    return explicit;
  }

  const mode = import.meta.env.MODE;
  switch (mode) {
    case 'development':
      return 'dev';
    case 'test':
      return 'test';
    case 'production':
    default:
      return 'prod';
  }
})();

const STORAGE_KEY = `weeker:${STORAGE_NAMESPACE}:weeks:v${STORAGE_SCHEMA_VERSION}`;
const LEGACY_STORAGE_KEYS = [
  'weeker:weeks:v1',
  `weeker:${STORAGE_NAMESPACE}:weeks:v1`,
];
const APP_VERSION = import.meta.env.VITE_APP_VERSION ?? '0.0.0';
const HOUR_LENGTH_MS = 60 * 60 * 1000;

const cloneFocusItems = (items: FocusItem[]): FocusItem[] =>
  items.map((item) => ({ ...item }));

const sanitizeFocusItems = (items: unknown): FocusItem[] => {
  if (!Array.isArray(items)) return [];

  const sanitized: FocusItem[] = [];

  for (const raw of items) {
    if (!raw || typeof raw !== 'object') continue;

    const item = raw as Record<string, unknown>;
    const id = typeof item.id === 'string' ? item.id : null;
    const title = typeof item.title === 'string' ? item.title : null;
    const targetHours = typeof item.targetHours === 'number' ? item.targetHours : null;
    const spentHours = typeof item.spentHours === 'number' ? item.spentHours : null;

    if (!id || !title || targetHours === null || spentHours === null) {
      continue;
    }

    sanitized.push({
      id,
      title,
      targetHours: Number.isFinite(targetHours) ? targetHours : 0,
      spentHours: Number.isFinite(spentHours) ? spentHours : 0,
      note: typeof item.note === 'string' ? item.note : '',
    });
  }

  return sanitized;
};

const sanitizeWeekStorage = (value: unknown): WeekStorage => {
  if (!value || typeof value !== 'object') {
    return {};
  }

  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>).flatMap(
      ([weekKey, items]) => {
        if (typeof weekKey !== 'string' || !Array.isArray(items)) {
          return [];
        }

        return [[weekKey, cloneFocusItems(sanitizeFocusItems(items))]];
      },
    ),
  );
};

const storageAdapter = {
  load(): WeekStorage {
    if (typeof window === 'undefined') return {};

    const readPayload = (raw: string | null): PersistedWeeksPayload | null => {
      if (!raw) return null;

      try {
        const parsed = JSON.parse(raw) as PersistedWeeksPayload;
        if (
          typeof parsed !== 'object' ||
          parsed === null ||
          typeof parsed.schemaVersion !== 'number' ||
          typeof parsed.weeks !== 'object'
        ) {
          return null;
        }

        if (parsed.schemaVersion !== STORAGE_SCHEMA_VERSION) {
          console.warn(
            `Unsupported storage schema version ${parsed.schemaVersion}; expected ${STORAGE_SCHEMA_VERSION}.`,
          );
        }

        return parsed;
      } catch (error) {
        console.warn('Unable to parse stored weekly focus data.', error);
        return null;
      }
    };

    const activeRaw = window.localStorage.getItem(STORAGE_KEY);
    const activePayload = readPayload(activeRaw);
    if (activePayload) {
      return sanitizeWeekStorage(activePayload.weeks);
    }

    for (const legacyKey of LEGACY_STORAGE_KEYS) {
      const legacyRaw = window.localStorage.getItem(legacyKey);
      if (!legacyRaw) continue;

      try {
        const payload = readPayload(legacyRaw);
        const legacyParsed = payload ? payload.weeks : JSON.parse(legacyRaw);
        const sanitized = sanitizeWeekStorage(legacyParsed);
        this.save(sanitized);
        window.localStorage.removeItem(legacyKey);
        return sanitized;
      } catch (error) {
        console.warn(
          `Unable to migrate legacy weekly focus data from ${legacyKey}.`,
          error,
        );
      }
    }

    return {};
  },
  save(weeks: WeekStorage) {
    if (typeof window === 'undefined') return;

    const payload: PersistedWeeksPayload = {
      schemaVersion: STORAGE_SCHEMA_VERSION,
      appVersion: APP_VERSION,
      weeks: sanitizeWeekStorage(weeks),
    };

    try {
      const serialized = JSON.stringify(payload);
      window.localStorage.setItem(STORAGE_KEY, serialized);
    } catch (error) {
      console.warn('Unable to persist weekly focus data.', error);
    }
  },
};

const normalizeToStartOfDay = (date: Date): Date => {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
};

const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const getStartOfWeek = (date: Date): Date => {
  const result = new Date(date);
  const day = result.getDay();
  const diff = (day + 6) % 7; // Shift so Monday is the first day of the week
  result.setHours(0, 0, 0, 0);
  result.setDate(result.getDate() - diff);
  return result;
};

const getEndOfWeek = (start: Date): Date => {
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return end;
};

const getNextWeekStart = (start: Date): Date =>
  normalizeToStartOfDay(addDays(start, 7));

const getWeekDurationMs = (start: Date): number => {
  const normalizedStart = normalizeToStartOfDay(start);
  const nextWeekStart = getNextWeekStart(normalizedStart);
  return nextWeekStart.getTime() - normalizedStart.getTime();
};

const clampToWeek = (start: Date, value: number): number => {
  const normalizedStart = normalizeToStartOfDay(start);
  const nextWeekStart = getNextWeekStart(normalizedStart);
  return Math.min(
    Math.max(value, normalizedStart.getTime()),
    nextWeekStart.getTime(),
  );
};

const getElapsedWeekHours = (start: Date, today: Date): number => {
  const normalizedStart = normalizeToStartOfDay(start);
  const clampedNow = clampToWeek(normalizedStart, today.getTime());
  return (clampedNow - normalizedStart.getTime()) / HOUR_LENGTH_MS;
};

const formatWeekKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const parseWeekKey = (key: string): Date => {
  const [year, month, day] = key.split('-').map(Number);
  return normalizeToStartOfDay(new Date(year, month - 1, day));
};

const formatWeekLabel = (start: Date): string => {
  const end = getEndOfWeek(start);
  const dateFormatter = new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
  });
  const startLabel = dateFormatter.format(start);
  const endLabel = dateFormatter.format(end);
  const yearLabel =
    start.getFullYear() === end.getFullYear()
      ? String(start.getFullYear())
      : `${start.getFullYear()} / ${end.getFullYear()}`;

  return `${startLabel} – ${endLabel}, ${yearLabel}`;
};

const areFocusItemsEqual = (
  left: FocusItem[] | undefined,
  right: FocusItem[] | undefined,
): boolean => {
  if (left === right) return true;
  if (!left || !right) return false;
  if (left.length !== right.length) return false;

  for (let index = 0; index < left.length; index += 1) {
    const a = left[index];
    const b = right[index];
    if (
      a.id !== b.id ||
      a.title !== b.title ||
      a.targetHours !== b.targetHours ||
      a.spentHours !== b.spentHours ||
      a.note !== b.note
    ) {
      return false;
    }
  }

  return true;
};

function App() {
  const [focusItems, setFocusItems] = useState<FocusItem[]>(() =>
    cloneFocusItems(initialFocus),
  );
  const [newTitle, setNewTitle] = useState('');
  const [newTarget, setNewTarget] = useState(4);
  const [weeksData, setWeeksData] = useState<WeekStorage>({});
  const [storageReady, setStorageReady] = useState(false);
  const [today, setToday] = useState(() => new Date());
  const focusItemsRef = useRef<FocusItem[]>(focusItems);
  const suppressNextPersistRef = useRef(false);
  const [activeEdit, setActiveEdit] = useState<
    | {
        id: string;
        field: 'title' | 'target';
        value: string;
      }
    | null
  >(null);
  const cancelEditRef = useRef(false);
  const editInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const intervalId = window.setInterval(() => {
      setToday(new Date());
    }, 60_000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const currentWeekStart = useMemo(() => getStartOfWeek(today), [today]);
  const currentWeekKey = useMemo(
    () => formatWeekKey(currentWeekStart),
    [currentWeekStart],
  );
  const [selectedWeekKey, setSelectedWeekKey] = useState(currentWeekKey);

  useEffect(() => {
    setSelectedWeekKey(currentWeekKey);
  }, [currentWeekKey]);

  useEffect(() => {
    const storedWeeks = storageAdapter.load();

    setWeeksData(storedWeeks);
    setStorageReady(true);
  }, []);

  useEffect(() => {
    focusItemsRef.current = focusItems;
  }, [focusItems]);

  useEffect(() => {
    if (!storageReady) return;

    const storedItems = weeksData[selectedWeekKey];
    const currentItems = focusItemsRef.current;

    if (storedItems) {
      if (!areFocusItemsEqual(storedItems, currentItems)) {
        suppressNextPersistRef.current = true;
        setFocusItems(cloneFocusItems(storedItems));
      }
      return;
    }

    if (currentItems.length > 0) {
      suppressNextPersistRef.current = true;
      focusItemsRef.current = [];
      setFocusItems([]);
    }
  }, [selectedWeekKey, weeksData, storageReady]);

  useEffect(() => {
    if (!storageReady) return;

    if (suppressNextPersistRef.current) {
      suppressNextPersistRef.current = false;
      return;
    }

    setWeeksData((prev: WeekStorage) => {
      if (!Object.prototype.hasOwnProperty.call(prev, selectedWeekKey)) {
        return prev;
      }

      const previousItems = prev[selectedWeekKey];
      if (areFocusItemsEqual(previousItems, focusItems)) {
        return prev;
      }

      return {
        ...prev,
        [selectedWeekKey]: cloneFocusItems(focusItems),
      };
    });
  }, [focusItems, storageReady, selectedWeekKey]);

  useEffect(() => {
    if (!storageReady) return;

    storageAdapter.save(weeksData);
  }, [weeksData, storageReady]);

  const sortedWeekKeys = useMemo(
    () => Object.keys(weeksData).sort((a, b) => (a < b ? 1 : -1)),
    [weeksData],
  );

  const selectedWeekStart = useMemo(
    () => parseWeekKey(selectedWeekKey),
    [selectedWeekKey],
  );
  const selectedWeekLabel = useMemo(
    () => formatWeekLabel(selectedWeekStart),
    [selectedWeekStart],
  );
  const isCurrentWeek = selectedWeekKey === currentWeekKey;
  const currentWeekExists = Object.prototype.hasOwnProperty.call(
    weeksData,
    currentWeekKey,
  );
  const canEditCurrentWeek = isCurrentWeek && currentWeekExists;
  const showStartWeekButton = storageReady && !currentWeekExists;
  const selectedWeekEnd = useMemo(
    () => getEndOfWeek(selectedWeekStart),
    [selectedWeekStart],
  );
  const weekProgressPercent = useMemo(() => {
    if (isCurrentWeek) {
      const duration = getWeekDurationMs(selectedWeekStart);
      if (duration <= 0) {
        return 0;
      }

      const clampedNow = clampToWeek(selectedWeekStart, today.getTime());
      const elapsed = clampedNow - selectedWeekStart.getTime();
      return (elapsed / duration) * 100;
    }

    if (today.getTime() < selectedWeekStart.getTime()) {
      return 0;
    }

    return 100;
  }, [isCurrentWeek, selectedWeekStart, today]);

  const hoursCompletedLabel = useMemo(() => {
    if (!isCurrentWeek) {
      return selectedWeekStart.getTime() > today.getTime()
        ? 'Week not started'
        : 'Week complete';
    }

    const elapsedHours = getElapsedWeekHours(selectedWeekStart, today);
    const weekDurationHours = getWeekDurationMs(selectedWeekStart) / HOUR_LENGTH_MS;

    return `${elapsedHours.toFixed(1)} of ${weekDurationHours.toFixed(1)} hours`;
  }, [isCurrentWeek, selectedWeekStart, today]);

  const currentDayLabel = useMemo(() => {
    const formatter = new Intl.DateTimeFormat(undefined, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });

    if (isCurrentWeek) {
      return `Today is ${formatter.format(today)}`;
    }

    if (selectedWeekStart.getTime() > today.getTime()) {
      return `Starts ${formatter.format(selectedWeekStart)}`;
    }

    return `Completed ${formatter.format(selectedWeekEnd)}`;
  }, [isCurrentWeek, today, selectedWeekStart, selectedWeekEnd]);

  const summary = useMemo(() => {
    const totals = focusItems.reduce<{ target: number; spent: number }>(
      (acc: { target: number; spent: number }, item: FocusItem) => {
        acc.target += item.targetHours;
        acc.spent += item.spentHours;
        return acc;
      },
      { target: 0, spent: 0 },
    );

    const achievedCount = focusItems.filter(
      (item: FocusItem) =>
        item.spentHours >= item.targetHours && item.targetHours > 0,
    ).length;

    return {
      ...totals,
      achievedCount,
    };
  }, [focusItems]);

  const weekSelectValue = sortedWeekKeys.includes(selectedWeekKey)
    ? selectedWeekKey
    : '';
  const reviewPlaceholder =
    sortedWeekKeys.length === 0
      ? 'No weeks to review yet'
      : 'Select a week to review';

  const handleAddFocus = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canEditCurrentWeek) {
      return;
    }

    const trimmedTitle = newTitle.trim();
    if (!trimmedTitle || !Number.isFinite(newTarget) || newTarget <= 0) {
      return;
    }

    const normalizedTarget = Math.min(
      Math.max(Math.round(newTarget * 2) / 2, 0.5),
      80,
    );

    const newItem: FocusItem = {
      id: `focus-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
      title: trimmedTitle,
      targetHours: normalizedTarget,
      spentHours: 0,
      note: '',
    };

    setFocusItems((items: FocusItem[]) => [newItem, ...items]);
    setNewTitle('');
    setNewTarget(normalizedTarget);
  };

  const adjustNewTarget = (delta: number) => {
    if (!canEditCurrentWeek) return;

    setNewTarget((current) => {
      const next = Math.min(
        Math.max(Math.round((current + delta) * 2) / 2, 0.5),
        80,
      );
      return next;
    });
  };

  const updateSpentHours = (id: string, newSpent: number) => {
    if (!canEditCurrentWeek) return;

    setFocusItems((items: FocusItem[]) =>
      items.map((item: FocusItem) =>
        item.id === id
          ? {
              ...item,
              spentHours: Math.max(0, Math.min(newSpent, 120)),
            }
          : item,
      ),
    );
  };

  const adjustSpent = (id: string, delta: number) => {
    if (!canEditCurrentWeek) return;

    const current = focusItems.find((item: FocusItem) => item.id === id);
    if (!current) return;

    updateSpentHours(id, current.spentHours + delta);
  };

  const updateFocusTitle = (id: string, title: string) => {
    if (!canEditCurrentWeek) return;

    const trimmed = title.trim();
    if (!trimmed) return;

    setFocusItems((items: FocusItem[]) =>
      items.map((item: FocusItem) =>
        item.id === id
          ? {
              ...item,
              title: trimmed,
            }
          : item,
      ),
    );
  };

  const updateTargetHours = (id: string, target: number) => {
    if (!canEditCurrentWeek) return;

    if (Number.isNaN(target) || target <= 0) {
      return;
    }

    const normalized = Math.min(Math.max(Math.round(target * 2) / 2, 0.5), 80);

    setFocusItems((items: FocusItem[]) =>
      items.map((item: FocusItem) =>
        item.id === id
          ? {
              ...item,
              targetHours: normalized,
            }
          : item,
      ),
    );
  };

  const updateFocusNote = (id: string, note: string) => {
    if (!canEditCurrentWeek) return;

    setFocusItems((items: FocusItem[]) =>
      items.map((item: FocusItem) =>
        item.id === id
          ? item.note === note
            ? item
            : {
                ...item,
                note,
              }
          : item,
      ),
    );
  };

  useEffect(() => {
    if (!activeEdit) return;

    const node = editInputRef.current;
    if (!node) return;

    const raf = typeof window !== 'undefined' ? window.requestAnimationFrame : null;
    if (raf) {
      raf(() => {
        node.focus();
        node.select();
      });
      return;
    }

    node.focus();
    node.select();
  }, [activeEdit?.id, activeEdit?.field]);

  const startEditing = (item: FocusItem, field: 'title' | 'target') => {
    if (!canEditCurrentWeek) return;

    cancelEditRef.current = false;
    setActiveEdit({
      id: item.id,
      field,
      value: field === 'title' ? item.title : item.targetHours.toString(),
    });
  };

  const cancelEditing = () => {
    cancelEditRef.current = true;
    setActiveEdit(null);
  };

  const commitActiveEdit = () => {
    if (!activeEdit) return;

    const { id, field, value } = activeEdit;

    if (field === 'title') {
      const trimmed = value.trim();
      if (trimmed) {
        updateFocusTitle(id, trimmed);
      }
    } else {
      const parsed = Number(value);
      if (!Number.isNaN(parsed) && parsed > 0) {
        updateTargetHours(id, parsed);
      }
    }

    setActiveEdit(null);
  };

  const handleEditChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setActiveEdit((prev) => (prev ? { ...prev, value } : prev));
  };

  const handleEditKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      commitActiveEdit();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      cancelEditing();
    }
  };

  const handleEditBlur = () => {
    if (cancelEditRef.current) {
      cancelEditRef.current = false;
      return;
    }

    commitActiveEdit();
  };

  const removeFocusItem = (id: string) => {
    if (!canEditCurrentWeek) return;

    setFocusItems((items: FocusItem[]) =>
      items.filter((item: FocusItem) => item.id !== id),
    );
  };

  const startCurrentWeek = () => {
    if (currentWeekExists) return;

    const baseItems = cloneFocusItems(initialFocus).map((item) => ({
      ...item,
      spentHours: 0,
    }));

    focusItemsRef.current = baseItems;
    suppressNextPersistRef.current = true;
    setFocusItems(baseItems);
    setWeeksData((prev: WeekStorage) => ({
      ...prev,
      [currentWeekKey]: baseItems,
    }));
    setSelectedWeekKey(currentWeekKey);
  };

  return (
    <main className="app">
      <header className="app__header">
        <div>
          <h1>Weeker</h1>
          <p className="app__tagline">
            Set weekly themes, focus your time, and celebrate what you achieve.
          </p>
        </div>
        {showStartWeekButton && (
          <button
            className="reset-button"
            type="button"
            onClick={startCurrentWeek}
          >
            Start a fresh week
          </button>
        )}
      </header>

      <section className="week-context" aria-label="Week overview">
        <div className="week-context__info">
          <span className="week-context__label">Week of</span>
          <strong className="week-context__title">{selectedWeekLabel}</strong>
          <span className="week-context__day">{currentDayLabel}</span>
        </div>
        <div className="week-context__actions">
          <label className="week-selector">
            <span className="week-selector__label">Review week</span>
            <select
              value={weekSelectValue}
              onChange={(event) => setSelectedWeekKey(event.target.value)}
              disabled={sortedWeekKeys.length === 0}
            >
              <option value="" disabled>
                {reviewPlaceholder}
              </option>
              {sortedWeekKeys.map((weekKey) => {
                const weekStart = parseWeekKey(weekKey);
                return (
                  <option key={weekKey} value={weekKey}>
                    {formatWeekLabel(weekStart)}
                  </option>
                );
              })}
            </select>
          </label>
          {!isCurrentWeek && (
            <span className="week-context__badge" role="status">
              Viewing a previous week
            </span>
          )}
        </div>
      </section>

      <section className="summary" aria-label="Weekly focus summary">
        <div>
          <span className="summary__label">Total target</span>
          <strong>{summary.target.toFixed(1)}h</strong>
        </div>
        <div>
          <span className="summary__label">Time invested</span>
          <strong>{summary.spent.toFixed(1)}h</strong>
        </div>
        <div>
          <span className="summary__label">Achieved focus areas</span>
          <strong>
            {summary.achievedCount} / {focusItems.length}
          </strong>
        </div>
        <div>
          <span className="summary__label">Week progress</span>
          <strong>{weekProgressPercent.toFixed(0)}%</strong>
          <span className="summary__hint">{hoursCompletedLabel}</span>
        </div>
      </section>

      <section className="planner" aria-label="Plan weekly focus areas">
        <form className="planner__form" onSubmit={handleAddFocus}>
          <h2>Add a focus card</h2>
          <label className="planner__field">
            <span>Focus area</span>
            <input
              type="text"
              placeholder="e.g. Product strategy"
              value={newTitle}
              onChange={(event) => setNewTitle(event.target.value)}
              disabled={!canEditCurrentWeek}
              required
            />
          </label>
          <div className="planner__field">
            <span>Target time (hours)</span>
            <div className="planner__target-control">
              <div className="planner__target-display" aria-live="polite">
                <strong>{newTarget.toFixed(1)}h</strong>
              </div>
              <div className="actions__group">
                <button
                  type="button"
                  onClick={() => adjustNewTarget(-0.5)}
                  disabled={!canEditCurrentWeek || newTarget <= 0.5}
                  aria-label="Decrease target by 0.5 hours"
                >
                  -0.5h
                </button>
                <button
                  type="button"
                  onClick={() => adjustNewTarget(0.5)}
                  disabled={!canEditCurrentWeek}
                  aria-label="Increase target by 0.5 hours"
                >
                  +0.5h
                </button>
                <button
                  type="button"
                  onClick={() => adjustNewTarget(1)}
                  disabled={!canEditCurrentWeek}
                  aria-label="Increase target by 1 hour"
                >
                  +1h
                </button>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="primary-button"
            disabled={!canEditCurrentWeek}
          >
            Add focus card
          </button>
        </form>

        <div className="planner__grid">
          {focusItems.length === 0 ? (
            <p className="empty-state">
              Start your week by creating a focus card above. Track how you spend
              your time and mark what you achieve.
            </p>
          ) : (
            focusItems.map((item) => {
              const isAchieved = item.spentHours >= item.targetHours;
              const progressPercent = item.targetHours
                ? Math.min((item.spentHours / item.targetHours) * 100, 120)
                : 0;

              return (
                <article
                  key={item.id}
                  className={`focus-card${isAchieved ? ' focus-card--achieved' : ''}`}
                  aria-label={`${item.title} focus card`}
                >
                  <header className="focus-card__header">
                    <div>
                      <h3>
                        {activeEdit?.id === item.id && activeEdit.field === 'title' ? (
                          <input
                            ref={editInputRef}
                            className="focus-card__editable-input"
                            type="text"
                            value={activeEdit.value}
                            onChange={handleEditChange}
                            onBlur={handleEditBlur}
                            onKeyDown={handleEditKeyDown}
                            aria-label="Focus title"
                            maxLength={80}
                          />
                        ) : (
                          <button
                            type="button"
                            className="focus-card__editable focus-card__editable--title"
                            onClick={() => startEditing(item, 'title')}
                            disabled={!canEditCurrentWeek}
                            aria-label={`Edit title for ${item.title}`}
                          >
                            {item.title}
                          </button>
                        )}
                      </h3>
                      <p className="focus-card__target">
                        <span>Target</span>
                        {activeEdit?.id === item.id && activeEdit.field === 'target' ? (
                          <span className="focus-card__target-editor">
                            <input
                              ref={editInputRef}
                              className="focus-card__editable-input focus-card__target-input"
                              type="number"
                              step={0.5}
                              min={0.5}
                              value={activeEdit.value}
                              onChange={handleEditChange}
                              onBlur={handleEditBlur}
                              onKeyDown={handleEditKeyDown}
                              aria-label="Target hours"
                            />
                            <span className="focus-card__target-suffix" aria-hidden>
                              h
                            </span>
                          </span>
                        ) : (
                          <button
                            type="button"
                            className="focus-card__editable focus-card__editable--target"
                            onClick={() => startEditing(item, 'target')}
                            disabled={!canEditCurrentWeek}
                            aria-label={`Edit target hours for ${item.title}`}
                          >
                            {item.targetHours.toFixed(1)}h
                          </button>
                        )}
                        <span className="focus-card__target-divider" aria-hidden>
                          ·
                        </span>
                        <span>{isAchieved ? 'Achieved' : 'In progress'}</span>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="icon-button"
                      onClick={() => removeFocusItem(item.id)}
                      disabled={!canEditCurrentWeek}
                      aria-label={`Remove ${item.title}`}
                    >
                      ×
                    </button>
                  </header>

                  <div className="focus-card__progress" role="presentation">
                    <div className="progress-track" aria-hidden>
                      <div
                        className="progress-value"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                    <div className="progress-stats">
                      <span>
                        <strong>{item.spentHours.toFixed(1)}h</strong> invested
                      </span>
                      {isAchieved && (
                        <span className="focus-card__badge">Achieved</span>
                      )}
                    </div>
                  </div>
                  <div className="focus-card__actions">
                    <div className="actions__group">
                      <button
                        type="button"
                        onClick={() => adjustSpent(item.id, -0.5)}
                        disabled={!canEditCurrentWeek || item.spentHours <= 0}
                      >
                        -0.5h
                      </button>
                      <button
                        type="button"
                        onClick={() => adjustSpent(item.id, 0.5)}
                        disabled={!canEditCurrentWeek}
                      >
                        +0.5h
                      </button>
                      <button
                        type="button"
                        onClick={() => adjustSpent(item.id, 1)}
                        disabled={!canEditCurrentWeek}
                      >
                        +1h
                      </button>
                    </div>
                    <span className="focus-card__status">
                      {isAchieved
                        ? 'Nice work! Shift attention elsewhere.'
                        : 'Keep investing time here.'}
                    </span>
                  </div>

                  <label className="focus-card__notes">
                    <span>Notes</span>
                    <textarea
                      value={item.note}
                      onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                        updateFocusNote(item.id, event.target.value)
                      }
                      onBlur={(event: FocusEvent<HTMLTextAreaElement>) =>
                        updateFocusNote(
                          item.id,
                          event.currentTarget.value.trimEnd(),
                        )
                      }
                      placeholder="Jot down highlights, learnings, or next steps."
                      rows={3}
                      disabled={!canEditCurrentWeek}
                    />
                  </label>
                </article>
              );
            })
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
