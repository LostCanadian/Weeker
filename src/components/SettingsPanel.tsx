import {
  ChangeEvent,
  MouseEvent,
  RefObject,
  useEffect,
  useRef,
} from 'react';

import { ThemePreference } from '../utils/theme';

export type SettingsPanelProps = {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemePreference;
  onThemeChange: (theme: ThemePreference) => void;
  onExport: () => void;
  onImportClick: () => void;
  importInputRef: RefObject<HTMLInputElement>;
  onImportFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  canExport: boolean;
};

export const SettingsPanel = ({
  isOpen,
  onClose,
  theme,
  onThemeChange,
  onExport,
  onImportClick,
  importInputRef,
  onImportFileChange,
  canExport,
}: SettingsPanelProps) => {
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;

    panel?.focus();

    return () => {
      previouslyFocused?.focus?.();
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleOverlayMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleThemeSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onThemeChange(event.target.value as ThemePreference);
  };

  return (
    <div
      className="settings-panel__overlay"
      role="presentation"
      onMouseDown={handleOverlayMouseDown}
    >
      <div
        className="settings-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-panel-title"
        ref={panelRef}
        tabIndex={-1}
      >
        <header className="settings-panel__header">
          <h2 id="settings-panel-title">Settings</h2>
          <button
            type="button"
            className="icon-button settings-panel__close-button"
            onClick={onClose}
            aria-label="Close settings"
          >
            ×
          </button>
        </header>

        <div className="settings-panel__content">
          <section className="settings-panel__section">
            <label className="settings-panel__field">
              <span className="settings-panel__field-label">Theme</span>
              <select value={theme} onChange={handleThemeSelectChange}>
                <option value="system">System (default)</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </label>
          </section>

          <div className="settings-panel__separator" aria-hidden />

          <section
            className="settings-panel__section settings-panel__section--actions"
            aria-label="Data"
          >
            <button
              type="button"
              className="settings-panel__button settings-panel__button--icon"
              onClick={onExport}
              aria-label="Export data"
              title="Export data"
              disabled={!canExport}
            >
              <span
                className="settings-panel__button-icon settings-panel__button-icon--export"
                aria-hidden
              />
              <span className="sr-only">Export data</span>
            </button>
            <button
              type="button"
              className="settings-panel__button settings-panel__button--icon"
              onClick={onImportClick}
              aria-label="Import data"
              title="Import data"
            >
              <span
                className="settings-panel__button-icon settings-panel__button-icon--import"
                aria-hidden
              />
              <span className="sr-only">Import data</span>
            </button>
            <input
              ref={importInputRef}
              type="file"
              accept="application/json"
              className="settings-panel__file-input"
              onChange={onImportFileChange}
            />
          </section>
        </div>
      </div>
    </div>
  );
};
