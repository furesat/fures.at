import type { Language } from '../contexts/LanguageContext';

export type PageKey =
  | 'home'
  | 'about'
  | 'services'
  | 'projects'
  | 'team'
  | 'faq'
  | 'contact'
  | 'blog'
  | 'campaigns'
  | 'privacy'
  | 'cookies'
  | 'legal';

export const LANGUAGE_ROUTES: Record<Language, Record<PageKey, string>> = {
  tr: {
    home: '/tr',
    about: '/tr/hakkimizda',
    services: '/tr/hizmetler',
    projects: '/tr/projeler',
    team: '/tr/ekip',
    faq: '/tr/sss',
    contact: '/tr/iletisim',
    blog: '/tr/blog',
    campaigns: '/tr/kampanyalar',
    privacy: '/tr/gizlilik-politikasi',
    cookies: '/tr/cerez-politikasi',
    legal: '/tr/kvkk-aydinlatma-metni',
  },
  en: {
    home: '/en',
    about: '/en/about',
    services: '/en/services',
    projects: '/en/projects',
    team: '/en/team',
    faq: '/en/faq',
    contact: '/en/contact',
    blog: '/en/blog',
    campaigns: '/en/campaigns',
    privacy: '/en/privacy-policy',
    cookies: '/en/cookie-policy',
    legal: '/en/gdpr-disclosure',
  },
  ru: {
    home: '/ru',
    about: '/ru/about',
    services: '/ru/services',
    projects: '/ru/projects',
    team: '/ru/team',
    faq: '/ru/faq',
    contact: '/ru/contact',
    blog: '/ru/blog',
    campaigns: '/ru/campaigns',
    privacy: '/ru/privacy-policy',
    cookies: '/ru/cookie-policy',
    legal: '/ru/gdpr-disclosure',
  },
  de: {
    home: '/de',
    about: '/de/ueber-uns',
    services: '/de/leistungen',
    projects: '/de/referenzen',
    team: '/de/team',
    faq: '/de/faq',
    contact: '/de/kontakt',
    blog: '/de/blog',
    campaigns: '/de/kampagnen',
    privacy: '/de/datenschutz',
    cookies: '/de/cookies',
    legal: '/de/datenschutzhinweis',
  },
};

export function getPath(lang: Language, page: PageKey): string {
  return LANGUAGE_ROUTES[lang][page];
}

/**
 * Routes that exist in LANGUAGE_ROUTES but are not mounted for that locale.
 * Campaign content is generated in Turkish only and the German layout has no
 * campaign route, so `/de/kampagnen` must never be linked or announced as an
 * hreflang alternate.
 */
const UNAVAILABLE_ROUTES: Partial<Record<Language, PageKey[]>> = {
  de: ['campaigns'],
};

export function isRouteAvailable(lang: Language, page: PageKey): boolean {
  return !UNAVAILABLE_ROUTES[lang]?.includes(page);
}

const LOCALE_PREFIX_PATTERN = new RegExp(`^/(${Object.keys(LANGUAGE_ROUTES).join('|')})(?=/|$)`);

/** Returns the locale a path is prefixed with, or null for unprefixed paths. */
export function languageFromPath(path: string): Language | null {
  const match = path.match(LOCALE_PREFIX_PATTERN);
  return match ? (match[1] as Language) : null;
}

/** Finds the page a path belongs to, in whichever locale declares it. */
export function pageKeyFromPath(path: string): PageKey | null {
  for (const lang of Object.keys(LANGUAGE_ROUTES) as Language[]) {
    const routes = LANGUAGE_ROUTES[lang];
    for (const page of Object.keys(routes) as PageKey[]) {
      if (routes[page] === path) return page;
    }
  }
  return null;
}

/**
 * Translates a known route into another locale. Returns null when the path is
 * not a catalogued route (blog and campaign detail slugs differ per language,
 * so they must never be mapped by guessing) or when the target locale does not
 * serve that page.
 */
export function mapRouteToLanguage(path: string, target: Language): string | null {
  const page = pageKeyFromPath(path);
  if (!page) return null;
  if (!isRouteAvailable(target, page)) return null;
  return LANGUAGE_ROUTES[target][page];
}

// Countries that should be served in German (DACH region)
const DE_COUNTRIES = new Set(['DE', 'AT', 'CH', 'LI']);

// Countries that should be served in Turkish (Turkey + AZ for Azerbaijani Turkish speakers)
const TR_COUNTRIES = new Set(['TR', 'AZ']);

// Countries that should be served in Russian (former Soviet Union Russian-speaking countries)
const RU_COUNTRIES = new Set([
  'RU', 'BY', 'KZ', 'KG', 'TJ', 'TM', 'UZ', 'MD', 'AM', 'GE',
]);

export function countryToLanguage(country: string): Language {
  if (DE_COUNTRIES.has(country)) return 'de';
  if (TR_COUNTRIES.has(country)) return 'tr';
  if (RU_COUNTRIES.has(country)) return 'ru';
  return 'en';
}

/** Fallback: detect language from browser preferences */
export function detectLanguageFromBrowser(): Language {
  if (typeof navigator === 'undefined') return 'en';
  const langs = Array.isArray(navigator.languages) ? navigator.languages : [navigator.language];
  for (const l of langs) {
    const code = l.toLowerCase();
    if (code.startsWith('de') || code.startsWith('at')) return 'de';
    if (code.startsWith('tr')) return 'tr';
    if (code.startsWith('ru') || code.startsWith('be') || code.startsWith('kk')) return 'ru';
  }
  return 'en';
}

const GEO_CACHE_KEY = 'fures_geo_lang';
const GEO_CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

/** Detect language by IP country (cached in localStorage for 24 h) */
export async function detectLanguageByCountry(): Promise<Language> {
  // Check localStorage cache first
  try {
    const raw = localStorage.getItem(GEO_CACHE_KEY);
    if (raw) {
      const { lang, ts } = JSON.parse(raw) as { lang: Language; ts: number };
      if (Date.now() - ts < GEO_CACHE_TTL) {
        return lang;
      }
    }
  } catch { /* ignore */ }

  try {
    const res = await fetch('https://api.country.is/', { signal: AbortSignal.timeout(3000) });
    const data = await res.json() as { country?: string };
    const country = (data.country ?? '').toUpperCase();
    const lang = countryToLanguage(country);

    try {
      localStorage.setItem(GEO_CACHE_KEY, JSON.stringify({ lang, ts: Date.now() }));
    } catch { /* ignore */ }

    return lang;
  } catch {
    // Geolocation failed – fall back to browser language
    return detectLanguageFromBrowser();
  }
}
