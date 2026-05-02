import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type SiteTheme = 'dark' | 'light';

const ThemeValueContext = createContext<SiteTheme>('dark');
const ThemeActionsContext = createContext<{
  toggleTheme: () => void;
  setTheme: (t: SiteTheme) => void;
}>({ toggleTheme: () => {}, setTheme: () => {} });

function getTimeBasedDefault(): SiteTheme {
  const hour = new Date().getHours();
  return hour >= 6 && hour < 18 ? 'light' : 'dark';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<SiteTheme>(() => {
    try {
      const saved = localStorage.getItem('fures-theme') as SiteTheme | null;
      if (saved === 'dark' || saved === 'light') return saved;
    } catch {}
    return getTimeBasedDefault();
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
