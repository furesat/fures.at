import type { Language } from "../contexts/LanguageContext";

/**
 * MeinHotel PMS — Fures Tech's own multi-tenant hotel management system.
 * Content source: furesat/meinhotel (README.md, CLAUDE.md, docs/PMS_SYSTEM_BLUEPRINT.md).
 * Keep claims aligned with what the product actually ships today.
 */

/** Public entry points of the live PMS (Netlify project `fureshotel`). */
export const MEINHOTEL_APP = {
  appUrl: "https://app.fures.tech",
  demoUrl: "https://app.fures.tech/demo",
  loginUrl: "https://app.fures.tech/login",
  /** Dedicated demo Auth user — has access to the fictional sample hotel only. */
  demoEmail: "demo@fures.tech",
  /** Shared demo password the owner publishes for prospects and recruiters. */
  demoPassword: "Test123!",
  demoHotel: "Alpin Panorama Grand Resort | DEMO",
} as const;

/** Canonical route of the case study per language. */
export const MEINHOTEL_PATHS: Record<Language, string> = {
  tr: "/tr/projeler/meinhotel-pms",
  en: "/en/projects/meinhotel-pms",
  ru: "/ru/projects/meinhotel-pms",
  de: "/de/referenzen/meinhotel-pms",
};

export type ModuleId =
  | "reception"
  | "reservations"
  | "roomrack"
  | "calendar"
  | "guests"
  | "housekeeping"
  | "folio"
  | "payments"
  | "pos"
  | "rates"
  | "reports"
  | "website"
  | "integrations"
  | "settings";

export const MODULE_ORDER: readonly ModuleId[] = [
  "reception",
  "reservations",
  "roomrack",
  "calendar",
  "guests",
  "housekeeping",
  "folio",
  "payments",
  "pos",
  "rates",
  "reports",
  "website",
  "integrations",
  "settings",
];

type TitledText = { title: string; description: string };

export interface MeinHotelContent {
  seo: { title: string; description: string; keywords: string };
  badge: string;
  title: string;
  tagline: string;
  intro: string;
  ctaDemo: string;
  ctaLogin: string;
  ctaContact: string;
  backToProjects: string;
  highlights: { value: string; label: string }[];
  demo: {
    heading: string;
    body: string;
    addressLabel: string;
    userLabel: string;
    passwordLabel: string;
    hotelLabel: string;
    note: string;
    loginHint: string;
  };
  modulesHeading: string;
  modulesIntro: string;
  modules: Record<ModuleId, TitledText>;
  flowHeading: string;
  flowIntro: string;
  flow: TitledText[];
  techHeading: string;
  techIntro: string;
  tech: { title: string; items: string[] }[];
  audienceHeading: string;
  audiences: { title: string; body: string; bullets: string[] }[];
  statusHeading: string;
  statusLiveLabel: string;
  statusNextLabel: string;
  statusLive: string[];
  statusNext: string[];
  statusNote: string;
  finalHeading: string;
  finalBody: string;
}

