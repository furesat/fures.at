import type { MouseEvent as ReactMouseEvent } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme, useThemeToggle } from '../contexts/ThemeContext';
import { bounceIconsIn } from '../utils/iconBounce';

export function ThemeToggle() {
  const theme = useTheme();
  const { toggleTheme } = useThemeToggle();

  const onClick = (e: ReactMouseEvent<HTMLButtonElement>) => {
    bounceIconsIn(e.currentTarget);
    toggleTheme();
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="theme-toggle-pill"
      aria-label={theme === 'dark' ? 'Açık moda geç' : 'Koyu moda geç'}
      title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
    >
      {theme === 'dark' ? (
        <Sun data-dock-icon className="h-3.5 w-3.5" />
      ) : (
        <Moon data-dock-icon className="h-3.5 w-3.5" />
      )}
    </button>
  );
}
