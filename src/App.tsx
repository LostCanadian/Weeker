import {
  ChangeEvent,
  FocusEvent,
  FormEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import './App.css';

import { FocusItem, WeekStorage, initialFocus } from './focus/types';
import { getFocusIcon } from './focus/focusIcons';
import { areFocusItemsEqual, cloneFocusItems } from './focus/utils';
import {
  createPersistedWeeksPayload,
  sanitizeWeekStorage,
  weeksStorage,
} from './storage/weeksStorage';
import {
  calculateWeekProgressPercent,
  formatWeekKey,
  formatWeekLabel,
  getEndOfWeek,
  getStartOfWeek,
  parseWeekKey,
} from './utils/weekDates';

type FocusNotesProps = {
  note: string;
  placeholder: string;
  disabled: boolean;
  onChange: (value: string) => void;
  onBlur: (value: string) => void;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const extractWeeksFromImport = (value: unknown): WeekStorage => {
  if (isRecord(value) && 'weeks' in value) {
    const payload = value as { weeks?: unknown };
    return sanitizeWeekStorage(payload.weeks ?? {});
  }

  return sanitizeWeekStorage(value);
};

const FocusNotes = ({
  note,
  placeholder,
  disabled,
  onChange,
  onBlur,
}: FocusNotesProps) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const overlayContentRef = useRef<HTMLDivElement | null>(null);
  const fieldRef = useRef<HTMLDivElement | null>(null);

  const updateLineHeight = useCallback(() => {
    if (!textareaRef.current || !fieldRef.current || typeof window === 'undefined') {
      return;
    }

    const computedStyles = window.getComputedStyle(textareaRef.current);
    const fontSize = parseFloat(computedStyles.fontSize || '0');
    let lineHeight = computedStyles.lineHeight;

    if (lineHeight === 'normal' && fontSize) {
      lineHeight = `${fontSize * 1.2}px`;
    } else if (!lineHeight.endsWith('px') && fontSize) {
      const numericValue = parseFloat(lineHeight);
      if (!Number.isNaN(numericValue)) {
        lineHeight = `${numericValue * fontSize}px`;
      }
    }

    if (lineHeight) {
      fieldRef.current.style.setProperty('--focus-card-note-line-height', lineHeight);
    }
  }, []);

  const syncOverlayScroll = useCallback(() => {
    if (!textareaRef.current || !overlayContentRef.current) {
      return;
    }

    overlayContentRef.current.style.transform = `translateY(-${textareaRef.current.scrollTop}px)`;
  }, []);

  const adjustTextareaHeight = useCallback(() => {
    if (!textareaRef.current) {
      return;
    }

    const textarea = textareaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;

    syncOverlayScroll();
  }, [syncOverlayScroll]);

  useLayoutEffect(() => {
    adjustTextareaHeight();
    updateLineHeight();
  }, [note, adjustTextareaHeight, updateLineHeight]);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const handleResize = () => {
      updateLineHeight();
      adjustTextareaHeight();
    };
    window.addEventListener('resize', handleResize);

    const fontSet = (document as Document & { fonts?: FontFaceSet }).fonts;
    const handleFontLoad = () => {
      updateLineHeight();
      adjustTextareaHeight();
    };

    fontSet?.addEventListener('loadingdone', handleFontLoad);

    return () => {
      window.removeEventListener('resize', handleResize);
      fontSet?.removeEventListener('loadingdone', handleFontLoad);
    };
  }, [adjustTextareaHeight, updateLineHeight]);

  const lines = note.length > 0 ? note.split('\n') : [];
  const fieldClassName = ['focus-card__notes-field'];
  if (disabled) {
    fieldClassName.push('focus-card__notes-field--disabled');
  }

  return (
    <div className={fieldClassName.join(' ')} ref={fieldRef}>
      <div className="focus-card__notes-overlay" aria-hidden>
        <div
          ref={overlayContentRef}
          className="focus-card__notes-overlay-content"
        >
          {lines.length > 0 ? (
            lines.map((line: string, index: number) => (
              <div className="focus-card__notes-line" key={`${index}-${line}`}>
                <span className="focus-card__notes-bullet" aria-hidden />
                <span className="focus-card__notes-line-text">
                  {line.length > 0 ? line : '\u00A0'}
                </span>
              </div>
            ))
          ) : (
            <div className="focus-card__notes-placeholder">{placeholder}</div>
          )}
        </div>
      </div>
      <textarea
        ref={textareaRef}
        value={note}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
          onChange(event.target.value)
        }
        onBlur={(event: FocusEvent<HTMLTextAreaElement>) =>
          onBlur(event.currentTarget.value)
        }
        onScroll={syncOverlayScroll}
        placeholder={placeholder}
        rows={3}
        disabled={disabled}
        className="focus-card__notes-textarea"
      />
    </div>
  );
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
  const importInputRef = useRef<HTMLInputElement | null>(null);

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
    const storedWeeks = weeksStorage.load();

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

    weeksStorage.save(weeksData);
  }, [weeksData, storageReady]);

  const sortedWeekKeys = useMemo(
    () => Object.keys(weeksData).sort((a, b) => (a < b ? 1 : -1)),
    [weeksData],
  );
  const hasStoredWeeks = sortedWeekKeys.length > 0;

  const handleExportData = useCallback(() => {
    if (!hasStoredWeeks || typeof window === 'undefined') {
      return;
    }

    try {
      const payload = {
        ...createPersistedWeeksPayload(weeksData),
        exportedAt: new Date().toISOString(),
      };
      const serialized = JSON.stringify(payload, null, 2);
      const blob = new Blob([serialized], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const link = document.createElement('a');
      link.href = url;
      link.download = `weeker-backup-${timestamp}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 0);
    } catch (error) {
      console.warn('Unable to export weekly focus data.', error);
    }
  }, [hasStoredWeeks, weeksData]);

  const handleImportClick = useCallback(() => {
    importInputRef.current?.click();
  }, []);

  const handleImportFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const input = event.target;
      const file = input.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        try {
          const text = typeof reader.result === 'string' ? reader.result : '';
          if (!text) {
            throw new Error('Empty file');
          }

          const parsed = JSON.parse(text) as unknown;
          const importedWeeks = extractWeeksFromImport(parsed);

          if (Object.keys(importedWeeks).length === 0) {
            window.alert(
              'No weekly focus data was found in the selected backup file.',
            );
            return;
          }

          setWeeksData((prev: WeekStorage) => ({
            ...prev,
            ...importedWeeks,
          }));
          window.alert('Weekly focus data imported successfully.');
        } catch (error) {
          console.warn('Unable to import weekly focus data.', error);
          window.alert(
            'Unable to import weekly focus data. Please select a valid backup file.',
          );
        } finally {
          input.value = '';
        }
      };
      reader.onerror = () => {
        console.warn('Unable to read the selected backup file.');
        window.alert('Unable to read the selected backup file. Please try again.');
        input.value = '';
      };

      reader.readAsText(file);
    },
    [],
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
  const hasAvailableWeeks = sortedWeekKeys.length > 0;
  const selectedWeekHasData = Object.prototype.hasOwnProperty.call(
    weeksData,
    selectedWeekKey,
  );
  const shouldShowWeekContext = hasAvailableWeeks || currentWeekExists;
  const canEditCurrentWeek = isCurrentWeek && currentWeekExists;
  const showStartWeekButton = storageReady && !currentWeekExists;
  const showTagline = !currentWeekExists;
  const selectedWeekEnd = useMemo(
    () => getEndOfWeek(selectedWeekStart),
    [selectedWeekStart],
  );
  const weekProgressPercent = useMemo(
    () =>
      calculateWeekProgressPercent(selectedWeekStart, today, isCurrentWeek),
    [isCurrentWeek, selectedWeekStart, today],
  );

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

  const timeInvestedPercent = useMemo(() => {
    if (summary.target <= 0) return 0;

    const percent = (summary.spent / summary.target) * 100;
    return Number.isFinite(percent) ? Math.max(percent, 0) : 0;
  }, [summary.spent, summary.target]);

  const weekProgressValue = Number(weekProgressPercent.toFixed(1));
  const timeInvestedValue = Number(timeInvestedPercent.toFixed(1));
  const weekProgressFill = Math.min(Math.max(weekProgressValue, 0), 100);
  const timeInvestedFill = Math.min(Math.max(timeInvestedValue, 0), 100);

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

  const removeFocusItem = (id: string, title: string) => {
    if (!canEditCurrentWeek) return;

    const confirmed = window.confirm(
      `Remove focus card "${title || 'Untitled'}"? This action cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

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
          {showTagline && (
            <p className="app__tagline">
              Set weekly themes, focus your time, and celebrate what you achieve.
            </p>
          )}
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

      {shouldShowWeekContext && (
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
            <div className="week-context__action-buttons">
              <button
                type="button"
                className="week-context__icon-button"
                onClick={handleExportData}
                disabled={!hasStoredWeeks}
                title="Export weekly focus data"
                aria-label="Export weekly focus data"
              >
                <span
                  className="week-context__icon week-context__icon--export"
                  aria-hidden
                />
              </button>
              <button
                type="button"
                className="week-context__icon-button"
                onClick={handleImportClick}
                title="Import weekly focus data"
                aria-label="Import weekly focus data"
              >
                <span
                  className="week-context__icon week-context__icon--import"
                  aria-hidden
                />
              </button>
              <input
                ref={importInputRef}
                type="file"
                accept="application/json"
                className="week-context__file-input"
                onChange={handleImportFileChange}
              />
            </div>
            {!isCurrentWeek && (
              <span className="week-context__badge" role="status">
                Viewing a previous week
              </span>
            )}
          </div>
        </section>
      )}

      {selectedWeekHasData && (
        <section className="summary" aria-label="Weekly focus summary">
          <div className="summary__stats">
            <div className="summary__stat">
              <span className="summary__label">Total target</span>
              <strong>{summary.target.toFixed(1)}h</strong>
            </div>
            <div className="summary__stat">
              <span className="summary__label">Time invested</span>
              <strong>{summary.spent.toFixed(1)}h</strong>
            </div>
            <div className="summary__stat">
              <span className="summary__label">Achieved focus areas</span>
              <strong>
                {summary.achievedCount} / {focusItems.length}
              </strong>
            </div>
          </div>
          <div className="summary__progress-card">
            <span className="summary__label">Week progress</span>
            <div className="summary__progress">
              <div className="summary__progress-item">
                <div className="summary__progress-header">
                  <span>Week timeline</span>
                  <span>{weekProgressValue.toFixed(0)}%</span>
                </div>
                <div
                  className="summary__progress-track"
                  role="progressbar"
                  aria-label="Week timeline progress"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.min(Math.max(weekProgressValue, 0), 100)}
                >
                  <div
                    className="summary__progress-fill"
                    style={{ width: `${weekProgressFill}%` }}
                  />
                </div>
              </div>
              <div className="summary__progress-item">
                <div className="summary__progress-header">
                  <span>Target invested</span>
                  <span>{timeInvestedValue.toFixed(0)}%</span>
                </div>
                <div
                  className="summary__progress-track"
                  role="progressbar"
                  aria-label="Time invested versus target"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.min(Math.max(timeInvestedValue, 0), 100)}
                >
                  <div
                    className="summary__progress-fill summary__progress-fill--accent"
                    style={{ width: `${timeInvestedFill}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {selectedWeekHasData && (
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
                    onClick={() => adjustNewTarget(-1)}
                    disabled={!canEditCurrentWeek || newTarget <= 1}
                    aria-label="Decrease target by 1 hour"
                  >
                    -1h
                  </button>
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
              const focusIcon = getFocusIcon(item.title);
              const isEditingTitle =
                activeEdit?.id === item.id && activeEdit.field === 'title';
              const focusCardClassNames = ['focus-card'];

              if (isAchieved) {
                focusCardClassNames.push('focus-card--achieved');
              }

              if (isEditingTitle) {
                focusCardClassNames.push('focus-card--editing-title');
              }

              return (
                <article
                  key={item.id}
                  className={focusCardClassNames.join(' ')}
                  aria-label={`${item.title} focus card`}
                >
                  <header className="focus-card__header">
                    <div className="focus-card__header-content">
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
                    <div className="focus-card__header-actions">
                      <span className="focus-card__icon" aria-hidden>
                        {focusIcon}
                      </span>
                      <button
                        type="button"
                        className="icon-button"
                        onClick={() => removeFocusItem(item.id, item.title)}
                        disabled={!canEditCurrentWeek}
                        aria-label={`Remove ${item.title}`}
                      >
                        ×
                      </button>
                    </div>
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
                        onClick={() => adjustSpent(item.id, -1)}
                        disabled={!canEditCurrentWeek || item.spentHours < 1}
                      >
                        -1h
                      </button>
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
                    <FocusNotes
                      note={item.note}
                      placeholder="Jot down highlights, learnings, or next steps."
                      disabled={!canEditCurrentWeek}
                      onChange={(value: string) =>
                        updateFocusNote(item.id, value)
                      }
                      onBlur={(value: string) =>
                        updateFocusNote(item.id, value.trimEnd())
                      }
                    />
                  </label>
                </article>
              );
            })
          )}
          </div>
        </section>
      )}
    </main>
  );
}

export default App;