const tr: MeinHotelContent = {
  seo: {
    title: "MeinHotel PMS | Otel Yönetim Yazılımı ve Rezervasyon Motoru | Fures Tech",
    description:
      "MeinHotel, Fures Tech'in geliştirdiği çok kiracılı otel yönetim sistemi (PMS): resepsiyon, rezervasyon, oda planı, folyo, fatura, kat hizmetleri, fiyat yönetimi ve otele özel rezervasyon motoru. Demo hesabıyla canlı sistemi hemen deneyin.",
    keywords:
      "otel yönetim yazılımı, pms, otel programı, rezervasyon motoru, otel rezervasyon sistemi, kktc otel yazılımı, çok kiracılı pms, otel front office yazılımı",
  },
  badge: "Fures Tech Ürünü",
  title: "MeinHotel PMS",
  tagline:
    "Otel operasyonunun tamamı tek çalışma alanında: rezervasyondan folyoya, kat hizmetlerinden faturaya.",
  intro:
    "MeinHotel, Fures Tech'in kendi geliştirdiği çok kiracılı (multi-tenant) otel yönetim sistemidir. Resepsiyon masasında günlük işleyişi bizzat yaşayan bir ekip tarafından tasarlandı: rezervasyon açmak, oda vermek, check-in yapmak, folyoya harcama işlemek ve faturayı kesmek aynı ekranda, sayfa değiştirmeden ilerler. Her otel yalnızca kendi verisini görür; izolasyon uygulama katmanında değil, Postgres satır seviyesi güvenliği (RLS) ile veritabanında uygulanır.",
  ctaDemo: "Canlı demoyu aç",
  ctaLogin: "PMS'e giriş yap",
  ctaContact: "Oteliniz için teklif alın",
  backToProjects: "Tüm projeler",
  highlights: [
    { value: "14 modül", label: "Ön ofisten raporlamaya tek sistem" },
    { value: "3 dil", label: "Türkçe, Almanca ve İngilizce arayüz" },
    { value: "RLS", label: "Her satır otel bazında izole edilir" },
    { value: "Web + Booking", label: "Otele özel web sitesi ve rezervasyon motoru" },
  ],
  demo: {
    heading: "Demo hesabıyla gerçek sistemi deneyin",
    body:
      "Aşağıdaki bağlantı bir tanıtım videosuna değil, gerçek uygulamaya açılır. Demo kullanıcısı yalnızca kurgusal bir örnek otelde yetkilidir ve hiçbir gerçek müşteri verisine erişemez. Demo sayfasında yalnızca şifreyi girmeniz yeterlidir.",
    addressLabel: "Demo adresi",
    userLabel: "Kullanıcı",
    passwordLabel: "Şifre",
    hotelLabel: "Örnek otel",
    note:
      "Demo oteli tüm ziyaretçilerle paylaşılır: yaptığınız değişiklikleri başkaları da görebilir ve örnek veriler zaman zaman sıfırlanır. Lütfen gerçek misafir bilgisi girmeyin.",
    loginHint: "Kendi otel hesabınız varsa doğrudan giriş yapabilirsiniz:",
  },
  modulesHeading: "Sistemin modülleri",
  modulesIntro:
    "Her modül aynı veri modeli üzerinde çalışır; bir ekranda yapılan işlem diğerlerine anında yansır.",
  modules: {
    reception: {
      title: "Resepsiyon",
      description:
        "Günün tamamı tek zaman çizelgesinde: gelişler, çıkışlar, konaklayanlar, hızlı rezervasyon formu ve tek tıkla check-in / check-out.",
    },
    reservations: {
      title: "Rezervasyon Yönetimi",
      description:
        "Müsaitlik kontrolü, oda ataması, durum akışı, grup rezervasyonları ve isim listeleri. Misafir zorunlu alanları, mükerrer konaklama ve iptal nedenleri tanımlardan yönetilir.",
    },
    roomrack: {
      title: "Oda Planı (Room Rack)",
      description:
        "Tüm odaların anlık doluluk ve temizlik durumu tek ızgarada; oda değişikliği ve durum güncellemesi aynı ekrandan yapılır.",
    },
    calendar: {
      title: "Takvim",
      description:
        "Tarih bazlı doluluk görünümü; boş oda arama, oda tipi müsaitliği ve ileriye dönük planlama.",
    },
    guests: {
      title: "Misafir Kartı ve CRM",
      description:
        "Misafir kayıt defteri, hızlı arama, mükerrer kayıt uyarısı, odadaki ek kişiler ve kayıt kartı (registration card) çıktısı.",
    },
    housekeeping: {
      title: "Kat Hizmetleri",
      description:
        "Oda temizlik durumları resepsiyonla aynı anda güncellenir; kirli, temiz ve kontrol edilmiş odalar ayrı ayrı izlenir.",
    },
    folio: {
      title: "Folyo ve Fatura",
      description:
        "Konaklama ve ekstra harcamaları folyoya işleyin; tekil veya toplu fatura oluşturun, tahsilat takibini (credit control) tek listeden yürütün.",
    },
    payments: {
      title: "Tahsilat ve Ön Kasa",
      description:
        "Ödeme kaydı, makbuz çıktısı ve vardiya bazlı ön kasa hareketleri; her hareket ilgili folyo ve faturaya bağlı kalır.",
    },
    pos: {
      title: "Satış Noktası (POS)",
      description:
        "Bar ve restoran adisyonları; açılan çek doğrudan misafirin folyosuna aktarılabilir.",
    },
    rates: {
      title: "Fiyat ve Kontenjan",
      description:
        "Fiyat planları, fiyat takvimi, pansiyon farkları, çocuk fiyatlandırma kuralları ve yaş grupları; tek motor hem PMS'i hem rezervasyon motorunu besler.",
    },
    reports: {
      title: "Raporlar ve Gösterge Paneli",
      description:
        "Doluluk ve gelir göstergeleri, gelir raporu ve folyo hareket raporu; günlük operasyonun sayısal özeti.",
    },
    website: {
      title: "Otel Web Sitesi ve Rezervasyon Motoru",
      description:
        "Her otel kendi web sitesini ve çok adımlı rezervasyon motorunu sistem içinden yönetir; kendi alan adı veya fures.tech alt alan adı üzerinden yayınlanır. Rezervasyonlar doğrudan PMS'e düşer.",
    },
    integrations: {
      title: "Entegrasyonlar ve Otomasyon",
      description:
        "Google Hotels için fiyat/müsaitlik beslemesi, rezervasyon onay e-postaları ve otel bildirimleri; eksik yapılandırma rezervasyonu asla düşürmez.",
    },
    settings: {
      title: "Tanımlar ve Ayarlar",
      description:
        "Oda tipleri, pansiyon ve fiyat tipleri, departmanlar, gelir kodları, ürünler, acenteler ve kanallar dahil iki yüze yakın otel tanımı tek ayar merkezinden yönetilir.",
    },
  },
  flowHeading: "Bir konaklama sistemde nasıl ilerler?",
  flowIntro: "Demo hesabında da aynı akışı baştan sona deneyebilirsiniz.",
  flow: [
    {
      title: "1 · Rezervasyon",
      description:
        "Müsaitlik kontrolüyle rezervasyon açılır; pazar, segment ve kaynak bilgisi tanımlara göre zorunlu tutulabilir.",
    },
    {
      title: "2 · Oda ataması ve check-in",
      description:
        "Oda planından oda verilir, misafir kartı tamamlanır ve kayıt kartı çıktısı alınır.",
    },
    {
      title: "3 · Konaklama",
      description:
        "Folyoya harcama işlenir, POS adisyonları aktarılır, kat hizmetleri oda durumunu günceller.",
    },
    {
      title: "4 · Tahsilat ve fatura",
      description:
        "Ödeme alınır, makbuz kesilir, fatura tekil veya toplu olarak oluşturulur.",
    },
    {
      title: "5 · Check-out ve raporlar",
      description:
        "Çıkış sonrası oda temizliğe düşer, gelir ve folyo raporları güncel veriyle çalışır.",
    },
  ],
  techHeading: "Teknik mimari",
  techIntro:
    "MeinHotel bir şablon üzerine kurulmadı; veri modeli, güvenlik kuralları ve arayüz uçtan uca bu operasyon için tasarlandı.",
  tech: [
    {
      title: "Uygulama",
      items: ["Next.js 15 App Router", "React 19", "TypeScript (strict)", "Tailwind CSS", "Server Actions"],
    },
    {
      title: "Veri ve güvenlik",
      items: [
        "Supabase Postgres",
        "Satır seviyesi güvenlik (RLS)",
        "Otel bazlı bileşik anahtarlar",
        "Sürümlenmiş SQL migration'ları",
      ],
    },
    {
      title: "Kalite",
      items: ["Saf modüller için birim testleri", "typecheck · lint · test · build zinciri", "Şema değişikliğine dayanıklı yazma akışları"],
    },
    {
      title: "Altyapı",
      items: ["Netlify", "Çoklu alan adı yönlendirme", "İşlemsel e-posta", "Google Hotels ARI beslemesi"],
    },
  ],
  audienceHeading: "Kimin için?",
  audiences: [
    {
      title: "Oteller için",
      body:
        "Komisyonsuz direkt rezervasyon ve sadeleşmiş bir ön ofis operasyonu hedefleyen bağımsız oteller ve küçük zincirler.",
      bullets: [
        "Kendi web siteniz ve rezervasyon motorunuz PMS ile aynı veriyi kullanır",
        "Türkçe, Almanca ve İngilizce arayüzle kısa eğitim süresi",
        "Fiyat, kontenjan ve tanımlar tek yerden yönetilir",
        "Veri izolasyonu veritabanı seviyesinde uygulanır",
      ],
    },
    {
      title: "İşverenler ve teknik ekipler için",
      body:
        "Bu proje, Fures Tech'in ürün geliştirme yaklaşımının canlı örneğidir: gerçek bir sektör ihtiyacı, üretimde çalışan bir sistem.",
      bullets: [
        "Çok kiracılı mimari ve satır seviyesi güvenlik",
        "Ön ofis, muhasebe ve fiyatlandırmayı kapsayan geniş alan modeli",
        "Belgelenmiş ürün kararları ve testlerle korunan iş kuralları",
        "Demo hesabıyla kod yerine çalışan ürünü inceleme imkânı",
      ],
    },
  ],
  statusHeading: "Ürünün güncel durumu",
  statusLiveLabel: "Yayında",
  statusNextLabel: "Yol haritasında",
  statusLive: [
    "Resepsiyon, rezervasyon ve oda planı",
    "Misafir kartı, kayıt kartı ve kat hizmetleri",
    "Folyo, fatura, tahsilat ve ön kasa",
    "Fiyat planları, fiyat takvimi ve çocuk fiyatlandırması",
    "Otel web sitesi, rezervasyon motoru ve onay e-postaları",
    "Google Hotels fiyat/müsaitlik beslemesi",
  ],
  statusNext: [
    "Kanal yöneticisi (channel manager) entegrasyonu",
    "Rezervasyonda online ödeme ve kapora",
    "KBS bildirimi ve gün sonu (night audit)",
    "Kat hizmetleri için mobil uygulama",
  ],
  statusNote:
    "Dürüst bir demo için: sistem üretimde çalışıyor ancak hâlâ geliştiriliyor. Kanal yöneticisi, online ödeme ve mali entegrasyon gibi başlıklar yol haritasındadır.",
  finalHeading: "Otelinizde denemek ister misiniz?",
  finalBody:
    "Kurulum, veri aktarımı ve ekip eğitimi dahil uçtan uca ilerliyoruz. Önce demoyu inceleyin, sonra otelinizin ihtiyaçlarını birlikte planlayalım.",
};

