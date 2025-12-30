import { STORAGE_NAMESPACE } from '../storage/constants';

export type AiPreferences = {
  providerLabel: string;
  baseUrl: string;
  model: string;
  includeNotes: boolean;
  defaultRange: '1w' | '4w' | 'year' | 'custom';
};

const DEFAULT_PREFERENCES: AiPreferences = {
  providerLabel: 'OpenAI-compatible',
  baseUrl: '',
  model: '',
  includeNotes: true,
  defaultRange: '1w',
};

const AI_PREFERENCES_KEY = `weeker:${STORAGE_NAMESPACE}:ai:preferences:v1`;
const AI_SESSION_KEY = `weeker:${STORAGE_NAMESPACE}:ai:session-key`;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const sanitizeBoolean = (value: unknown, fallback: boolean): boolean =>
  typeof value === 'boolean' ? value : fallback;

const sanitizeString = (value: unknown, fallback: string): string =>
  (typeof value === 'string' ? value : fallback).trim();

const sanitizeRange = (
  value: unknown,
  fallback: AiPreferences['defaultRange'],
): AiPreferences['defaultRange'] => {
  if (value === '1w' || value === '4w' || value === 'year' || value === 'custom') {
    return value;
  }
  return fallback;
};

export const aiStorage = {
  loadPreferences(): AiPreferences {
    if (typeof window === 'undefined') {
      return { ...DEFAULT_PREFERENCES };
    }

    try {
      const raw = window.localStorage.getItem(AI_PREFERENCES_KEY);
      if (!raw) {
        return { ...DEFAULT_PREFERENCES };
      }

      const parsed = JSON.parse(raw) as unknown;
      if (!isRecord(parsed)) {
        return { ...DEFAULT_PREFERENCES };
      }

      return {
        providerLabel: sanitizeString(parsed.providerLabel, DEFAULT_PREFERENCES.providerLabel),
        baseUrl: sanitizeString(parsed.baseUrl, DEFAULT_PREFERENCES.baseUrl),
        model: sanitizeString(parsed.model, DEFAULT_PREFERENCES.model),
        includeNotes: sanitizeBoolean(parsed.includeNotes, DEFAULT_PREFERENCES.includeNotes),
        defaultRange: sanitizeRange(parsed.defaultRange, DEFAULT_PREFERENCES.defaultRange),
      };
    } catch (error) {
      console.warn('Unable to parse stored AI preferences.', error);
      return { ...DEFAULT_PREFERENCES };
    }
  },
  savePreferences(preferences: AiPreferences) {
    if (typeof window === 'undefined') return;

    const sanitized: AiPreferences = {
      providerLabel: sanitizeString(preferences.providerLabel, DEFAULT_PREFERENCES.providerLabel),
      baseUrl: sanitizeString(preferences.baseUrl, DEFAULT_PREFERENCES.baseUrl),
      model: sanitizeString(preferences.model, DEFAULT_PREFERENCES.model),
      includeNotes: sanitizeBoolean(preferences.includeNotes, DEFAULT_PREFERENCES.includeNotes),
      defaultRange: sanitizeRange(preferences.defaultRange, DEFAULT_PREFERENCES.defaultRange),
    };

    try {
      window.localStorage.setItem(AI_PREFERENCES_KEY, JSON.stringify(sanitized));
    } catch (error) {
      console.warn('Unable to persist AI preferences.', error);
    }
  },
  loadSessionKey(): string {
    if (typeof window === 'undefined') return '';

    try {
      return window.sessionStorage.getItem(AI_SESSION_KEY) ?? '';
    } catch (error) {
      console.warn('Unable to read AI session key from storage.', error);
      return '';
    }
  },
  saveSessionKey(key: string) {
    if (typeof window === 'undefined') return;

    try {
      if (key.trim().length === 0) {
        window.sessionStorage.removeItem(AI_SESSION_KEY);
        return;
      }
      window.sessionStorage.setItem(AI_SESSION_KEY, key.trim());
    } catch (error) {
      console.warn('Unable to persist AI session key.', error);
    }
  },
  clearSessionKey() {
    if (typeof window === 'undefined') return;

    try {
      window.sessionStorage.removeItem(AI_SESSION_KEY);
    } catch (error) {
      console.warn('Unable to clear AI session key.', error);
    }
  },
};

export { DEFAULT_PREFERENCES };
