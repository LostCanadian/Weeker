import { FocusItem, WeekStorage } from '../focus/types';
import { cloneFocusItems } from '../focus/utils';

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

export type PersistedWeeksPayload = {
  schemaVersion: number;
  appVersion: string;
  weeks: WeekStorage;
};

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

export const sanitizeWeekStorage = (value: unknown): WeekStorage => {
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

export const weeksStorage = {
  load(): WeekStorage {
    if (typeof window === 'undefined') return {};

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