const de: MeinHotelContent = {
  seo: {
    title: "MeinHotel PMS | Hotelsoftware & Buchungsmaschine aus Österreich | Fures Tech",
    description:
      "MeinHotel ist das mandantenfähige Hotelmanagementsystem von Fures Tech: Rezeption, Reservierungen, Zimmerplan, Folio, Rechnungen, Housekeeping, Ratenpflege und eine eigene Buchungsmaschine. Jetzt mit dem Demo-Zugang live testen.",
    keywords:
      "hotelsoftware, pms hotel, hotelprogramm österreich, buchungsmaschine hotel, property management system, hotel software dach, direktbuchungen, hotelverwaltung software",
  },
  badge: "Ein Produkt von Fures Tech",
  title: "MeinHotel PMS",
  tagline:
    "Der gesamte Hotelbetrieb in einer Oberfläche: von der Reservierung bis zum Folio, vom Housekeeping bis zur Rechnung.",
  intro:
    "MeinHotel ist das mandantenfähige Hotelmanagementsystem, das Fures Tech selbst entwickelt. Entstanden ist es aus der täglichen Arbeit an der Rezeption: Reservierung anlegen, Zimmer zuweisen, einchecken, Leistungen auf das Folio buchen und die Rechnung stellen — alles im selben Arbeitsbereich, ohne Systemwechsel. Jedes Hotel sieht ausschließlich seine eigenen Daten; die Trennung wird nicht in der Anwendung, sondern über Row Level Security direkt in der Postgres-Datenbank erzwungen.",
  ctaDemo: "Live-Demo öffnen",
  ctaLogin: "Zum PMS-Login",
  ctaContact: "Angebot für Ihr Hotel",
  backToProjects: "Alle Referenzen",
  highlights: [
    { value: "14 Module", label: "Von der Rezeption bis zum Reporting" },
    { value: "3 Sprachen", label: "Deutsch, Englisch und Türkisch" },
    { value: "RLS", label: "Mandantentrennung in der Datenbank" },
    { value: "Web + Booking", label: "Hotel-Website und Buchungsmaschine inklusive" },
  ],
  demo: {
    heading: "Testen Sie das echte System mit dem Demo-Zugang",
    body:
      "Der Link führt nicht zu einem Video, sondern in die echte Anwendung. Der Demo-Benutzer ist ausschließlich für ein fiktives Musterhotel berechtigt und hat keinen Zugriff auf echte Kundendaten. Auf der Demo-Seite genügt die Eingabe des Passworts.",
    addressLabel: "Demo-Adresse",
    userLabel: "Benutzer",
    passwordLabel: "Passwort",
    hotelLabel: "Musterhotel",
    note:
      "Das Musterhotel wird von allen Besucherinnen und Besuchern geteilt: Ihre Änderungen können für andere sichtbar sein und die Beispieldaten werden gelegentlich zurückgesetzt. Bitte geben Sie keine echten Gästedaten ein.",
    loginHint: "Sie haben bereits einen eigenen Hotelzugang? Dann geht es hier direkt weiter:",
  },
  modulesHeading: "Die Module im Überblick",
  modulesIntro:
    "Alle Module arbeiten auf demselben Datenmodell — was in einem Bereich gebucht wird, ist sofort überall sichtbar.",
  modules: {
    reception: {
      title: "Rezeption",
      description:
        "Der ganze Tag in einer Zeitleiste: Anreisen, Abreisen, Hausgäste, Schnellreservierung sowie Check-in und Check-out mit einem Klick.",
    },
    reservations: {
      title: "Reservierungen",
      description:
        "Verfügbarkeitsprüfung, Zimmerzuweisung, Statusverlauf, Gruppenreservierungen und Namenslisten. Pflichtangaben, Doppelbuchungswarnungen und Stornogründe steuern Sie über die Stammdaten.",
    },
    roomrack: {
      title: "Zimmerplan (Room Rack)",
      description:
        "Belegung und Reinigungsstatus aller Zimmer in einem Raster — Zimmerwechsel und Statusänderungen erfolgen direkt darin.",
    },
    calendar: {
      title: "Kalender",
      description:
        "Belegung nach Datum, freie Zimmer suchen, Verfügbarkeit je Zimmertyp und vorausschauende Planung.",
    },
    guests: {
      title: "Gästekartei & CRM",
      description:
        "Gästeverzeichnis mit schneller Suche, Dublettenwarnung, Mitreisenden je Zimmer und druckbarem Meldeschein.",
    },
    housekeeping: {
      title: "Housekeeping",
      description:
        "Reinigungsstatus wird gemeinsam mit der Rezeption gepflegt: schmutzig, gereinigt und kontrolliert bleiben jederzeit nachvollziehbar.",
    },
    folio: {
      title: "Folio & Rechnungen",
      description:
        "Logis und Extras auf das Folio buchen, Einzel- oder Sammelrechnungen erstellen und offene Posten über die Debitorenliste verfolgen.",
    },
    payments: {
      title: "Zahlungen & Frontkasse",
      description:
        "Zahlungen erfassen, Belege drucken und Kassenbewegungen je Schicht führen — jede Buchung bleibt mit Folio und Rechnung verknüpft.",
    },
    pos: {
      title: "Kassensystem (POS)",
      description:
        "Bon- und Tischabrechnung für Bar und Restaurant; offene Bons lassen sich direkt auf das Gästefolio übertragen.",
    },
    rates: {
      title: "Raten & Preise",
      description:
        "Ratenpläne, Ratenkalender, Verpflegungsaufschläge, Kinderpreisregeln und Altersgruppen — eine Engine versorgt PMS und Buchungsmaschine gleichermaßen.",
    },
    reports: {
      title: "Berichte & Dashboard",
      description:
        "Belegungs- und Umsatzkennzahlen, Umsatzbericht und Folio-Bewegungsbericht als tägliche Auswertung.",
    },
    website: {
      title: "Hotel-Website & Buchungsmaschine",
      description:
        "Jedes Hotel pflegt seine eigene Website und die mehrstufige Buchungsstrecke im System — erreichbar über die eigene Domain oder eine fures.tech-Subdomain. Buchungen landen unmittelbar im PMS.",
    },
    integrations: {
      title: "Integrationen & Automatisierung",
      description:
        "Preis- und Verfügbarkeitsfeed für Google Hotels, Buchungsbestätigungen per E-Mail und Hausbenachrichtigungen — eine fehlende Konfiguration lässt eine Buchung nie scheitern.",
    },
    settings: {
      title: "Stammdaten & Einstellungen",
      description:
        "Rund zweihundert Hoteldefinitionen — Zimmertypen, Verpflegungs- und Ratenarten, Abteilungen, Erlöskonten, Artikel, Agenturen und Kanäle — an einer zentralen Stelle.",
    },
  },
  flowHeading: "So läuft ein Aufenthalt durch das System",
  flowIntro: "Genau diesen Ablauf können Sie im Demo-Zugang vollständig nachspielen.",
  flow: [
    {
      title: "1 · Reservierung",
      description:
        "Die Buchung entsteht mit Verfügbarkeitsprüfung; Markt, Segment und Quelle können als Pflichtangaben hinterlegt werden.",
    },
    {
      title: "2 · Zimmerzuweisung & Check-in",
      description:
        "Zimmer aus dem Zimmerplan zuweisen, Gästekarte vervollständigen und den Meldeschein ausgeben.",
    },
    {
      title: "3 · Aufenthalt",
      description:
        "Leistungen auf das Folio buchen, POS-Bons übernehmen, Housekeeping-Status laufend aktualisieren.",
    },
    {
      title: "4 · Zahlung & Rechnung",
      description:
        "Zahlung erfassen, Beleg erstellen und die Rechnung einzeln oder gesammelt ausstellen.",
    },
    {
      title: "5 · Check-out & Auswertung",
      description:
        "Nach der Abreise wechselt das Zimmer in die Reinigung; Umsatz- und Folioberichte arbeiten sofort mit den aktuellen Zahlen.",
    },
  ],
  techHeading: "Technische Architektur",
  techIntro:
    "MeinHotel basiert nicht auf einem Template: Datenmodell, Sicherheitsregeln und Oberfläche wurden für diesen Betrieb entworfen.",
  tech: [
    {
      title: "Anwendung",
      items: ["Next.js 15 App Router", "React 19", "TypeScript (strict)", "Tailwind CSS", "Server Actions"],
    },
    {
      title: "Daten & Sicherheit",
      items: [
        "Supabase Postgres",
        "Row Level Security (RLS)",
        "Zusammengesetzte Schlüssel je Hotel",
        "Versionierte SQL-Migrationen",
      ],
    },
    {
      title: "Qualität",
      items: ["Unit-Tests für reine Module", "Typecheck · Lint · Test · Build", "Schreibpfade bleiben schemarobust"],
    },
    {
      title: "Betrieb",
      items: ["Netlify", "Multi-Domain-Routing", "Transaktionale E-Mails", "Google-Hotels-ARI-Feed"],
    },
  ],
  audienceHeading: "Für wen ist MeinHotel gedacht?",
  audiences: [
    {
      title: "Für Hotels",
      body:
        "Für privat geführte Häuser und kleine Gruppen, die provisionsfreie Direktbuchungen und einen schlanken Rezeptionsablauf wollen.",
      bullets: [
        "Website und Buchungsmaschine nutzen dieselben Daten wie das PMS",
        "Kurze Einschulung dank deutscher, englischer und türkischer Oberfläche",
        "Preise, Kontingente und Stammdaten an einer Stelle",
        "Mandantentrennung wird in der Datenbank erzwungen",
      ],
    },
    {
      title: "Für Arbeitgeber & technische Teams",
      body:
        "Das Projekt zeigt, wie Fures Tech Produkte baut: ein echter Branchenbedarf, ein System im produktiven Einsatz.",
      bullets: [
        "Mandantenfähige Architektur mit Row Level Security",
        "Breites Domänenmodell über Front Office, Abrechnung und Pricing",
        "Dokumentierte Produktentscheidungen, durch Tests abgesicherte Geschäftsregeln",
        "Mit dem Demo-Zugang prüfen Sie das laufende Produkt statt einer Präsentation",
      ],
    },
  ],
  statusHeading: "Aktueller Stand",
  statusLiveLabel: "Live im Einsatz",
  statusNextLabel: "Auf der Roadmap",
  statusLive: [
    "Rezeption, Reservierungen und Zimmerplan",
    "Gästekartei, Meldeschein und Housekeeping",
    "Folio, Rechnungen, Zahlungen und Frontkasse",
    "Ratenpläne, Ratenkalender und Kinderpreise",
    "Hotel-Website, Buchungsmaschine und Bestätigungsmails",
    "Preis- und Verfügbarkeitsfeed für Google Hotels",
  ],
  statusNext: [
    "Channel-Manager-Anbindung",
    "Online-Zahlung und Anzahlung im Buchungsprozess",
    "Meldewesen und Nachtlauf (Night Audit)",
    "Mobile Housekeeping-App",
  ],
  statusNote:
    "Ehrlich gesagt: Das System ist produktiv im Einsatz und wird weiter ausgebaut. Channel Manager, Online-Zahlung und Registrierkassen-Anbindung stehen auf der Roadmap.",
  finalHeading: "Möchten Sie MeinHotel in Ihrem Haus testen?",
  finalBody:
    "Einrichtung, Datenübernahme und Schulung begleiten wir von Anfang bis Ende. Sehen Sie sich zuerst die Demo an — danach planen wir gemeinsam den Ablauf für Ihr Hotel.",
};

