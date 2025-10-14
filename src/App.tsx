import { FormEvent, useEffect, useMemo, useState } from 'react';
import './App.css';

type FocusItem = {
  id: string;
  title: string;
  targetHours: number;
  spentHours: number;
};

const initialFocus: FocusItem[] = [
  {
    id: 'deep-work',
    title: 'Deep Work Blocks',
    targetHours: 10,
    spentHours: 3.5,
  },
  {
    id: 'collaboration',
    title: 'Collaboration & 1:1s',
    targetHours: 6,
    spentHours: 4,
  },
  {
    id: 'learning',
    title: 'Learning & Growth',
    targetHours: 4,
    spentHours: 1.5,
  },
];

type WeekStorage = Record<string, FocusItem[]>;

type PersistedWeeksPayload = {
  schemaVersion: number;
  appVersion: string;
  weeks: WeekStorage;
};

const STORAGE_SCHEMA_VERSION = 1;

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
const LEGACY_STORAGE_KEYS = ['weeker:weeks:v1'];
const APP_VERSION = import.meta.env.VITE_APP_VERSION ?? '0.0.0';
const DAY_LENGTH_MS = 24 * 60 * 60 * 1000;

const cloneFocusItems = (items: FocusItem[]): FocusItem[] =>
  items.map((item) => ({ ...item }));

