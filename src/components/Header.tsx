import type { CSSProperties, MouseEvent as ReactMouseEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Info,
  Briefcase,
  Rocket,
  Users2,
  MessageCircle,
  MoreHorizontal,
  HelpCircle,
  ExternalLink,
  Sparkles,
  UserRound,
  Newspaper,
  Megaphone,
  Menu,
  X,
  Globe,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import type { Language } from "../contexts/LanguageContext";
import { getPath, LANGUAGE_ROUTES } from "../utils/routes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import type { LucideIcon } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { bounceIconsIn } from "../utils/iconBounce";

const triggerDockBounce = (e: ReactMouseEvent<HTMLElement>) => bounceIconsIn(e.currentTarget);

type NavItem = { path: string; label: string; icon: LucideIcon };
type MoreLink = { path: string; label: string; icon: LucideIcon; external?: boolean };

export function Header() {
  const { t, language, setLanguage } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const logoSrc = "/images/fures.png";
  const navRef = useRef<HTMLElement | null>(null);
  const activeItemRef = useRef<HTMLElement | null>(null);
  const moreTriggerRef = useRef<HTMLButtonElement | null>(null);
  const [highlightBoxStyle, setHighlightBoxStyle] = useState<CSSProperties | null>(null);
  const [isMobileNav, setIsMobileNav] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const normalizePath = (path: string) =>
    path === "/" ? "/" : path.replace(/\/+$/, "");

  const isActive = (path: string) => {
    const current = normalizePath(location.pathname);
    const target = normalizePath(path);
    if (target === "/") return current === "/";
    return current === target || current.startsWith(`${target}/`);
  };

  const r = LANGUAGE_ROUTES[language];

  const navItems: NavItem[] = [
    { path: r.about, label: t("nav.about"), icon: Info },
    { path: r.services, label: t("nav.services"), icon: Briefcase },
    { path: r.projects, label: t("nav.projects"), icon: Rocket },
    { path: r.campaigns, label: t("nav.campaigns"), icon: Megaphone },
    { path: r.blog, label: t("nav.blog"), icon: Newspaper },
    { path: r.team, label: t("nav.team") || "Team", icon: Users2 },
    { path: r.contact, label: t("nav.contact"), icon: MessageCircle },
  ];

  const navItemPaths = new Set(navItems.map((item) => normalizePath(item.path)));

  const moreLinks: MoreLink[] = [
    { path: r.campaigns, label: t("nav.campaigns"), icon: Megaphone },
    { path: r.blog, label: t("nav.blog"), icon: Newspaper },
    { path: r.faq, label: "FAQ", icon: HelpCircle },
    { path: "/gulbeneser", label: "Gülben Eser", icon: Users2, external: true },
    { path: "/furkanyonat", label: "Furkan Yonat", icon: UserRound, external: true },
    { path: "/kariyer", label: "Kariyer Asistanı", icon: Sparkles, external: true },
  ];

  const moreMenuActive = moreLinks.some((link) => {
    const linkPath = normalizePath(link.path);
    if (navItemPaths.has(linkPath)) return false;
    return isActive(link.path);
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
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

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
    { code: "tr", name: "Türkçe", flag: "🇹🇷" },
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "ru", name: "Русский", flag: "🇷🇺" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
  ];

  const handleLanguageSwitch = (lang: Language) => {
    setLanguage(lang);
    navigate(getPath(lang, 'home'));
  };

  return (
    <>
      <header className="fixed inset-x-0 top-3 z-50 px-3 sm:px-4">
        <div className="mx-auto flex w-full max-w-[1200px] items-center gap-2 sm:gap-3">

          {/* Logo */}
          <Link to="/" className="group relative shrink-0" onClick={triggerDockBounce}>
            <span className="fures-logo-pill relative flex items-center">
              <img
                src={logoSrc}
                alt="Fures"
                data-dock-icon
                className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105 sm:h-10"
              />
            </span>
          </Link>

          {/* Nav pill — hidden on mobile, shown md+ */}
          <div className="relative hidden min-w-0 flex-1 md:block">
            <div className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.15),transparent)] opacity-40 blur-2xl" />
            <nav
              ref={navRef}
              className="fures-nav-glass relative flex items-center gap-1 overflow-x-auto rounded-full px-3 py-2.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
                    onClick={triggerDockBounce}
                  >
                    <Icon data-dock-icon className={`relative z-10 h-4 w-4 transition-all duration-300 ${active ? "text-white" : "text-white/75"}`} />
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                );
              })}

              {/* More dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className={`${navBaseClasses} fures-nav-item-idle text-slate-200/70 hover:text-white focus-visible:outline-none ${moreMenuActive ? "text-white" : ""}`}
                    data-active={moreMenuActive || undefined}
                    ref={moreTriggerRef}
                    onClick={triggerDockBounce}
                  >
                    <MoreHorizontal data-dock-icon className={`relative z-10 h-4 w-4 ${moreMenuActive ? "text-white" : "text-white/75"}`} />
                    <span className="relative z-10">{t("nav.more")}</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="fures-dropdown-content mt-2 w-64 border-0 p-2" style={dropdownGlassStyle}>
                  {moreLinks.map((link) => {
                    const Icon = link.icon;
                    const active = isActive(link.path);
                    return (
                      <DropdownMenuItem key={link.path} asChild className="p-0 focus:bg-transparent">
                        <Link
                          to={link.path}
                          className={`fures-dropdown-item flex w-full items-center justify-between rounded-2xl px-3 py-2.5 text-sm ${active ? "text-white bg-white/10" : "text-white/70 hover:text-white"}`}
                          data-active={active || undefined}
                          onClick={triggerDockBounce}
                        >
                          <span className="flex items-center gap-3">
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/8">
                              <Icon data-dock-icon className="h-3.5 w-3.5 text-white/80" />
                            </span>
                            {link.label}
                          </span>
                          {link.external && <ExternalLink className="h-3.5 w-3.5 text-white/40" />}
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          </div>

          {/* Right: theme toggle + lang + CTA — desktop */}
          <div className="hidden shrink-0 items-center gap-2 md:flex">
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="fures-lang-pill text-white/65 hover:text-white/90" onClick={triggerDockBounce}>
                  <Globe data-dock-icon className="h-3.5 w-3.5" />
                  <span className="text-white/40">{language.toUpperCase()}</span>
                  <span className="font-semibold text-white">{language.toUpperCase()}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="fures-dropdown-content mt-2 w-44 border-0 p-2" style={dropdownGlassStyle}>
                {languages.map((lang) => (
                  <DropdownMenuItem key={lang.code} asChild className="p-0 focus:bg-transparent">
                    <button
                      onClick={(e) => { triggerDockBounce(e); handleLanguageSwitch(lang.code as Language); }}
                      className={`fures-dropdown-item flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm ${language === lang.code ? "text-white" : "text-white/65 hover:text-white"}`}
                    >
                      <span className="text-base">{lang.flag}</span>
                      {lang.name}
                    </button>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to={r.contact} onClick={triggerDockBounce}>
              <button className="fures-cta-pill">{t("nav.lets_talk")}</button>
            </Link>
          </div>

          {/* Mobile: theme toggle + lang + hamburger */}
          <div className="ml-auto flex shrink-0 items-center gap-2 md:hidden">
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="fures-lang-pill-sm text-white/70" onClick={triggerDockBounce}>
                  <Globe data-dock-icon className="h-3.5 w-3.5" />
                  <span className="font-semibold text-white text-xs">{language.toUpperCase()}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="fures-dropdown-content mt-2 w-44 border-0 p-2" style={dropdownGlassStyle}>
                {languages.map((lang) => (
                  <DropdownMenuItem key={lang.code} asChild className="p-0 focus:bg-transparent">
                    <button
                      onClick={(e) => { triggerDockBounce(e); handleLanguageSwitch(lang.code as Language); }}
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
              onClick={(e) => { triggerDockBounce(e); setMobileOpen((p) => !p); }}
              className="fures-nav-item-idle flex h-9 w-9 items-center justify-center rounded-full text-white/70 hover:text-white"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X data-dock-icon className="h-5 w-5" /> : <Menu data-dock-icon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile nav drawer */}
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
                  onClick={(e) => { triggerDockBounce(e); setMobileOpen(false); }}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                    active ? "bg-white/10 text-white" : "text-white/65 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon data-dock-icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </Link>
              );
            })}
            <div className="mt-1 border-t border-white/10 pt-2">
              <Link to={r.contact} onClick={(e) => { triggerDockBounce(e); setMobileOpen(false); }}>
                <button className="fures-cta-pill w-full">{t("nav.lets_talk")}</button>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