const en: MeinHotelContent = {
  seo: {
    title: "MeinHotel PMS | Hotel Management Software & Booking Engine | Fures Tech",
    description:
      "MeinHotel is the multi-tenant hotel management system built by Fures Tech: front office, reservations, room rack, folio, invoicing, housekeeping, rate management and a built-in booking engine. Try the live demo account now.",
    keywords:
      "hotel management software, hotel pms, property management system, booking engine, hotel front office software, multi tenant pms, direct bookings",
  },
  badge: "A Fures Tech product",
  title: "MeinHotel PMS",
  tagline:
    "The whole hotel operation in one workspace — from reservation to folio, from housekeeping to invoice.",
  intro:
    "MeinHotel is the multi-tenant property management system Fures Tech builds in-house. It grew out of real front-desk work: create a reservation, assign a room, check the guest in, post charges to the folio and issue the invoice — all in the same workspace, without switching tools. Every hotel sees only its own data, and that isolation is enforced by Postgres row level security in the database rather than by application code.",
  ctaDemo: "Open the live demo",
  ctaLogin: "Go to PMS login",
  ctaContact: "Request a quote",
  backToProjects: "All projects",
  highlights: [
    { value: "14 modules", label: "From the front desk to reporting" },
    { value: "3 languages", label: "English, German and Turkish UI" },
    { value: "RLS", label: "Tenant isolation enforced in the database" },
    { value: "Web + Booking", label: "Hotel website and booking engine included" },
  ],
  demo: {
    heading: "Try the real system with the demo account",
    body:
      "The link opens the actual application, not a recorded tour. The demo user is authorised for one fictional sample hotel only and can never reach real customer data. On the demo page you only need to enter the password.",
    addressLabel: "Demo address",
    userLabel: "User",
    passwordLabel: "Password",
    hotelLabel: "Sample hotel",
    note:
      "The sample hotel is shared with every visitor: your changes may be visible to others and the demo data is reset from time to time. Please do not enter real guest information.",
    loginHint: "Already have your own hotel account? Sign in directly:",
  },
  modulesHeading: "Modules",
  modulesIntro:
    "Every module works on the same data model, so anything posted in one screen is immediately visible in the others.",
  modules: {
    reception: {
      title: "Front office",
      description:
        "The full day on a single timeline: arrivals, departures, in-house guests, a quick reservation form and one-click check-in and check-out.",
    },
    reservations: {
      title: "Reservations",
      description:
        "Availability checks, room assignment, status workflow, group bookings and name lists. Required guest fields, duplicate-stay warnings and cancellation reasons are driven by your own definitions.",
    },
    roomrack: {
      title: "Room rack",
      description:
        "Occupancy and cleaning status for every room in one grid, with room moves and status changes handled in place.",
    },
    calendar: {
      title: "Calendar",
      description:
        "Occupancy by date, free-room search, availability per room type and forward planning.",
    },
    guests: {
      title: "Guest profiles & CRM",
      description:
        "Guest registry with fast search, duplicate warnings, additional occupants per room and a printable registration card.",
    },
    housekeeping: {
      title: "Housekeeping",
      description:
        "Room cleaning status is maintained together with the front desk; dirty, clean and inspected rooms stay traceable at all times.",
    },
    folio: {
      title: "Folio & invoicing",
      description:
        "Post accommodation and extras to the folio, create single or bulk invoices and follow open balances in the credit-control view.",
    },
    payments: {
      title: "Payments & front cash",
      description:
        "Record payments, print receipts and keep cash movements per shift — every entry stays linked to its folio and invoice.",
    },
    pos: {
      title: "Point of sale",
      description:
        "Checks for bar and restaurant, transferable straight onto the guest folio.",
    },
    rates: {
      title: "Rates & pricing",
      description:
        "Rate plans, rate calendar, board supplements, child pricing rules and age bands — one engine feeds both the PMS and the booking engine.",
    },
    reports: {
      title: "Reports & dashboard",
      description:
        "Occupancy and revenue indicators, a revenue report and a folio-operations report for the daily numbers.",
    },
    website: {
      title: "Hotel website & booking engine",
      description:
        "Each hotel manages its own website and multi-step booking flow inside the system, served from its own domain or a fures.tech subdomain. Bookings land directly in the PMS.",
    },
    integrations: {
      title: "Integrations & automation",
      description:
        "Rate and availability feed for Google Hotels, booking confirmation e-mails and property notifications — a missing configuration never breaks a booking.",
    },
    settings: {
      title: "Definitions & settings",
      description:
        "Close to two hundred hotel definitions — room types, board and rate types, departments, revenue codes, products, agencies and channels — in one settings hub.",
    },
  },
  flowHeading: "How a stay moves through the system",
  flowIntro: "You can replay exactly this flow inside the demo account.",
  flow: [
    {
      title: "1 · Reservation",
      description:
        "The booking is created with an availability check; market, segment and source can be enforced as required fields.",
    },
    {
      title: "2 · Room assignment & check-in",
      description:
        "Assign a room from the room plan, complete the guest card and print the registration card.",
    },
    {
      title: "3 · Stay",
      description:
        "Post charges to the folio, transfer POS checks and keep housekeeping status up to date.",
    },
    {
      title: "4 · Payment & invoice",
      description:
        "Record the payment, issue the receipt and create the invoice individually or in bulk.",
    },
    {
      title: "5 · Check-out & reporting",
      description:
        "After departure the room moves to cleaning, and revenue and folio reports run on current data.",
    },
  ],
  techHeading: "Technical architecture",
  techIntro:
    "MeinHotel is not assembled from a template: the data model, the security rules and the interface were designed for this operation.",
  tech: [
    {
      title: "Application",
      items: ["Next.js 15 App Router", "React 19", "TypeScript (strict)", "Tailwind CSS", "Server Actions"],
    },
    {
      title: "Data & security",
      items: [
        "Supabase Postgres",
        "Row level security (RLS)",
        "Per-hotel composite keys",
        "Versioned SQL migrations",
      ],
    },
    {
      title: "Quality",
      items: ["Unit tests for pure modules", "Typecheck · lint · test · build", "Schema-resilient write paths"],
    },
    {
      title: "Operations",
      items: ["Netlify", "Multi-domain routing", "Transactional e-mail", "Google Hotels ARI feed"],
    },
  ],
  audienceHeading: "Who is it for?",
  audiences: [
    {
      title: "For hotels",
      body:
        "For independent properties and small groups that want commission-free direct bookings and a leaner front-desk routine.",
      bullets: [
        "Website and booking engine share the PMS data",
        "Short onboarding thanks to English, German and Turkish interfaces",
        "Rates, allotments and definitions maintained in one place",
        "Tenant isolation enforced at database level",
      ],
    },
    {
      title: "For employers & technical teams",
      body:
        "The project shows how Fures Tech builds products: a real industry need turned into a system that runs in production.",
      bullets: [
        "Multi-tenant architecture with row level security",
        "Broad domain model across front office, billing and pricing",
        "Documented product decisions and business rules protected by tests",
        "The demo account shows the running product, not a slide deck",
      ],
    },
  ],
  statusHeading: "Current product status",
  statusLiveLabel: "Live",
  statusNextLabel: "On the roadmap",
  statusLive: [
    "Front office, reservations and room rack",
    "Guest profiles, registration cards and housekeeping",
    "Folio, invoices, payments and front cash",
    "Rate plans, rate calendar and child pricing",
    "Hotel website, booking engine and confirmation e-mails",
    "Rate and availability feed for Google Hotels",
  ],
  statusNext: [
    "Channel manager integration",
    "Online payment and deposits during booking",
    "Police reporting and night audit",
    "Mobile housekeeping app",
  ],
  statusNote:
    "To keep the demo honest: the system runs in production and is still being extended. Channel manager, online payment and fiscalisation are on the roadmap.",
  finalHeading: "Want to try MeinHotel in your property?",
  finalBody:
    "We cover setup, data migration and staff training end to end. Start with the demo, then let's plan the rollout for your hotel together.",
};

