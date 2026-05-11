import type { CSSProperties, MouseEvent as ReactMouseEvent } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Globe } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { bounceIconsIn } from "../utils/iconBounce";

const triggerDockBounce = (e: ReactMouseEvent<HTMLElement>) => bounceIconsIn(e.currentTarget);

const languages = [
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
];

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  const dropdownGlassStyle: CSSProperties = {
    "--glass-surface-bg": "rgba(8, 14, 28, 0.12)",
    "--glass-surface-border": "rgba(255, 255, 255, 0.18)",
    "--glass-surface-highlight": "rgba(255, 255, 255, 0.32)",
    "--glass-surface-reflection": "rgba(210, 230, 255, 0.24)",
    "--glass-highlight-height": "10%",
    "--glass-reflection-height": "40%",
  } as CSSProperties;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="fures-lang-pill-sm text-white/70 hover:text-white/90" onClick={triggerDockBounce}>
          <Globe data-dock-icon className="h-3.5 w-3.5" />
          <span className="font-semibold text-white text-xs">{language.toUpperCase()}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="fures-dropdown-content mt-2 w-44 border-0 p-2"
        style={dropdownGlassStyle}
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            asChild
            className="p-0 focus:bg-transparent"
          >
            <button
              onClick={(e) => { triggerDockBounce(e); setLanguage(lang.code as any); }}
              className={`fures-dropdown-item flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm ${
                language === lang.code ? "text-white" : "text-white/65 hover:text-white"
              }`}
            >
              <span className="text-base">{lang.flag}</span>
              {lang.name}
            </button>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
