import { ThemePreference, isThemePreference } from '../utils/theme';
import { STORAGE_NAMESPACE } from './constants';

export type AppSettings = {
  theme: ThemePreference;
};

const DEFAULT_SETTINGS: AppSettings = {
  theme: 'system',
};

const SETTINGS_STORAGE_KEY = `weeker:${STORAGE_NAMESPACE}:settings:v1`;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const sanitizeSettings = (value: unknown): AppSettings => {
  if (!isRecord(value)) {
    return { ...DEFAULT_SETTINGS };
  }

  const themeValue = value.theme;
  const theme = isThemePreference(themeValue) ? themeValue : DEFAULT_SETTINGS.theme;

  return { theme };
};

export const settingsStorage = {
  load(): AppSettings {
    if (typeof window === 'undefined') {
      return { ...DEFAULT_SETTINGS };
    }

    try {
      const raw = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (!raw) {
        return { ...DEFAULT_SETTINGS };
      }

      const parsed = JSON.parse(raw) as unknown;
      return sanitizeSettings(parsed);
    } catch (error) {
      console.warn('Unable to parse stored settings.', error);
      return { ...DEFAULT_SETTINGS };
    }
  },
  save(settings: AppSettings) {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      const serialized = JSON.stringify(sanitizeSettings(settings));
      window.localStorage.setItem(SETTINGS_STORAGE_KEY, serialized);
    } catch (error) {
      console.warn('Unable to persist settings.', error);
    }
  },
};

export { DEFAULT_SETTINGS };
