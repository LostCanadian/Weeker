export type ThemePreference = 'system' | 'light' | 'dark';

export const isThemePreference = (value: unknown): value is ThemePreference =>
  value === 'system' || value === 'light' || value === 'dark';

export const applyThemePreference = (theme: ThemePreference) => {
  if (typeof document === 'undefined') {
    return;
  }

  const root = document.documentElement;

  if (theme === 'system') {
    root.removeAttribute('data-theme');
    return;
  }

  root.setAttribute('data-theme', theme);
};
