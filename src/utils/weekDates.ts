export const HOUR_LENGTH_MS = 60 * 60 * 1000;

export const normalizeToStartOfDay = (date: Date): Date => {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
};

export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const getStartOfWeek = (date: Date): Date => {
  const result = new Date(date);
  const day = result.getDay();
  const diff = (day + 6) % 7; // Shift so Monday is the first day of the week
  result.setHours(0, 0, 0, 0);
  result.setDate(result.getDate() - diff);
  return result;
};

export const getEndOfWeek = (start: Date): Date => {
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return end;
};

export const getNextWeekStart = (start: Date): Date =>
  normalizeToStartOfDay(addDays(start, 7));

export const getWeekDurationMs = (start: Date): number => {
  const normalizedStart = normalizeToStartOfDay(start);
  const nextWeekStart = getNextWeekStart(normalizedStart);
  return nextWeekStart.getTime() - normalizedStart.getTime();
};

export const clampToWeek = (start: Date, value: number): number => {
  const normalizedStart = normalizeToStartOfDay(start);
  const nextWeekStart = getNextWeekStart(normalizedStart);
  return Math.min(
    Math.max(value, normalizedStart.getTime()),
    nextWeekStart.getTime(),
  );
};

export const getElapsedWeekHours = (start: Date, today: Date): number => {
  const normalizedStart = normalizeToStartOfDay(start);
  const clampedNow = clampToWeek(normalizedStart, today.getTime());
  return (clampedNow - normalizedStart.getTime()) / HOUR_LENGTH_MS;
};

export const formatWeekKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const parseWeekKey = (key: string): Date => {
  const [year, month, day] = key.split('-').map(Number);
  return normalizeToStartOfDay(new Date(year, month - 1, day));
};

export const formatWeekLabel = (start: Date): string => {
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

export const calculateWeekProgressPercent = (
  selectedWeekStart: Date,
  today: Date,
  isCurrentWeek: boolean,
): number => {
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
};
