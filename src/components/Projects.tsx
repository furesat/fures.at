import type { LucideIcon } from "lucide-react";
import { Button } from "./ui/button";
import { CardIcon, GradientTitle, Section } from "./ui/section";
import { ArrowRight, ExternalLink, Cpu, Globe, Hotel, Users, Camera, ChefHat, BarChart3, Briefcase, Plane, ShieldCheck, Shirt, MapPinned, BedDouble } from "lucide-react";
import { MEINHOTEL_PATHS } from "../data/meinhotel";
import { useLanguage, type Language } from "../contexts/LanguageContext";
import { getPath } from "../utils/routes";
import { Link } from "react-router-dom";

type ProjectTranslations = Record<Language, { name: string; description: string }>;

type ProjectConfig = {
  id: string;
  /** External URL or static page served outside the React app. */
  link: string;
  /** Set for case studies that live inside this React app: routed per language. */
  internalPaths?: Record<Language, string>;
  icon: LucideIcon;
  translations: ProjectTranslations;
};

export const FALLBACK_LANGUAGE: Language = 'en';

export const PROJECTS: readonly ProjectConfig[] = [
  {
    id: 'meinhotel-pms',
    link: MEINHOTEL_PATHS.en,
    internalPaths: MEINHOTEL_PATHS,
    icon: BedDouble,
    translations: {
      tr: {
        name: 'MeinHotel PMS — Otel Yönetim Sistemi',
        description:
          'Kendi geliştirdiğimiz çok kiracılı otel yönetim yazılımı: resepsiyon, rezervasyon, oda planı, folyo, fatura, kat hizmetleri, fiyat yönetimi ve otele özel rezervasyon motoru. Demo hesabıyla canlı sistemi deneyin.',
      },
      en: {
        name: 'MeinHotel PMS — Hotel Management System',
        description:
          'Our own multi-tenant hotel management software: front office, reservations, room rack, folio, invoicing, housekeeping, rate management and a built-in booking engine. Try it with the live demo account.',
      },
      de: {
        name: 'MeinHotel PMS — Hotelmanagementsystem',
        description:
          'Unsere eigene mandantenfähige Hotelsoftware: Rezeption, Reservierungen, Zimmerplan, Folio, Rechnungen, Housekeeping, Ratenpflege und eine integrierte Buchungsmaschine. Jetzt mit dem Demo-Zugang testen.',
      },
      ru: {
        name: 'MeinHotel PMS — система управления отелем',
        description:
          'Наша собственная мультиарендная система управления отелем: ресепшен, бронирования, шахматка, фолио, счета, уборка, тарифы и встроенный модуль бронирования. Попробуйте в живом демо.',
      },
    },
  },
  {
    id: 'serakinci-platform',
    link: '/projeler/serakinci',
    icon: Cpu,
    translations: {
      tr: {
        name: 'Serakıncı AI Ürün Platformu',
        description:
          'Serakıncı için otomatik, çok dilli, SEO odaklı ürün kataloğu; AI içerik üretimi ve scraping hatlarıyla beslenir.',
      },
      en: {
        name: 'AI-Powered Serakıncı Product Platform',
        description:
          'Automated, multilingual, SEO-driven product catalog for Serakıncı with AI-authored descriptions and scraping pipelines.',
      },
      de: {
        name: 'KI-gestützte Serakıncı-Produktplattform',
        description:
          'Automatisierter, mehrsprachiger und SEO-starker Produktkatalog für Serakıncı mit KI-Beschreibungen und Scraping-Pipelines.',
      },
      ru: {
        name: 'Платформа продуктов Serakıncı на базе ИИ',
        description:
          'Автоматизированный многоязычный SEO-каталог Serakıncı с генерацией описаний ИИ и пайплайнами для сбора данных.',
      },
    },
  },
  {
    id: 'zuzumood',
    link: 'https://www.zuzumood.com',
    icon: Shirt,
    translations: {
      tr: {
        name: 'ZuzuMood Butik E-Ticaret Deneyimi',
        description:
          'Texas merkezli ZuzuMood için Etsy fulfillment odaklı butik mağaza; kategori mimarisi, günlük blog ve koleksiyon akışlarıyla ölçeklendi.',
      },
      en: {
        name: 'ZuzuMood Boutique E-Commerce Experience',
        description:
          'Conversion-focused boutique storefront for Texas-based ZuzuMood with Etsy-first fulfillment, category architecture, and daily blog cadence.',
      },
      de: {
        name: 'ZuzuMood Boutique-E-Commerce-Erlebnis',
        description:
          'Conversion-orientierter Boutique-Store für ZuzuMood (Texas) mit Etsy-zentrierter Fulfillment-Logik, Kategoriestruktur und täglichem Blog-Flow.',
      },
      ru: {
        name: 'Бутик e-commerce проект ZuzuMood',
        description:
          'Бутик-витрина для ZuzuMood (Техас) с Etsy-first исполнением заказов, архитектурой категорий и ежедневным контент-потоком блога.',
      },
    },
  },
  {
    id: 'maria-alm-route-atlas',
    link: 'https://inmariaalm.at',
    icon: MapPinned,
    translations: {
      tr: {
        name: 'in Maria Alm Dijital Keşif Atlası',
        description:
          'Yapım aşamasında: Maria Alm için akıllı rota filtreleri, sezon rehberi, gece/fotoğraf deneyimleri ve AI destekli günlük planlayıcı.',
      },
      en: {
        name: 'in Maria Alm Digital Discovery Atlas',
        description:
          'Under construction: a smart Maria Alm route atlas with filters, seasonal guides, night/photo experiences, and AI-powered day planning.',
      },
      de: {
        name: 'in Maria Alm Digitaler Entdeckungsatlas',
        description:
          'In Umsetzung: smarter Maria-Alm-Routenatlas mit Filtern, Saisonwelten, Nacht-/Foto-Erlebnissen und KI-gestützter Tagesplanung.',
      },
      ru: {
        name: 'Цифровой атлас in Maria Alm',
        description:
          'В разработке: умный атлас маршрутов Maria Alm с фильтрами, сезонными гидами, ночными/фото-впечатлениями и AI-планером дня.',
      },
    },
  },
  {
    id: 'fures-career-coach',
    link: '/kariyer.html',
    icon: Briefcase,
    translations: {
      tr: {
        name: 'Fures Kariyer Koçu',
        description:
          'AI destekli kariyer koçunuz: CV hazırlama, ön yazı, mülakat pratiği ve dil geliştirme için uçtan uca destek sunar.',
      },
      en: {
        name: 'Fures Career Coach',
        description:
          'Your AI-powered career coach delivering end-to-end support for CVs, cover letters, interview practice, and language growth.',
      },
      de: {
        name: 'Fures Karriere-Coach',
        description:
          'KI-gestützter Karrierecoach mit ganzheitlicher Unterstützung für Lebenslauf, Anschreiben, Interviewtraining und Sprachentwicklung.',
      },
      ru: {
        name: 'Fures карьерный коуч',
        description:
          'Карьерный коуч на базе ИИ: комплексная помощь с резюме, сопроводительными письмами, собеседованиями и развитием языка.',
      },
    },
  },
  {
    id: 'ai-detector',
    link: '/ai-content-detector/',
    icon: ShieldCheck,
    translations: {
      tr: {
        name: 'AI-Detector',
        description:
          'Metin ve görsellerdeki yapay zekâ izlerini saniyeler içinde analiz eden, kanıtlı raporlar ve tek tıkla insanileştirme sunan hepsi bir arada çözüm.',
      },
      en: {
        name: 'AI-Detector',
        description:
          'All-in-one platform that inspects text and visuals for AI signals in seconds, delivers evidence-backed reports, and humanizes content with one click.',
      },
      de: {
        name: 'AI-Detector',
        description:
          'All-in-One-Plattform, die Texte und Bilder in Sekunden auf KI-Spuren prüft, belegte Reports liefert und Inhalte per Klick humanisiert.',
      },
      ru: {
        name: 'AI-Detector',
        description:
          'Единая платформа: за секунды анализирует тексты и изображения на следы ИИ, выдаёт доказательные отчёты и гуманизирует контент одним кликом.',
      },
    },
  },
  {
    id: 'cyprus-vacation-planner',
    link: '/projeler/aboutcyprus',
    icon: Globe,
    translations: {
      tr: {
        name: 'AI Destekli Kıbrıs Tatil Planlayıcı',
        description:
          'Kullanıcı tercihleri ve hava durumuna göre çok dilli, kişiselleştirilmiş Kıbrıs tatil planları oluşturan akıllı uygulama.',
      },
      en: {
        name: 'AI-Powered Cyprus Vacation Planner',
        description:
          'Intelligent planner that builds multilingual, personalised Cyprus itineraries around traveller preferences and live weather.',
      },
      de: {
        name: 'KI-gestützter Zypern-Reiseplaner',
        description:
          'Intelligenter Planer, der mehrsprachige, personalisierte Zypern-Reisepläne anhand von Vorlieben und Wetterdaten erstellt.',
      },
      ru: {
        name: 'AI-планировщик отпуска на Кипре',
        description:
          'Умное приложение формирует многоязычные и персонализированные маршруты по Кипру с учётом предпочтений и погоды.',
      },
    },
  },
  {
    id: 'travel-ai-companion',
    link: '/projeler/travel',
    icon: Plane,
    translations: {
      tr: {
        name: 'Fures Travel AI Companion',
        description:
          'Gemini Live destekli 3D seyahat asistanı; rotaları gerçekçi Google Maps deneyimi üzerinde anlık olarak sunar.',
      },
      en: {
        name: 'Fures Travel AI Companion',
        description:
          'Gemini Live-powered conversational 3D travel companion that streams itineraries onto a photorealistic Google Maps canvas.',
      },
      de: {
        name: 'Fures Travel AI Companion',
        description:
          'Gesprächiger 3D-Reisebegleiter mit Gemini Live, der Routen live in einer fotorealistischen Google-Maps-Ansicht darstellt.',
      },
      ru: {
        name: 'Fures Travel AI Companion',
        description:
          'Разговорный 3D-помощник путешествий на базе Gemini Live, показывающий маршруты на фотореалистичных картах Google.',
      },
    },
  },
  {
    id: 'hotel-agency-integration',
    link: '/projeler/hotel',
    icon: Hotel,
    translations: {
      tr: {
        name: 'Otel & Acenta Entegrasyonu',
        description:
          'Altı oteli acente operasyonlarına entegre ederek süreçleri optimize ettik, maliyetleri düşürdük ve veri akışını birleştirdik.',
      },
      en: {
        name: 'Hotel & Agency Integration',
        description:
          'Integrated six hotels with agency operations, streamlining processes, reducing costs, and unifying data flows.',
      },
      de: {
        name: 'Hotel- & Agentur-Integration',
        description:
          'Integration von sechs Hotels in Agenturprozesse: optimierte Abläufe, geringere Kosten und gebündelte Datenströme.',
      },
      ru: {
        name: 'Интеграция отелей и агентства',
        description:
          'Интегрировали шесть отелей с агентскими процессами, оптимизировали операции, снизили расходы и объединили потоки данных.',
      },
    },
  },
  {
    id: 'icalt-2024',
    link: '/projeler/icalt',
    icon: Users,
    translations: {
      tr: {
        name: 'ICALT 2024 Kongre Yönetimi',
        description:
          'Dorana Tourism iş birliğiyle uluslararası kongre için baştan sona planlama ve koordinasyon hizmeti.',
      },
      en: {
        name: 'ICALT 2024 Congress Management',
        description:
          'End-to-end planning and coordination of the international ICALT 2024 congress alongside Dorana Tourism.',
      },
      de: {
        name: 'ICALT 2024 Kongressmanagement',
        description:
          'Ganzheitliche Planung und Koordination des internationalen ICALT-2024-Kongresses in Zusammenarbeit mit Dorana Tourism.',
      },
      ru: {
        name: 'Управление конгрессом ICALT 2024',
        description:
          'Полное планирование и координация международного конгресса ICALT 2024 совместно с Dorana Tourism.',
      },
    },
  },
  {
    id: 'pixshop',
    link: 'https://pixshop-720548631405.us-west1.run.app/',
    icon: Camera,
    translations: {
      tr: {
        name: 'PixShop',
        description:
          'Yapay zekâ destekli fotoğraf düzenleme: tek tıkla rötuş, yaratıcı filtreler ve profesyonel ayarlamalar.',
      },
      en: {
        name: 'PixShop',
        description:
          'AI-powered photo editing made simple: retouch, apply creative filters, or make professional adjustments in one click.',
      },
      de: {
        name: 'PixShop',
        description:
          'KI-gestütztes Foto-Editing leicht gemacht: Retusche, kreative Filter und professionelle Anpassungen mit nur einem Klick.',
      },
      ru: {
        name: 'PixShop',
        description:
          'Простое редактирование фото на базе ИИ: ретушь, творческие фильтры и профессиональные настройки в один клик.',
      },
    },
  },
  {
    id: 'pantry-chef',
    link: 'https://ai-recipe-generator-720548631405.us-west1.run.app/',
    icon: ChefHat,
    translations: {
      tr: {
        name: 'Pantry Chef AI',
        description:
          'Dolabınızdaki malzemeleri girin; yapay zekâ şefimiz size anında yaratıcı tarifler önersin.',
      },
      en: {
        name: 'Pantry Chef AI',
        description:
          'Enter the ingredients in your pantry and let our AI chef instantly suggest creative recipes.',
      },
      de: {
        name: 'Pantry Chef KI',
        description:
          'Einfach vorhandene Zutaten eingeben und der KI-Koch schlägt sofort kreative Rezepte vor.',
      },
      ru: {
        name: 'Pantry Chef AI',
        description:
          'Введи продукты из кладовой — ИИ-шеф мгновенно предложит креативные рецепты.',
      },
    },
  },
  {
    id: 'odysseus',
    link: 'https://project-odysseus-720548631405.us-west1.run.app/',
    icon: BarChart3,
    translations: {
      tr: {
        name: 'ODYSSEUS',
        description:
          'Geleceğe hazır iş zekâsı platformu; tanımlı otelleri seçin veya kendi web sitenizi analiz edin.',
      },
      en: {
        name: 'ODYSSEUS',
        description:
          'Future-ready business intelligence platform—select a featured hotel or analyse your own website content.',
      },
      de: {
        name: 'ODYSSEUS',
        description:
          'Zukunftsfähige Business-Intelligence-Plattform: Wähle ein Hotel oder analysiere deine eigene Website.',
      },
      ru: {
        name: 'ODYSSEUS',
        description:
          'Бизнес-аналитика нового поколения: выберите один из отелей или проанализируйте свой сайт.',
      },
    },
  }
] as const;

