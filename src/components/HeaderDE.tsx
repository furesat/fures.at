import type { CSSProperties } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Info,
  Briefcase,
  Rocket,
  Users2,
  MessageCircle,
  Newspaper,
  MoreHorizontal,
  HelpCircle,
  Megaphone,
  Menu,
  X,
  Globe,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import type { Language } from "../contexts/LanguageContext";
import { getPath } from "../utils/routes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import type { LucideIcon } from "lucide-react";

type NavItem = { path: string; label: string; icon: LucideIcon };
type MoreLink = { path: string; label: string; icon: LucideIcon };

export function HeaderDE() {
  const { t, language, setLanguage } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const navRef = useRef<HTMLElement | null>(null);
  const activeItemRef = useRef<HTMLElement | null>(null);
  const moreTriggerRef = useRef<HTMLButtonElement | null>(null);
  const [highlightBoxStyle, setHighlightBoxStyle] = useState<CSSProperties | null>(null);
  const [isMobileNav, setIsMobileNav] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const normalizePath = (path: string) =>
    path === "/" ? "/" : path.replace(/\/+$/, "");

  const isActive = (path: string) => {
    const current = normalizePath(location.pathname);
    const target = normalizePath(path);
    if (target === "/de") return current === "/de";
    return current === target || current.startsWith(`${target}/`);
  };

  const navItems: NavItem[] = [
    { path: "/de/ueber-uns", label: t("nav.about"), icon: Info },
    { path: "/de/leistungen", label: t("nav.services"), icon: Briefcase },
    { path: "/de/referenzen", label: t("nav.projects"), icon: Rocket },
    { path: "/de/kontakt", label: t("nav.contact"), icon: MessageCircle },
    { path: "/de/blog", label: t("nav.blog"), icon: Newspaper },
  ];

  const moreLinks: MoreLink[] = [
    { path: "/de/team", label: t("nav.team"), icon: Users2 },
    { path: "/de/kampagnen", label: t("nav.campaigns"), icon: Megaphone },
    { path: "/de/faq", label: "FAQ", icon: HelpCircle },
  ];

  const handleLanguageSwitch = (lang: Language) => {
    setLanguage(lang);
    navigate(getPath(lang, 'home'));
  };

  const navItemPaths = new Set(navItems.map((i) => normalizePath(i.path)));
  const moreMenuActive = moreLinks.some((l) => {
    if (navItemPaths.has(normalizePath(l.path))) return false;
    return isActive(l.path);
  });

  const navBaseClasses =
    "ios-nav-item group relative z-10 flex min-w-[72px] flex-col items-center justify-center gap-1 rounded-full px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.2em] transition-all duration-500 focus-visible:outline-none";

  const updateHighlightPosition = useCallback(() => {
    if (isMobileNav) { setHighlightBoxStyle(null); return; }
    const navEl = navRef.current;
    if (!navEl) { setHighlightBoxStyle(null); return; }
    const targetEl = activeItemRef.current ?? (moreMenuActive ? moreTriggerRef.current : null);
    if (!targetEl) { setHighlightBoxStyle(null); return; }
    const navRect = navEl.getBoundingClientRect();
    const targetRect = targetEl.getBoundingClientRect();
    const paddingX = 12;
    const paddingY = 7;
    setHighlightBoxStyle({
      width: `${targetRect.width + paddingX * 2}px`,
      height: `${targetRect.height + paddingY * 2}px`,
      transform: `translate3d(${targetRect.left - navRect.left - paddingX}px, ${targetRect.top - navRect.top - paddingY}px, 0)`,
      opacity: 1,
    });
  }, [isMobileNav, moreMenuActive]);

  const setActiveItemRef = useCallback(
    (node: HTMLAnchorElement | null) => {
      activeItemRef.current = node;
      if (node) requestAnimationFrame(() => updateHighlightPosition());
      else setHighlightBoxStyle(null);
    },
    [updateHighlightPosition],
  );

  useEffect(() => { updateHighlightPosition(); }, [location.pathname, updateHighlightPosition]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 768px)");
    const handler = (e: MediaQueryListEvent) => setIsMobileNav(e.matches);
    setIsMobileNav(mq.matches);
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
    mq.addListener(handler);
    return () => mq.removeListener(handler);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateHighlightPosition);
    return () => window.removeEventListener("resize", updateHighlightPosition);
  }, [updateHighlightPosition]);

  useEffect(() => {
    const navEl = navRef.current;
    if (!navEl) return;
    const observer = new ResizeObserver(() => updateHighlightPosition());
    observer.observe(navEl);
    return () => observer.disconnect();
  }, [updateHighlightPosition]);

  const navItemClasses = (path: string) =>
    `${navBaseClasses} ${
      isActive(path)
        ? "liquid-pill is-active text-white"
        : "fures-nav-item-idle text-slate-200/70 hover:text-white"
    }`;

  const highlightGlassStyle: CSSProperties = {
    "--glass-surface-bg": "rgba(12, 20, 42, 0.32)",
    "--glass-surface-border": "rgba(255, 255, 255, 0.32)",
    "--glass-surface-highlight": "rgba(255, 255, 255, 0.55)",
    "--glass-surface-reflection": "rgba(210, 230, 255, 0.36)",
    "--glass-highlight-height": "16%",
    "--glass-reflection-height": "58%",
  } as CSSProperties;

  const dropdownGlassStyle: CSSProperties = {
    "--glass-surface-bg": "rgba(8, 14, 28, 0.12)",
    "--glass-surface-border": "rgba(255, 255, 255, 0.18)",
    "--glass-surface-highlight": "rgba(255, 255, 255, 0.32)",
    "--glass-surface-reflection": "rgba(210, 230, 255, 0.24)",
    "--glass-highlight-height": "10%",
    "--glass-reflection-height": "40%",
  } as CSSProperties;

  const languages = [
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "tr", name: "Türkçe", flag: "🇹🇷" },
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "ru", name: "Русский", flag: "🇷🇺" },
  ];

  return (
    <>
      <header className="fixed inset-x-0 top-3 z-50 px-3 sm:px-4">
        <div className="mx-auto flex w-full max-w-[1200px] items-center gap-2 sm:gap-3">

          {/* Logo */}
          <Link to="/de" className="group relative shrink-0" aria-label="Fures Tech — Startseite">
            <span className="fures-logo-pill relative flex items-center">
              <img
                src="/images/fures.png"
                alt="Fures Tech"
                className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105 sm:h-10"
              />
            </span>
          </Link>

          {/* Desktop nav pill */}
          <div className="relative hidden min-w-0 flex-1 md:block">
            <div className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.15),transparent)] opacity-40 blur-2xl" />
            <nav
              ref={navRef}
              className="fures-nav-glass relative flex items-center gap-1 rounded-full px-3 py-2.5 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {highlightBoxStyle && (
                <span
                  aria-hidden="true"
                  className="glass-spotlight"
                  style={{ ...highlightGlassStyle, ...highlightBoxStyle }}
                />
              )}
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={navItemClasses(item.path)}
                    data-active={active || undefined}
                    ref={active ? setActiveItemRef : undefined}
                  >
                    <Icon className={`relative z-10 h-4 w-4 transition-all duration-300 ${active ? "text-white" : "text-white/75"}`} />
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                );
              })}

              {moreLinks.length > 0 && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className={`${navBaseClasses} fures-nav-item-idle text-slate-200/70 hover:text-white focus-visible:outline-none ${moreMenuActive ? "text-white" : ""}`}
                      data-active={moreMenuActive || undefined}
                      ref={moreTriggerRef}
                    >
                      <MoreHorizontal className={`relative z-10 h-4 w-4 ${moreMenuActive ? "text-white" : "text-white/75"}`} />
                      <span className="relative z-10">Mehr</span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="fures-dropdown-content mt-2 w-56 p-2" style={dropdownGlassStyle}>
                    {moreLinks.map((link) => {
                      const Icon = link.icon;
                      const active = isActive(link.path);
                      return (
                        <DropdownMenuItem key={link.path} asChild className="p-0 focus:bg-transparent">
                          <Link
                            to={link.path}
                            className={`fures-dropdown-item flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm ${active ? "text-white bg-white/10" : "text-white/70 hover:text-white"}`}
                            data-active={active || undefined}
                          >
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/8">
                              <Icon className="h-3.5 w-3.5 text-white/80" />
                            </span>
                            {link.label}
                          </Link>
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </nav>
          </div>

          {/* Desktop right: lang + CTA */}
          <div className="hidden shrink-0 items-center gap-2 md:flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="fures-lang-pill text-white/65 hover:text-white/90">
                  <Globe className="h-3.5 w-3.5" />
                  <span className="text-white/40">DE</span>
                  <span className="font-semibold text-white">DE</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="fures-dropdown-content mt-2 w-44 p-2" style={dropdownGlassStyle}>
                {languages.map((lang) => (
                  <DropdownMenuItem key={lang.code} asChild className="p-0 focus:bg-transparent">
                    <button
                      onClick={() => handleLanguageSwitch(lang.code as Language)}
                      className={`fures-dropdown-item flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm ${language === lang.code ? "text-white" : "text-white/65 hover:text-white"}`}
                    >
                      <span className="text-base">{lang.flag}</span>
                      {lang.name}
                    </button>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/de/kontakt">
              <button className="fures-cta-pill">Beratung anfragen</button>
            </Link>
          </div>

          {/* Mobile: lang + hamburger */}
          <div className="ml-auto flex shrink-0 items-center gap-2 md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="fures-lang-pill-sm text-white/70">
                  <Globe className="h-3.5 w-3.5" />
                  <span className="font-semibold text-white text-xs">DE</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="fures-dropdown-content mt-2 w-44 p-2" style={dropdownGlassStyle}>
                {languages.map((lang) => (
                  <DropdownMenuItem key={lang.code} asChild className="p-0 focus:bg-transparent">
                    <button
                      onClick={() => handleLanguageSwitch(lang.code as Language)}
                      className={`fures-dropdown-item flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm ${language === lang.code ? "text-white" : "text-white/65 hover:text-white"}`}
                    >
                      <span className="text-base">{lang.flag}</span>
                      {lang.name}
                    </button>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              type="button"
              onClick={() => setMobileOpen((p) => !p)}
              className="fures-nav-item-idle flex h-9 w-9 items-center justify-center rounded-full text-white/70 hover:text-white"
              aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-x-3 top-[4.5rem] z-40 transition-all duration-300 ease-out md:hidden ${
          mobileOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="fures-nav-glass rounded-3xl p-3">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                    active ? "bg-white/10 text-white" : "text-white/65 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </Link>
              );
            })}
            <div className="mt-1 border-t border-white/10 pt-2">
              <Link to="/de/kontakt" onClick={() => setMobileOpen(false)}>
                <button className="fures-cta-pill w-full">Beratung anfragen</button>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