const sanitizeFocusItems = (items: unknown): FocusItem[] => {
  if (!Array.isArray(items)) return [];

  return items
    .filter((item): item is FocusItem =>
      typeof item === 'object' &&
      item !== null &&
      typeof item.id === 'string' &&
      typeof item.title === 'string' &&
      typeof item.targetHours === 'number' &&
      typeof item.spentHours === 'number',
    )
    .map((item) => ({
      ...item,
      targetHours: Number.isFinite(item.targetHours) ? item.targetHours : 0,
      spentHours: Number.isFinite(item.spentHours) ? item.spentHours : 0,
    }));
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
        const legacyParsed = JSON.parse(legacyRaw) as WeekStorage;
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

const getElapsedWeekDays = (start: Date, today: Date): number => {
  const normalizedStart = normalizeToStartOfDay(start);
  const weekStartUtc = Date.UTC(
    normalizedStart.getFullYear(),
    normalizedStart.getMonth(),
    normalizedStart.getDate(),
  );
  const nextWeekUtc = Date.UTC(
    normalizedStart.getFullYear(),
    normalizedStart.getMonth(),
    normalizedStart.getDate() + 7,
  );
  const todayUtc = Date.UTC(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  const clampedUtc = Math.min(Math.max(todayUtc, weekStartUtc), nextWeekUtc);
  return Math.floor((clampedUtc - weekStartUtc) / DAY_LENGTH_MS);
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
      a.spentHours !== b.spentHours
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
  const [newTarget, setNewTarget] = useState('4');
  const [weeksData, setWeeksData] = useState<WeekStorage>({});
  const [storageReady, setStorageReady] = useState(false);
  const [today, setToday] = useState(() => new Date());

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

    if (!storedWeeks[currentWeekKey]) {
      storedWeeks[currentWeekKey] = cloneFocusItems(initialFocus).map((item) => ({
        ...item,
        spentHours: 0,
      }));
    }

    setWeeksData(storedWeeks);
    setStorageReady(true);
  }, [currentWeekKey]);

  useEffect(() => {
    if (!storageReady) return;

    const storedItems = weeksData[selectedWeekKey];

    if (storedItems) {
      if (!areFocusItemsEqual(storedItems, focusItems)) {
        setFocusItems(cloneFocusItems(storedItems));
      }
    } else if (selectedWeekKey === currentWeekKey) {
      const baseItems = cloneFocusItems(initialFocus).map((item) => ({
        ...item,
        spentHours: 0,
      }));
      setFocusItems(baseItems);
      setWeeksData((prev: WeekStorage) => ({
        ...prev,
        [selectedWeekKey]: baseItems,
      }));
    } else if (focusItems.length > 0) {
      setFocusItems([]);
    }
  }, [selectedWeekKey, weeksData, storageReady, currentWeekKey, focusItems]);

  useEffect(() => {
    if (!storageReady) return;

    setWeeksData((prev: WeekStorage) => {
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

  const sortedWeekKeys = useMemo(() => {
    const keys = Object.keys(weeksData);
    if (!keys.includes(currentWeekKey)) {
      keys.push(currentWeekKey);
    }

    return keys.sort((a, b) => (a < b ? 1 : -1));
  }, [weeksData, currentWeekKey]);

  const selectedWeekStart = useMemo(
    () => parseWeekKey(selectedWeekKey),
    [selectedWeekKey],
  );
  const selectedWeekLabel = useMemo(
    () => formatWeekLabel(selectedWeekStart),
    [selectedWeekStart],
  );
  const isCurrentWeek = selectedWeekKey === currentWeekKey;
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

  const daysCompletedLabel = useMemo(() => {
    if (!isCurrentWeek) {
      return selectedWeekStart.getTime() > today.getTime()
        ? 'Week not started'
        : 'Week complete';
    }

    const elapsedDays = getElapsedWeekDays(selectedWeekStart, today);

    return `${elapsedDays} of 7 days`;
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

  const handleAddFocus = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isCurrentWeek) {
      return;
    }

    const trimmedTitle = newTitle.trim();
    const parsedTarget = Number(newTarget);

    if (!trimmedTitle || Number.isNaN(parsedTarget) || parsedTarget <= 0) {
      return;
    }

    const newItem: FocusItem = {
      id: `focus-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
      title: trimmedTitle,
      targetHours: Math.min(parsedTarget, 80),
      spentHours: 0,
    };

    setFocusItems((items: FocusItem[]) => [newItem, ...items]);
    setNewTitle('');
    setNewTarget(parsedTarget.toString());
  };

  const updateSpentHours = (id: string, newSpent: number) => {
    if (!isCurrentWeek) return;

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
    if (!isCurrentWeek) return;

    const current = focusItems.find((item: FocusItem) => item.id === id);
    if (!current) return;

    updateSpentHours(id, current.spentHours + delta);
  };

  const removeFocusItem = (id: string) => {
    if (!isCurrentWeek) return;

    setFocusItems((items: FocusItem[]) =>
      items.filter((item: FocusItem) => item.id !== id),
    );
  };

  const resetWeek = () => {
    if (!isCurrentWeek) return;

    setFocusItems((items: FocusItem[]) =>
      items.map((item: FocusItem) => ({
        ...item,
        spentHours: 0,
      })),
    );
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
        <button
          className="reset-button"
          type="button"
          onClick={resetWeek}
          disabled={!isCurrentWeek}
        >
          Start a fresh week
        </button>
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
              value={selectedWeekKey}
              onChange={(event) => setSelectedWeekKey(event.target.value)}
            >
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
          <span className="summary__hint">{daysCompletedLabel}</span>
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
              disabled={!isCurrentWeek}
              required
            />
          </label>
          <label className="planner__field">
            <span>Target time (hours)</span>
            <input
              type="number"
              min="0.5"
              step="0.5"
              value={newTarget}
              onChange={(event) => setNewTarget(event.target.value)}
              disabled={!isCurrentWeek}
              required
            />
          </label>
          <button
            type="submit"
            className="primary-button"
            disabled={!isCurrentWeek}
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
              const sliderMax = Math.max(
                item.targetHours,
                item.spentHours,
                item.targetHours * 1.5,
              );
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
                      <h3>{item.title}</h3>
                      <p className="focus-card__target">
                        Target {item.targetHours.toFixed(1)}h ·{' '}
                        {isAchieved ? 'Achieved' : 'In progress'}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="icon-button"
                      onClick={() => removeFocusItem(item.id)}
                      disabled={!isCurrentWeek}
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

                  <label className="focus-card__slider">
                    <span>Logged time</span>
                    <input
                      type="range"
                      min={0}
                      max={sliderMax}
                      step={0.25}
                      value={item.spentHours}
                      onChange={(event) =>
                        updateSpentHours(item.id, Number(event.target.value))
                      }
                      disabled={!isCurrentWeek}
                      aria-label={`Logged hours for ${item.title}`}
                    />
                  </label>

                  <div className="focus-card__actions">
                    <div className="actions__group">
                      <button
                        type="button"
                        onClick={() => adjustSpent(item.id, -0.5)}
                        disabled={!isCurrentWeek || item.spentHours <= 0}
                      >
                        -0.5h
                      </button>
                      <button
                        type="button"
                        onClick={() => adjustSpent(item.id, 0.5)}
                        disabled={!isCurrentWeek}
                      >
                        +0.5h
                      </button>
                      <button
                        type="button"
                        onClick={() => adjustSpent(item.id, 1)}
                        disabled={!isCurrentWeek}
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