export function Projects() {
  const { language, t } = useLanguage();

  return (
    <Section id="projeler">
      {/* Header */}
      <div className="mb-14 text-center">
        <p className="mb-3 text-sm uppercase tracking-[0.32em] text-orange-400">
          {t('projects.subtitle')}
        </p>
        <GradientTitle className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
          {t('projects.title')}
        </GradientTitle>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/60">
          {t('projects.description')}
        </p>
      </div>

      {/* Projects grid */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project) => {
          const Icon = project.icon;
          const translation = project.translations[language] ?? project.translations[FALLBACK_LANGUAGE];
          const internalPath = project.internalPaths?.[language];
          return (
            <article
              key={project.id}
              className="fures-card group flex flex-col rounded-[2rem] p-7 hover:-translate-y-0.5"
            >
              <CardIcon className="transition-transform duration-300 group-hover:scale-105">
                <Icon className="h-5 w-5 text-white" />
              </CardIcon>

              <h3 className="mb-2.5 text-base font-semibold text-white transition-colors group-hover:text-orange-400" style={{ letterSpacing: '-0.02em' }}>
                {translation.name}
              </h3>
              <p className="mb-6 line-clamp-4 text-sm leading-relaxed text-white/55">
                {translation.description}
              </p>

              <Button variant="outline" className="mt-auto w-full justify-center text-sm" asChild>
                {internalPath ? (
                  <Link to={internalPath}>
                    {t('projects.visit_project')}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                ) : (
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    {t('projects.visit_project')}
                    <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
                  </a>
                )}
              </Button>
            </article>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="mt-16">
        <div className="fures-card mx-auto max-w-4xl rounded-[2.5rem] p-10 text-center sm:p-12">
          <GradientTitle as="h3" className="mb-4 text-2xl font-bold sm:text-3xl lg:text-4xl">
            {t('projects.start_heading')}
          </GradientTitle>
          <p className="mx-auto mb-9 max-w-2xl text-base leading-relaxed text-white/60">
            {t('projects.start_body')}
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button asChild size="lg" variant="gradient" className="text-sm">
              <Link to={getPath(language, "contact")}>{t('projects.start_primary_cta')}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-sm">
              <Link to={getPath(language, "projects")}>{t('projects.start_secondary_cta')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
