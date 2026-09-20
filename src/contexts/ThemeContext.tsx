import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type SiteTheme = 'dark' | 'light';

/**
 * Light is the product default. Only an explicit choice by the visitor (the
 * theme toggle, persisted in localStorage) switches the site to dark; neither
 * the clock nor the OS preference does.
 */
const DEFAULT_THEME: SiteTheme = 'light';

const ThemeValueContext = createContext<SiteTheme>(DEFAULT_THEME);
const ThemeActionsContext = createContext<{
  toggleTheme: () => void;
  setTheme: (t: SiteTheme) => void;
}>({ toggleTheme: () => {}, setTheme: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<SiteTheme>(() => {
    try {
      const saved = localStorage.getItem('fures-theme') as SiteTheme | null;
      if (saved === 'dark' || saved === 'light') return saved;
    } catch {}
    return DEFAULT_THEME;
  });

  const setTheme = (t: SiteTheme) => {
    setThemeState(t);
    try { localStorage.setItem('fures-theme', t); } catch {}
  };

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('theme-light');
      root.setAttribute('data-theme', 'light');
    } else {
      root.classList.remove('theme-light');
      root.setAttribute('data-theme', 'dark');
    }
  }, [theme]);

  return (
    <ThemeValueContext.Provider value={theme}>
      <ThemeActionsContext.Provider value={{ toggleTheme, setTheme }}>
        <div data-theme={theme} className={theme === 'light' ? 'theme-light' : ''}>
          {children}
        </div>
      </ThemeActionsContext.Provider>
    </ThemeValueContext.Provider>
  );
}

export function useTheme(): SiteTheme {
  return useContext(ThemeValueContext);
}

export function useThemeToggle() {
  return useContext(ThemeActionsContext);
}
