import { useEffect, useState } from 'react';

export type ThemePreference = 'light' | 'dark' | 'system';

const THEME_STORAGE_KEY = 'theme';
const THEME_CHANGE_EVENT = 'hub-theme-preference-change';

function getInitialPreference(): ThemePreference {
  try {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system') {
      return savedTheme;
    }
  } catch {
    // Use the device setting when storage is unavailable.
  }
  return 'system';
}

export function useTheme() {
  const [preference, setPreferenceState] = useState<ThemePreference>(getInitialPreference);

  useEffect(() => {
    const syncPreference = (event: Event) => {
      const nextPreference = (event as CustomEvent<ThemePreference>).detail;
      if (nextPreference === 'light' || nextPreference === 'dark' || nextPreference === 'system') {
        setPreferenceState(nextPreference);
      }
    };

    window.addEventListener(THEME_CHANGE_EVENT, syncPreference);
    return () => window.removeEventListener(THEME_CHANGE_EVENT, syncPreference);
  }, []);

  useEffect(() => {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
    const applyTheme = () => {
      const theme = preference === 'system'
        ? systemTheme.matches ? 'dark' : 'light'
        : preference;

      document.documentElement.dataset.theme = theme;
      document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
        ?.setAttribute('content', theme === 'dark' ? '#1d2025' : '#f6f0e2');
    };

    applyTheme();
    if (preference === 'system') {
      systemTheme.addEventListener('change', applyTheme);
    }

    try {
      localStorage.setItem(THEME_STORAGE_KEY, preference);
    } catch {
      // The current selection still applies for this page load.
    }

    return () => systemTheme.removeEventListener('change', applyTheme);
  }, [preference]);

  const setPreference = (nextPreference: ThemePreference) => {
    setPreferenceState(nextPreference);
    window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail: nextPreference }));
  };

  return { preference, setPreference };
}