const ru: MeinHotelContent = {
  seo: {
    title: "MeinHotel PMS | Система управления отелем и модуль бронирования | Fures Tech",
    description:
      "MeinHotel — мультиарендная система управления отелем от Fures Tech: ресепшен, бронирования, шахматка, фолио, счета, хозяйственная служба, тарифы и собственный модуль бронирования. Попробуйте живое демо прямо сейчас.",
    keywords:
      "система управления отелем, pms для отеля, программа для гостиницы, модуль бронирования, прямые бронирования, софт для отеля",
  },
  badge: "Продукт Fures Tech",
  title: "MeinHotel PMS",
  tagline:
    "Вся работа отеля в одном рабочем пространстве: от брони до фолио, от уборки до счёта.",
  intro:
    "MeinHotel — мультиарендная система управления отелем, которую Fures Tech разрабатывает самостоятельно. Она выросла из реальной работы на ресепшене: создать бронь, назначить номер, заселить гостя, провести начисления по фолио и выставить счёт — всё в одном окне, без переключения систем. Каждый отель видит только свои данные, и эта изоляция обеспечивается не кодом приложения, а политиками row level security в базе Postgres.",
  ctaDemo: "Открыть живое демо",
  ctaLogin: "Вход в PMS",
  ctaContact: "Запросить предложение",
  backToProjects: "Все проекты",
  highlights: [
    { value: "14 модулей", label: "От стойки регистрации до отчётности" },
    { value: "3 языка", label: "Интерфейс на немецком, английском и турецком" },
    { value: "RLS", label: "Изоляция данных на уровне базы" },
    { value: "Web + Booking", label: "Сайт отеля и модуль бронирования включены" },
  ],
  demo: {
    heading: "Попробуйте реальную систему через демо-доступ",
    body:
      "Ссылка ведёт не в видеопрезентацию, а в само приложение. Демо-пользователь имеет права только в вымышленном отеле-образце и не может получить доступ к реальным данным клиентов. На странице демо достаточно ввести пароль.",
    addressLabel: "Адрес демо",
    userLabel: "Пользователь",
    passwordLabel: "Пароль",
    hotelLabel: "Отель-образец",
    note:
      "Демо-отель общий для всех посетителей: ваши изменения могут увидеть другие, а данные периодически сбрасываются. Пожалуйста, не вводите реальные данные гостей.",
    loginHint: "Уже есть собственный доступ отеля? Войдите напрямую:",
  },
  modulesHeading: "Модули системы",
  modulesIntro:
    "Все модули работают на одной модели данных: операция в одном экране сразу видна в остальных.",
  modules: {
    reception: {
      title: "Ресепшен",
      description:
        "Весь день на одной шкале: заезды, выезды, проживающие, быстрая форма брони и заселение/выселение в один клик.",
    },
    reservations: {
      title: "Бронирования",
      description:
        "Проверка доступности, назначение номера, статусы, групповые брони и списки имён. Обязательные поля гостя, предупреждения о дублях и причины отмены настраиваются в справочниках.",
    },
    roomrack: {
      title: "Шахматка номеров",
      description:
        "Загрузка и статус уборки всех номеров в одной сетке; смена номера и статуса выполняется здесь же.",
    },
    calendar: {
      title: "Календарь",
      description:
        "Загрузка по датам, поиск свободных номеров, доступность по типам и планирование вперёд.",
    },
    guests: {
      title: "Карточка гостя и CRM",
      description:
        "Реестр гостей с быстрым поиском, предупреждением о дублях, дополнительными проживающими и печатной регистрационной картой.",
    },
    housekeeping: {
      title: "Хозяйственная служба",
      description:
        "Статусы уборки ведутся вместе с ресепшеном: грязные, убранные и проверенные номера всегда различимы.",
    },
    folio: {
      title: "Фолио и счета",
      description:
        "Начисления за проживание и дополнительные услуги, одиночные и массовые счета, контроль дебиторской задолженности в одном списке.",
    },
    payments: {
      title: "Платежи и касса",
      description:
        "Приём оплат, печать квитанций и кассовые движения по сменам — каждая запись связана с фолио и счётом.",
    },
    pos: {
      title: "POS (точка продаж)",
      description:
        "Счета бара и ресторана, которые переносятся прямо на фолио гостя.",
    },
    rates: {
      title: "Тарифы и цены",
      description:
        "Тарифные планы, календарь цен, надбавки за питание, правила детских цен и возрастные группы — один механизм обслуживает PMS и модуль бронирования.",
    },
    reports: {
      title: "Отчёты и дашборд",
      description:
        "Показатели загрузки и дохода, отчёт по выручке и отчёт по операциям фолио.",
    },
    website: {
      title: "Сайт отеля и модуль бронирования",
      description:
        "Каждый отель ведёт свой сайт и многошаговый модуль бронирования внутри системы — на собственном домене или поддомене fures.tech. Брони сразу попадают в PMS.",
    },
    integrations: {
      title: "Интеграции и автоматизация",
      description:
        "Фид цен и доступности для Google Hotels, письма-подтверждения и уведомления отелю — отсутствие настройки никогда не ломает бронирование.",
    },
    settings: {
      title: "Справочники и настройки",
      description:
        "Около двухсот настроек отеля — типы номеров, типы питания и тарифов, отделы, коды дохода, товары, агентства и каналы — в едином центре настроек.",
    },
  },
  flowHeading: "Как проживание проходит через систему",
  flowIntro: "Тот же сценарий можно полностью повторить в демо-доступе.",
  flow: [
    {
      title: "1 · Бронирование",
      description:
        "Бронь создаётся с проверкой доступности; рынок, сегмент и источник можно сделать обязательными.",
    },
    {
      title: "2 · Назначение номера и заселение",
      description:
        "Номер назначается из шахматки, карточка гостя дополняется, печатается регистрационная карта.",
    },
    {
      title: "3 · Проживание",
      description:
        "Начисления по фолио, перенос счетов POS, актуальные статусы уборки.",
    },
    {
      title: "4 · Оплата и счёт",
      description:
        "Приём оплаты, квитанция и выставление счёта по отдельности или массово.",
    },
    {
      title: "5 · Выезд и отчёты",
      description:
        "После выезда номер уходит в уборку, а отчёты по выручке и фолио работают с актуальными данными.",
    },
  ],
  techHeading: "Техническая архитектура",
  techIntro:
    "MeinHotel не собран из шаблона: модель данных, правила безопасности и интерфейс спроектированы под эту операционную задачу.",
  tech: [
    {
      title: "Приложение",
      items: ["Next.js 15 App Router", "React 19", "TypeScript (strict)", "Tailwind CSS", "Server Actions"],
    },
    {
      title: "Данные и безопасность",
      items: [
        "Supabase Postgres",
        "Row level security (RLS)",
        "Составные ключи по отелю",
        "Версионируемые SQL-миграции",
      ],
    },
    {
      title: "Качество",
      items: ["Юнит-тесты чистых модулей", "typecheck · lint · test · build", "Устойчивые к схеме операции записи"],
    },
    {
      title: "Инфраструктура",
      items: ["Netlify", "Маршрутизация нескольких доменов", "Транзакционные письма", "Фид Google Hotels ARI"],
    },
  ],
  audienceHeading: "Кому это нужно",
  audiences: [
    {
      title: "Отелям",
      body:
        "Независимым отелям и небольшим сетям, которым нужны прямые бронирования без комиссий и более простая работа стойки.",
      bullets: [
        "Сайт и модуль бронирования используют те же данные, что и PMS",
        "Быстрое обучение благодаря интерфейсу на трёх языках",
        "Тарифы, квоты и справочники в одном месте",
        "Изоляция данных обеспечивается на уровне базы",
      ],
    },
    {
      title: "Работодателям и техническим командам",
      body:
        "Проект показывает, как Fures Tech создаёт продукты: реальная отраслевая задача и система, работающая в продакшене.",
      bullets: [
        "Мультиарендная архитектура с row level security",
        "Широкая предметная модель: фронт-офис, расчёты, ценообразование",
        "Задокументированные продуктовые решения и бизнес-правила под тестами",
        "Демо-доступ показывает работающий продукт, а не презентацию",
      ],
    },
  ],
  statusHeading: "Текущий статус продукта",
  statusLiveLabel: "Работает",
  statusNextLabel: "В планах",
  statusLive: [
    "Ресепшен, бронирования и шахматка",
    "Карточка гостя, регистрационная карта и уборка",
    "Фолио, счета, платежи и касса",
    "Тарифные планы, календарь цен и детские цены",
    "Сайт отеля, модуль бронирования и письма-подтверждения",
    "Фид цен и доступности для Google Hotels",
  ],
  statusNext: [
    "Интеграция с channel manager",
    "Онлайн-оплата и депозит при бронировании",
    "Отчётность для органов и ночной аудит",
    "Мобильное приложение для хозяйственной службы",
  ],
  statusNote:
    "Честно о демо: система работает в продакшене и продолжает развиваться. Channel manager, онлайн-оплата и фискализация находятся в планах.",
  finalHeading: "Хотите попробовать MeinHotel в своём отеле?",
  finalBody:
    "Мы сопровождаем внедрение целиком: настройку, перенос данных и обучение команды. Сначала посмотрите демо, затем спланируем запуск для вашего отеля.",
};

export const MEINHOTEL_CONTENT: Record<Language, MeinHotelContent> = { tr, en, ru, de };

export const MEINHOTEL_FALLBACK_LANGUAGE: Language = "en";

export function getMeinHotelContent(language: Language): MeinHotelContent {
  return MEINHOTEL_CONTENT[language] ?? MEINHOTEL_CONTENT[MEINHOTEL_FALLBACK_LANGUAGE];
}
