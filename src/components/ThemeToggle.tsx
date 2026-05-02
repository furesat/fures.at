import { Sun, Moon } from 'lucide-react';
import { useTheme, useThemeToggle } from '../contexts/ThemeContext';

export function ThemeToggle() {
  const theme = useTheme();
  const { toggleTheme } = useThemeToggle();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle-pill"
      aria-label={theme === 'dark' ? 'Açık moda geç' : 'Koyu moda geç'}
      title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
    >
      {theme === 'dark' ? (
        <Sun className="h-3.5 w-3.5" />
      ) : (
        <Moon className="h-3.5 w-3.5" />
      )}
    </button>
  );
}
