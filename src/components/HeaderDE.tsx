import { useState, useEffect, useRef, useCallback } from "react";
import type { CSSProperties } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Globe, Info, Briefcase, MessageCircle, Newspaper, MoreHorizontal, HelpCircle } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function HeaderDE() {
  const { t } = useLanguage();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const activeItemRef = useRef<HTMLElement | null>(null);
  const moreTriggerRef = useRef<HTMLButtonElement | null>(null);
  const [highlightBoxStyle, setHighlightBoxStyle] = useState<CSSProperties | null>(null);
  const [isMobileNav, setIsMobileNav] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const normalizePath = (path: string) => {
    if (path === "/") return "/";
    return path.replace(/\/+$/, "");
  };

  const isActive = (path: string) => {
    const current = normalizePath(location.pathname);
    const target = normalizePath(path);
    if (target === "/de") return current === "/de";
    return current === target || current.startsWith(`${target}/`);
  };

  const navItems = [
    { path: "/de/ueber-uns", label: t("nav.about"), icon: Info },
    { path: "/de/leistungen", label: t("nav.services"), icon: Briefcase },
    { path: "/de/kontakt", label: t("nav.contact"), icon: MessageCircle },
    { path: "/de/blog", label: t("nav.blog"), icon: Newspaper },
  ];

  const moreLinks = [
    { path: "/de/sss", label: "FAQ", icon: HelpCircle },
  ];

  const navItemPaths = new Set(navItems.map((item) => normalizePath(item.path)));

  const moreMenuActive = moreLinks.some((link) => {
    const linkPath = normalizePath(link.path);
    if (navItemPaths.has(linkPath)) return false;
    return isActive(link.path);
  });

  const navBaseClasses =
    "ios-nav-item group relative z-10 flex min-w-[78px] flex-col items-center justify-center gap-1 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] transition-all duration-500 focus-visible:outline-none";

  const updateHighlightPosition = useCallback(() => {
    if (isMobileNav) { setHighlightBoxStyle(null); return; }
    const navEl = navRef.current;
    if (!navEl) { setHighlightBoxStyle(null); return; }
    const targetEl = activeItemRef.current ?? (moreMenuActive ? moreTriggerRef.current : null);
    if (!targetEl) { setHighlightBoxStyle(null); return; }
    const navRect = navEl.getBoundingClientRect();
    const targetRect = targetEl.getBoundingClientRect();
    const paddingX = 14;
    const paddingY = 8;
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
    const mq = window.matchMedia("(max-width: 640px)");
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
    const handler = () => updateHighlightPosition();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [updateHighlightPosition]);

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

  const navItemClasses = (path: string) =>
    `${navBaseClasses} ${
      isActive(path)
        ? "liquid-pill is-active text-white"
        : "fures-nav-item-idle text-slate-200/75 hover:text-white"
    }`;

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Brand tag + mobile lang toggle */}
        <div className="flex w-full items-center justify-between sm:w-auto sm:flex-none">
          <Link to="/de" className="group relative flex items-center" aria-label="Fures Tech — Startseite">
            <span className="fures-logo-pill relative flex items-center">
              <img
                src="/images/fures.png"
                alt="Fures Tech"
                className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </span>
          </Link>
          <div className="flex items-center gap-2 sm:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="flex items-center justify-center w-10 h-10 rounded-full text-white/70 hover:text-white fures-nav-item-idle transition-colors duration-200"
              aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Desktop nav pill */}
        <div className="order-last sm:order-none sm:flex-1 hidden sm:block">
          <div className="group relative">
            <div className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),rgba(9,9,11,0))] opacity-50 blur-3xl transition-opacity duration-500 group-hover:opacity-80" />
            <nav
              ref={navRef}
              className="fures-nav-glass group relative flex items-center gap-3 overflow-x-auto rounded-full px-4 py-3 transition-all duration-500 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {!isMobileNav && highlightBoxStyle && (
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
                    <Icon className={`relative z-10 h-5 w-5 transition-all duration-300 ${active ? "text-white drop-shadow-[0_10px_22px_rgba(15,23,42,0.4)]" : "text-white/80 group-hover:text-white"}`} />
                    <span className="relative z-10 text-[10px] font-semibold uppercase tracking-[0.24em]">{item.label}</span>
                  </Link>
                );
              })}

              {moreLinks.length > 0 && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className={`${navBaseClasses} fures-nav-item-idle text-slate-200/75 transition-all duration-300 hover:text-white focus-visible:outline-none ${moreMenuActive ? "text-white" : ""}`}
                      data-active={moreMenuActive || undefined}
                      ref={moreTriggerRef}
                    >
                      <MoreHorizontal className={`relative z-10 h-5 w-5 transition-all duration-300 ${moreMenuActive ? "text-white drop-shadow-[0_10px_22px_rgba(15,23,42,0.4)]" : "text-white/80"}`} />
                      <span className="relative z-10 text-[10px] font-semibold uppercase tracking-[0.24em]">Mehr</span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="liquid-glass mt-3 w-56 rounded-3xl p-3 text-white backdrop-blur-[42px] backdrop-saturate-[1.75]"
                    style={dropdownGlassStyle}
                  >
                    <div className="space-y-2">
                      {moreLinks.map((link) => {
                        const Icon = link.icon;
                        const active = isActive(link.path);
                        return (
                          <DropdownMenuItem key={link.path} asChild className="rounded-2xl p-0 focus:bg-transparent focus:text-white">
                            <Link
                              to={link.path}
                              className={`liquid-glass ios-nav-menu-item relative flex items-center gap-3 overflow-hidden rounded-2xl px-4 py-3 text-sm transition-all duration-500 ${active ? "is-active text-white" : "text-slate-200/75 hover:text-white"}`}
                              data-active={active || undefined}
                              style={dropdownGlassStyle}
                            >
                              <span className="relative flex size-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white">
                                <Icon className="h-4 w-4 text-white" />
                              </span>
                              {link.label}
                            </Link>
                          </DropdownMenuItem>
                        );
                      })}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </nav>
          </div>
        </div>

        {/* Right: lang pill + CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="fures-lang-pill text-white/70">
            <Globe className="w-3.5 h-3.5" />
            <span className="text-white/50">DE</span>
            <span className="text-white font-semibold">DE</span>
          </div>
          <Link to="/de/kontakt">
            <button className="fures-cta-pill">Beratung anfragen</button>
          </Link>
        </div>
      </div>

      {/* Mobile nav drawer */}
      <div
        className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <nav
          className="fures-nav-glass mt-3 rounded-3xl px-4 pt-2 pb-4 flex flex-col gap-1"
          aria-label="Mobile Navigation"
        >
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-2xl transition-colors duration-200 ${
                  active ? "text-white bg-white/10" : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="pt-2 mt-1 border-t border-white/10">
            <Link to="/de/kontakt">
              <button className="fures-cta-pill w-full">Beratung anfragen</button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
