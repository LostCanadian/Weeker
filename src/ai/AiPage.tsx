import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import './AiPage.css';
import {
  addDays,
  formatWeekLabel,
  getStartOfWeek,
  parseWeekKey,
} from '../utils/weekDates';
import { weeksStorage } from '../storage/weeksStorage';
import { applyThemePreference } from '../utils/theme';
import { settingsStorage } from '../storage/settingsStorage';
import { AiPreferences, aiStorage } from './aiStorage';

const resolveCurrentWeek = () => getStartOfWeek(new Date());

const normalizePathname = (pathname: string): string => {
  const base = import.meta.env.BASE_URL ?? '/';
  if (base === '/' || !pathname.startsWith(base)) {
    return pathname;
  }

  const trimmed = base.endsWith('/') ? base.slice(0, -1) : base;
  return pathname.startsWith(trimmed)
    ? pathname.slice(trimmed.length) || '/'
    : pathname;
};

const parseWeekInput = (value: string): Date | null => {
  if (!value) return null;
  const match = value.match(/^(\d{4})-W(\d{2})$/);
  if (!match) return null;

  const year = Number(match[1]);
  const week = Number(match[2]);

  if (!Number.isFinite(year) || !Number.isFinite(week) || week <= 0 || week > 53) {
    return null;
  }

  const simpleStart = new Date(year, 0, 1 + (week - 1) * 7);
  const dayOfWeek = simpleStart.getDay();
  const isoWeekStart = new Date(simpleStart);
  const isoStartOffset = (dayOfWeek <= 4 ? 1 : 8) - dayOfWeek;
  isoWeekStart.setDate(simpleStart.getDate() + isoStartOffset);

  return getStartOfWeek(isoWeekStart);
};

const formatWeekInputValue = (date: Date): string => {
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  target.setDate(target.getDate() + 3);

  const firstDay = new Date(target.getFullYear(), 0, 4);
  const dayOfYear = Math.floor(
    (target.getTime() - new Date(target.getFullYear(), 0, 1).getTime()) / (24 * 60 * 60 * 1000),
  );
  const week = Math.ceil((dayOfYear + firstDay.getDay() + 1) / 7);

  const weekString = String(week).padStart(2, '0');
  return `${target.getFullYear()}-W${weekString}`;
};

const describeRange = (start: Date, end: Date): string => {
  if (start.getTime() === end.getTime()) {
    return formatWeekLabel(start);
  }
  return `${formatWeekLabel(start)} → ${formatWeekLabel(end)}`;
};

export const AiPage = () => {
  const [preferences, setPreferences] = useState<AiPreferences>(() =>
    aiStorage.loadPreferences(),
  );
  const [sessionKey, setSessionKey] = useState(() => aiStorage.loadSessionKey());
  const [rangePreset, setRangePreset] = useState<AiPreferences['defaultRange']>(
    () => preferences.defaultRange,
  );
  const [customStart, setCustomStart] = useState<string>('');
  const [customEnd, setCustomEnd] = useState<string>('');
  const [weeks] = useState(() => weeksStorage.load());
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const { theme } = settingsStorage.load();
    applyThemePreference(theme);
  }, []);

  useEffect(() => {
    aiStorage.savePreferences({ ...preferences, defaultRange: rangePreset });
  }, [preferences, rangePreset]);

  const availableWeeks = useMemo(() => Object.keys(weeks), [weeks]);
  const latestWeekStart = useMemo(() => {
    if (availableWeeks.length === 0) {
      return resolveCurrentWeek();
    }

    const sortedKeys = [...availableWeeks].sort();
    return parseWeekKey(sortedKeys[sortedKeys.length - 1]);
  }, [availableWeeks]);

  const resolvedRange = useMemo(() => {
    const currentWeekStart = resolveCurrentWeek();
    if (rangePreset === '1w') {
      return { start: currentWeekStart, end: currentWeekStart };
    }
    if (rangePreset === '4w') {
      return { start: addDays(currentWeekStart, -7 * 3), end: currentWeekStart };
    }
    if (rangePreset === 'year') {
      return { start: addDays(currentWeekStart, -7 * 51), end: currentWeekStart };
    }

    const start = parseWeekInput(customStart) ?? currentWeekStart;
    const end = parseWeekInput(customEnd) ?? start;
    const normalizedStart = start.getTime() > end.getTime() ? end : start;
    const normalizedEnd = start.getTime() > end.getTime() ? start : end;
    return { start: normalizedStart, end: normalizedEnd };
  }, [customEnd, customStart, rangePreset]);

  const startWeekValue = useMemo(() => formatWeekInputValue(resolvedRange.start), [
    resolvedRange.start,
  ]);
  const endWeekValue = useMemo(() => formatWeekInputValue(resolvedRange.end), [
    resolvedRange.end,
  ]);

  const providerChangeHandler = (field: keyof AiPreferences) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.currentTarget.value;
      setPreferences((prev) => ({ ...prev, [field]: value }));
    };

  const handleIncludeNotesToggle = () => {
    setPreferences((prev) => ({ ...prev, includeNotes: !prev.includeNotes }));
  };

  const handleSessionKeySave = (value: string) => {
    setSessionKey(value);
    aiStorage.saveSessionKey(value);
  };

  const handleClearKey = () => {
    setSessionKey('');
    aiStorage.clearSessionKey();
  };

  const handleRangePresetChange = (preset: AiPreferences['defaultRange']) => {
    setRangePreset(preset);
    if (preset !== 'custom') {
      setCustomStart('');
      setCustomEnd('');
    }
  };

  const handleCustomStartChange = (value: string) => {
    setRangePreset('custom');
    setCustomStart(value);
  };

  const handleCustomEndChange = (value: string) => {
    setRangePreset('custom');
    setCustomEnd(value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setStatusMessage(
      sessionKey
        ? 'Ready to request summaries with your provided settings.'
        : 'Add an API key to request summaries. Your key stays in this tab only.',
    );
  };

  const normalizedPathname = normalizePathname(window.location.pathname);
  const homeHref = normalizedPathname.startsWith('/ai')
    ? import.meta.env.BASE_URL ?? '/'
    : '/';

  return (
    <div className="ai-page">
      <header className="ai-page__header">
        <div>
          <p className="ai-page__eyebrow">Bring-your-own AI</p>
          <h1 className="ai-page__title">AI summaries</h1>
          <p className="ai-page__subtitle">
            Connect your preferred AI provider to generate week-based summaries using your
            Weeker data. Keys are kept in this tab only.
          </p>
        </div>
        <a className="ai-page__home-link" href={homeHref}>
          ← Back to Weeker
        </a>
      </header>

      <main className="ai-page__layout">
        <section className="ai-card ai-card--stacked">
          <div className="ai-card__header">
            <div>
              <h2>Provider access</h2>
              <p className="ai-card__supporting">
                Store non-sensitive provider details locally, but keep the API key only for this
                tab session.
              </p>
            </div>
            <div className="ai-badge">Session-only key</div>
          </div>
          <form className="ai-form" onSubmit={handleSubmit}>
            <div className="ai-grid">
              <label className="ai-field">
                <span className="ai-field__label">Provider name</span>
                <input
                  type="text"
                  value={preferences.providerLabel}
                  onChange={providerChangeHandler('providerLabel')}
                  placeholder="OpenAI-compatible"
                />
              </label>
              <label className="ai-field">
                <span className="ai-field__label">Base URL</span>
                <input
                  type="url"
                  value={preferences.baseUrl}
                  onChange={providerChangeHandler('baseUrl')}
                  placeholder="https://api.example.com/v1"
                  autoComplete="off"
                />
              </label>
              <label className="ai-field">
                <span className="ai-field__label">Model</span>
                <input
                  type="text"
                  value={preferences.model}
                  onChange={providerChangeHandler('model')}
                  placeholder="gpt-4o-mini"
                  autoComplete="off"
                />
              </label>
            </div>

            <div className="ai-field ai-field--full">
              <div className="ai-field__label-row">
                <span className="ai-field__label">API key</span>
                <span className="ai-field__hint">Stored in sessionStorage; clears when this tab closes.</span>
              </div>
              <div className="ai-key-row">
                <input
                  type="password"
                  value={sessionKey}
                  onChange={(event) => handleSessionKeySave(event.currentTarget.value)}
                  placeholder="Paste your key to enable summaries"
                  autoComplete="off"
                />
                <button type="button" className="ai-button ai-button--ghost" onClick={handleClearKey}>
                  Clear
                </button>
              </div>
            </div>

            <div className="ai-switch-row">
              <label className="ai-switch">
                <input
                  type="checkbox"
                  checked={preferences.includeNotes}
                  onChange={handleIncludeNotesToggle}
                />
                <span className="ai-switch__visual" aria-hidden />
                <span className="ai-switch__label">Include focus card notes in summaries</span>
              </label>
              <p className="ai-muted">
                Notes provide context for the AI and stay on-device until you confirm a request.
              </p>
            </div>

            <div className="ai-card__footer">
              <div className="ai-warning">
                <strong>Heads up:</strong> Requests will share the selected weeks (including notes) with
                your chosen provider. Review your range before sending.
              </div>
              <button type="submit" className="ai-button ai-button--primary">
                Prepare summaries
              </button>
            </div>
          </form>
        </section>

        <section className="ai-card">
          <div className="ai-card__header">
            <div>
              <h2>Summary range</h2>
              <p className="ai-card__supporting">
                Weeks-based presets keep things simple. Choose a custom span if you need something
                specific.
              </p>
            </div>
            <div className="ai-chip">{availableWeeks.length} saved week{availableWeeks.length === 1 ? '' : 's'}</div>
          </div>

          <div className="ai-range">
            <div className="ai-range__presets">
              <button
                type="button"
                className={`ai-chip ${rangePreset === '1w' ? 'ai-chip--active' : ''}`}
                onClick={() => handleRangePresetChange('1w')}
              >
                1 week
              </button>
              <button
                type="button"
                className={`ai-chip ${rangePreset === '4w' ? 'ai-chip--active' : ''}`}
                onClick={() => handleRangePresetChange('4w')}
              >
                4 weeks
              </button>
              <button
                type="button"
                className={`ai-chip ${rangePreset === 'year' ? 'ai-chip--active' : ''}`}
                onClick={() => handleRangePresetChange('year')}
              >
                Year
              </button>
              <button
                type="button"
                className={`ai-chip ${rangePreset === 'custom' ? 'ai-chip--active' : ''}`}
                onClick={() => handleRangePresetChange('custom')}
              >
                Custom
              </button>
            </div>

            <div className="ai-range__custom">
              <label className="ai-field">
                <span className="ai-field__label">Start week</span>
                <input
                  type="week"
                  value={rangePreset === 'custom' ? customStart : startWeekValue}
                  onChange={(event) => handleCustomStartChange(event.currentTarget.value)}
                />
              </label>
              <label className="ai-field">
                <span className="ai-field__label">End week</span>
                <input
                  type="week"
                  value={rangePreset === 'custom' ? customEnd : endWeekValue}
                  onChange={(event) => handleCustomEndChange(event.currentTarget.value)}
                />
              </label>
            </div>

            <div className="ai-range__details">
              <p className="ai-muted">Current selection</p>
              <p className="ai-strong">{describeRange(resolvedRange.start, resolvedRange.end)}</p>
              <p className="ai-muted">
                Latest saved week: {formatWeekLabel(latestWeekStart)}. Summaries will include
                your notes: <strong>{preferences.includeNotes ? 'Yes' : 'No'}</strong>.
              </p>
            </div>
          </div>
        </section>

        <section className="ai-card">
          <div className="ai-card__header">
            <div>
              <h2>What you can expect</h2>
              <p className="ai-card__supporting">
                Summaries fetch 1-week, 4-week, and year-long perspectives plus 3–5 themes with
                suggestions.
              </p>
            </div>
            <div className="ai-chip">Preview</div>
          </div>
          <ul className="ai-list">
            <li>
              Weekly, monthly (4-week), and yearly overviews in one request so you can compare
              trends quickly.
            </li>
            <li>
              3–5 detected themes that highlight where effort is going, with suggestions for what
              to adjust next.
            </li>
            <li>
              Notes stay in this browser until you explicitly request a summary. You can clear the
              API key anytime.
            </li>
          </ul>

          {statusMessage && <div className="ai-status">{statusMessage}</div>}
        </section>
      </main>
    </div>
  );
};

export default AiPage;
