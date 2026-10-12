import type { Language } from "../contexts/LanguageContext";

/**
 * Deutsch da! — Fures Tech's German learning app for Turkish speakers.
 * Content source: furesat/Newdeutsch (AGENTS.md, landing copy, course content).
 * Keep claims aligned with what the product actually ships today; no prices,
 * no exam-provider endorsement (mock tests are original, independent material).
 */

export const DEUTSCHDA_APP = {
  url: "https://www.deutschda.org",
  /** Real app screenshots captured with the demo profile "Lena" (served by the app itself). */
  screenBase: "https://www.deutschda.org/images/landing/screens",
} as const;

/** Content languages of this case study (the site's RU visitors get the English page). */
export type DeutschDaLanguage = "tr" | "en" | "de";

export const DEUTSCHDA_PATHS: Record<DeutschDaLanguage, string> = {
  tr: "/tr/projeler/deutsch-da",
  en: "/en/projects/deutsch-da",
  de: "/de/referenzen/deutsch-da",
};

/** Per site language, where the project card links (RU → English page). */
export const DEUTSCHDA_LINKS: Record<Language, string> = {
  ...DEUTSCHDA_PATHS,
  ru: DEUTSCHDA_PATHS.en,
};

export type ScreenId = "home" | "lesson" | "speak" | "exam";
export const SCREEN_ORDER: readonly ScreenId[] = ["home", "lesson", "speak", "exam"];

export const screenUrl = (id: ScreenId, lang: DeutschDaLanguage) =>
  `${DEUTSCHDA_APP.screenBase}/${id}-${lang}.webp`;

export type FeatureId =
  | "course"
  | "speaking"
  | "review"
  | "articles"
  | "mistakes"
  | "exam"
  | "listen"
  | "music";

export const FEATURE_ORDER: readonly FeatureId[] = [
  "course",
  "speaking",
  "review",
  "articles",
  "mistakes",
  "exam",
  "listen",
  "music",
];

type TitledText = { title: string; description: string };

export interface DeutschDaContent {
  seo: { title: string; description: string; keywords: string };
  badge: string;
  title: string;
  tagline: string;
  intro: string;
  ctaOpen: string;
  ctaContact: string;
  backToProjects: string;
  addressLabel: string;
  highlights: { value: string; label: string }[];
  screensHeading: string;
  screensIntro: string;
  screens: Record<ScreenId, { caption: string; alt: string }>;
  featuresHeading: string;
  featuresIntro: string;
  features: Record<FeatureId, TitledText>;
  levelsHeading: string;
  levelsIntro: string;
  levels: { level: string; title: string; description: string }[];
  techHeading: string;
  techIntro: string;
  tech: { title: string; items: string[] }[];
  audienceHeading: string;
  audiences: { title: string; body: string; bullets: string[] }[];
  principlesHeading: string;
  principles: TitledText[];
  statusHeading: string;
  statusLiveLabel: string;
  statusNextLabel: string;
  statusLive: string[];
  statusNext: string[];
  statusNote: string;
  finalHeading: string;
  finalBody: string;
}

const tr: DeutschDaContent = {
  seo: {
    title: "Deutsch da! | Türkçe konuşanlar için Almanca öğrenme uygulaması | Fures Tech",
    description:
      "Deutsch da!, Fures Tech'in geliştirdiği Almanca öğrenme uygulaması: A1'den C1'e Türkçe anlatımlı dersler, yapay zekâ destekli konuşma laboratuvarı, aralıklı tekrar, Artikel antrenörü, hata defteri ve özgün Goethe formatında deneme sınavları. www.deutschda.org",
    keywords:
      "almanca öğren, almanca öğrenme uygulaması, a1 almanca, b1 almanca, goethe deneme sınavı, avusturya almancası, almanca konuşma pratiği, deutsch da",
  },
  badge: "Fures Tech · Eğitim",
  title: "Deutsch da!",
  tagline: "Almanca'yı kendi dilinde öğren, Almanca konuşarak yaşa.",
  intro:
    "Deutsch da!, Almanya, Avusturya ve İsviçre'de yaşayan ya da oraya gitmeye hazırlanan Türkçe konuşanlar için geliştirdiğimiz bir Almanca öğrenme uygulamasıdır. Dersler Türkçe anlatılır; amaç ise gerçek hayatta Almanca konuşabilmek: resmî dairede, işte, doktorda, komşuyla. Uygulama A1'den C1'e uzanan bir müfredatı, mikrofonla çalışan bir konuşma laboratuvarını ve günlük tekrar sistemini tek yerde toplar. Tarayıcıda çalışır, telefona uygulama olarak eklenebilir ve arayüzü Türkçe, Almanca ve İngilizce kullanılabilir.",
  ctaOpen: "Uygulamayı aç",
  ctaContact: "Benzer bir proje için iletişime geçin",
  backToProjects: "Tüm projeler",
  addressLabel: "Adres",
  highlights: [
    { value: "A1 → C1", label: "4 seviye, adım adım müfredat" },
    { value: "140+", label: "ders: kelime, dil bilgisi, diyalog, okuma, alıştırma" },
    { value: "2.000+", label: "kelime; artikel, çoğul ve telaffuzla" },
    { value: "9", label: "özgün A1 ve A2 deneme sınavı" },
  ],
  screensHeading: "Uygulamadan bir bakış",
  screensIntro: "Gerçek ekran görüntüleri (örnek profil “Lena” ile).",
  screens: {
    home: { caption: "Bugün: günlük hedef halkaları ve sıradaki ders", alt: "Deutsch da! ana ekranı: günlük hedef halkaları ve sıradaki ders" },
    lesson: { caption: "Ders: adım adım kelime, dil bilgisi ve alıştırma", alt: "Deutsch da! ders ekranı" },
    speak: { caption: "Sprechen: mikrofonla konuşma laboratuvarı", alt: "Deutsch da! konuşma laboratuvarı ekranı" },
    exam: { caption: "Sınav: süreli ya da serbest deneme sınavları", alt: "Deutsch da! deneme sınavı ekranı" },
  },
  featuresHeading: "Neler yapabilirsiniz?",
  featuresIntro: "Her araç aynı öğrenme profilini kullanır; bir yerde öğrendiğiniz kelime tekrar ve pratikte karşınıza çıkar.",
  features: {
    course: {
      title: "Türkçe anlatımlı müfredat",
      description:
        "Her ders kelime, dil bilgisi, diyalog, okuma metni, alıştırma ve konuşma görevinden oluşur. Avusturya'ya özgü kullanımlar ve günlük hayat notları ayrıca işaretlenir.",
    },
    speaking: {
      title: "Konuşma laboratuvarı (Sprechen)",
      description:
        "5, 15 veya 30 dakikalık planlı oturumlar: refleks cevaplar, gürültülü ortamda dinleme, anlat-tekrarla turları, gölge okuma ve farklı aksanlarla kulak eğitimi. İstenirse yapay zekâ kayda göre geri bildirim verir.",
    },
    review: {
      title: "Aralıklı tekrar",
      description:
        "Derslerde öğrendiğiniz kelimeler kartlara dönüşür ve unutmaya başlayacağınız anda yeniden sorulur.",
    },
    articles: {
      title: "Artikel antrenörü",
      description: "der, die, das refleksi için kısa turlar; doğru bildikçe kelimeler daha seyrek gelir.",
    },
    mistakes: {
      title: "Hata defteri",
      description: "Yanlış cevaplanan sorular kaydedilir ve aralıklarla tekrar sorulur; iki kez üst üste doğru bilinince defterden çıkar.",
    },
    exam: {
      title: "Deneme sınavları",
      description:
        "Goethe A1 ve A2 formatında, tamamen özgün içerikli deneme sınavları: Hören, Lesen, Schreiben ve Sprechen bölümleri, süreli ve serbest mod.",
    },
    listen: {
      title: "Yolda Almanca",
      description: "Modül kelimeleri ve diyaloglarından oluşan, eller serbest dinlenebilen çalma listesi; kilit ekranından kontrol edilir.",
    },
    music: {
      title: "Şarkılarla Almanca",
      description: "Senkronize sözler, Türkçe çeviriler ve şarkılardan çıkan kelimelerle müzik üzerinden öğrenme.",
    },
  },
  levelsHeading: "Seviyeler",
  levelsIntro: "Başlangıçta seviyenizi ve hedefinizi seçersiniz; uygulama size uygun yerden başlar.",
  levels: [
    { level: "A1", title: "Sıfırdan başlangıç", description: "Temeller ve 14 modül: tanışma, alışveriş, yol tarifi, doktor, aile. Goethe A1 formatında 6 özgün deneme sınavı." },
    { level: "A2", title: "Günlük hayatta rahatlık", description: "13 modül: geçmişi anlatmak, iş, resmî daireler, şikâyet, davetler. A2 formatında 3 özgün deneme sınavı." },
    { level: "B1", title: "Bağımsız kullanım", description: "Geliştirme sürüyor: 13 modülün 10'u hazır (iş başvurusu, kira, sağlık, medya, resmî mektuplar ve haklar)." },
    { level: "C1", title: "İleri seviye", description: "14 modül: dolaylı anlatım ve kaynak gösterme, Nominalstil ve edilgen yapılar, medya ve yapay zekâ, toplum ve etik." },
  ],
  techHeading: "Teknik mimari",
  techIntro: "Hızlı açılan, telefonda uygulama gibi çalışan ve verileri önce cihazda tutan bir yapı.",
  tech: [
    { title: "Uygulama", items: ["React + TypeScript", "Vite, kurulabilir PWA", "Tailwind CSS", "Türkçe, Almanca, İngilizce arayüz"] },
    { title: "Veri", items: ["IndexedDB ile cihazda öncelikli kayıt", "Supabase hesap girişi (e-posta, Google)", "Satır seviyesi güvenlikle (RLS) bulut yedeği", "Misafir modu"] },
    { title: "Ses ve yapay zekâ", items: ["Azure Speech ile doğal Almanca sesler", "Avusturya, Almanya ve İsviçre aksanları", "Google Gemini ile konuşma geri bildirimi", "Sesli canlı rol yapma"] },
    { title: "Kalite ve dağıtım", items: ["Vercel sunucusuz fonksiyonlar", "Vitest ile 500+ otomatik test", "Tarayıcıda mobil ve masaüstü kontrolleri", "iPhone için Capacitor kabuğu"] },
  ],
  audienceHeading: "Kimin için?",
  audiences: [
    {
      title: "Göç ve yeni başlangıç",
      body: "Almanca konuşulan bir ülkeye taşınmaya hazırlananlar ya da yeni gelmiş olanlar için.",
      bullets: ["Resmî daire, doktor ve kira gibi gerçek durumlar", "Dil sınavına hazırlık pratiği", "Avusturya'ya özgü kelimeler ve notlar"],
    },
    {
      title: "Çalışanlar",
      body: "İşte Almanca konuşması gerekenler için; özellikle otelcilik ve turizm.",
      bullets: ["Konuşma laboratuvarında kısa günlük oturumlar", "Misafirle ve meslektaşla rol yapma", "Gürültülü ortamda dinleme alıştırması"],
    },
  ],
  principlesHeading: "Tasarım ilkeleri",
  principles: [
    { title: "Önce gizlilik", description: "İlerleme önce cihazda tutulur. Ses kayıtları cihazdan çıkmaz; yapay zekâ geri bildirimi yalnızca kullanıcı isterse gönderilir." },
    { title: "Bağımsız içerik", description: "Deneme sınavları sınav formatını izleyen özgün içeriklerdir; Goethe-Institut veya başka bir sınav kurumuyla bağlantılı değildir." },
    { title: "Gerçek hayat odaklı", description: "Ezber listeleri yerine diyaloglar, görevler ve konuşma; yerel kullanım ve resmî bilgiler için resmî kaynaklara yönlendirme." },
  ],
  statusHeading: "Ürünün durumu",
  statusLiveLabel: "Yayında",
  statusNextLabel: "Sırada",
  statusLive: [
    "A1, A2 ve C1 müfredatı",
    "B1: 13 modülün 10'u",
    "Konuşma laboratuvarı ve yapay zekâ geri bildirimi",
    "Goethe formatında 9 özgün deneme sınavı",
    "Hesap girişi ve misafir modu",
  ],
  statusNext: [
    "B1 modül 11–13",
    "C1 bölümlerinin etkileşimli yeniden yazımı",
    "Hesaba bağlı bulut kaydının devreye alınması",
    "iPhone uygulamasının yaygın dağıtımı",
  ],
  statusNote: "Uygulama aktif olarak geliştiriliyor; içerik ve özellikler düzenli olarak genişliyor.",
  finalHeading: "Kendi öğrenme ürününüzü mü planlıyorsunuz?",
  finalBody:
    "Deutsch da! ile çok dilli içerik, ses teknolojisi ve yapay zekâyı bir araya getiren bir eğitim ürününü uçtan uca geliştirdik. Benzer bir fikriniz varsa konuşalım.",
};

const de: DeutschDaContent = {
  seo: {
    title: "Deutsch da! | Deutsch lernen für Türkischsprachige | Fures Tech",
    description:
      "Deutsch da! ist die Deutsch-Lern-App von Fures Tech: Kurse von A1 bis C1 mit türkischen Erklärungen, KI-gestütztes Sprechlabor, Wiederholung mit Karteikarten, Artikel-Trainer, Fehlerheft und eigene Übungsprüfungen im Goethe-Format. www.deutschda.org",
    keywords:
      "deutsch lernen türkisch, deutsch app, a1 deutsch, b1 deutsch, goethe übungsprüfung, österreichisches deutsch, sprechtraining deutsch, deutsch da",
  },
  badge: "Fures Tech · Bildung",
  title: "Deutsch da!",
  tagline: "Deutsch in der eigenen Sprache lernen – und auf Deutsch leben.",
  intro:
    "Deutsch da! ist eine Deutsch-Lern-App für Türkischsprachige, die in Österreich, Deutschland oder der Schweiz leben oder ihren Umzug vorbereiten. Die Erklärungen sind auf Türkisch, das Ziel ist echtes Sprechen im Alltag: am Amt, bei der Arbeit, beim Arzt, mit den Nachbarn. Die App bündelt einen Lehrplan von A1 bis C1, ein Sprechlabor mit Mikrofon und eine tägliche Wiederholung an einem Ort. Sie läuft im Browser, lässt sich am Handy wie eine App installieren und hat eine Oberfläche auf Türkisch, Deutsch und Englisch.",
  ctaOpen: "App öffnen",
  ctaContact: "Ähnliches Projekt anfragen",
  backToProjects: "Alle Referenzen",
  addressLabel: "Adresse",
  highlights: [
    { value: "A1 → C1", label: "4 Niveaus, Schritt für Schritt" },
    { value: "140+", label: "Lektionen: Wortschatz, Grammatik, Dialog, Lesen, Übung" },
    { value: "2.000+", label: "Wörter mit Artikel, Plural und Aussprache" },
    { value: "9", label: "eigene Übungsprüfungen für A1 und A2" },
  ],
  screensHeading: "Die App auf einen Blick",
  screensIntro: "Echte Screenshots (mit dem Beispielprofil „Lena“).",
  screens: {
    home: { caption: "Heute: Tagesziel-Ringe und nächste Lektion", alt: "Startbildschirm von Deutsch da! mit Tageszielen und nächster Lektion" },
    lesson: { caption: "Lektion: Wortschatz, Grammatik und Übung Schritt für Schritt", alt: "Lektionsansicht von Deutsch da!" },
    speak: { caption: "Sprechen: Sprechlabor mit Mikrofon", alt: "Sprechlabor von Deutsch da!" },
    exam: { caption: "Prüfung: Übungsprüfungen mit oder ohne Zeitlimit", alt: "Übungsprüfung in Deutsch da!" },
  },
  featuresHeading: "Was die App kann",
  featuresIntro: "Alle Werkzeuge nutzen dasselbe Lernprofil: Ein Wort aus der Lektion taucht später in Wiederholung und Übung wieder auf.",
  features: {
    course: {
      title: "Lehrplan mit türkischen Erklärungen",
      description:
        "Jede Lektion besteht aus Wortschatz, Grammatik, Dialog, Lesetext, Übungen und einer Sprechaufgabe. Österreichische Varianten und Alltagshinweise sind eigens markiert.",
    },
    speaking: {
      title: "Sprechlabor (Sprechen)",
      description:
        "Geplante Einheiten mit 5, 15 oder 30 Minuten: Reflex-Antworten, Hören im Lärm, Erklären-und-Wiederholen, Shadowing und Hörtraining mit verschiedenen Akzenten. Auf Wunsch gibt eine KI Feedback zur Aufnahme.",
    },
    review: {
      title: "Wiederholung mit System",
      description: "Wörter aus den Lektionen werden zu Karteikarten und kommen genau dann wieder, wenn man sie zu vergessen beginnt.",
    },
    articles: {
      title: "Artikel-Trainer",
      description: "Kurze Runden für den der-die-das-Reflex; sichere Wörter kommen seltener.",
    },
    mistakes: {
      title: "Fehlerheft",
      description: "Falsch beantwortete Aufgaben werden gespeichert und in Abständen erneut gestellt; nach zwei richtigen Antworten in Folge sind sie erledigt.",
    },
    exam: {
      title: "Übungsprüfungen",
      description:
        "Eigene Übungsprüfungen im Format Goethe A1 und A2 mit Hören, Lesen, Schreiben und Sprechen – mit Zeitlimit oder frei.",
    },
    listen: {
      title: "Deutsch unterwegs",
      description: "Freihändige Playlist aus Wortschatz und Dialogen eines Moduls, steuerbar über den Sperrbildschirm.",
    },
    music: {
      title: "Deutsch mit Musik",
      description: "Synchronisierte Liedtexte, türkische Übersetzungen und Wörter aus den Songs.",
    },
  },
  levelsHeading: "Niveaus",
  levelsIntro: "Zu Beginn wählt man Niveau und Ziel; die App startet an der passenden Stelle.",
  levels: [
    { level: "A1", title: "Einstieg ohne Vorwissen", description: "Grundlagen und 14 Module: Kennenlernen, Einkaufen, Wege, Arzt, Familie. 6 eigene Übungsprüfungen im Goethe-A1-Format." },
    { level: "A2", title: "Sicher im Alltag", description: "13 Module: von früher erzählen, Arbeit, Behörden, Reklamation, Einladungen. 3 eigene Übungsprüfungen im A2-Format." },
    { level: "B1", title: "Selbstständige Sprachverwendung", description: "In Arbeit: 10 von 13 Modulen fertig (Bewerbung, Wohnen, Gesundheit, Medien, formelle Briefe und Rechte)." },
    { level: "C1", title: "Fortgeschritten", description: "14 Module: indirekte Rede und Quellenangaben, Nominalstil und Passiv, Medien und KI, Gesellschaft und Ethik." },
  ],
  techHeading: "Technische Architektur",
  techIntro: "Schnell, am Handy wie eine App nutzbar und mit Daten zuerst auf dem Gerät.",
  tech: [
    { title: "App", items: ["React + TypeScript", "Vite, installierbare PWA", "Tailwind CSS", "Oberfläche auf Türkisch, Deutsch, Englisch"] },
    { title: "Daten", items: ["Lokale Speicherung mit IndexedDB", "Supabase-Login (E-Mail, Google)", "Cloud-Sicherung mit Row Level Security", "Gastmodus"] },
    { title: "Sprache & KI", items: ["Natürliche deutsche Stimmen mit Azure Speech", "Akzente aus Österreich, Deutschland und der Schweiz", "Sprech-Feedback mit Google Gemini", "Live-Rollenspiel per Sprache"] },
    { title: "Qualität & Betrieb", items: ["Serverless-Funktionen auf Vercel", "500+ automatisierte Tests mit Vitest", "Browser-Checks mobil und Desktop", "Capacitor-App-Hülle für das iPhone"] },
  ],
  audienceHeading: "Für wen?",
  audiences: [
    {
      title: "Neustart im deutschsprachigen Raum",
      body: "Für alle, die einen Umzug vorbereiten oder gerade angekommen sind.",
      bullets: ["Echte Situationen: Amt, Arzt, Wohnung", "Übung für Sprachprüfungen", "Österreichische Wörter und Hinweise"],
    },
    {
      title: "Berufstätige",
      body: "Für alle, die im Job Deutsch sprechen müssen – besonders in Hotellerie und Tourismus.",
      bullets: ["Kurze tägliche Einheiten im Sprechlabor", "Rollenspiele mit Gästen und Kolleg:innen", "Hörtraining in lauter Umgebung"],
    },
  ],
  principlesHeading: "Gestaltungsprinzipien",
  principles: [
    { title: "Datenschutz zuerst", description: "Der Lernstand liegt zuerst auf dem Gerät. Sprachaufnahmen verlassen das Gerät nicht; KI-Feedback wird nur auf Wunsch gesendet." },
    { title: "Unabhängige Inhalte", description: "Die Übungsprüfungen sind eigene Inhalte im Prüfungsformat und stehen in keiner Verbindung zum Goethe-Institut oder anderen Prüfungsanbietern." },
    { title: "Nah am Alltag", description: "Dialoge, Aufgaben und Sprechen statt Vokabellisten; bei Regeln und Fristen Verweis auf offizielle Stellen." },
  ],
  statusHeading: "Produktstand",
  statusLiveLabel: "Live",
  statusNextLabel: "Als Nächstes",
  statusLive: [
    "Lehrplan A1, A2 und C1",
    "B1: 10 von 13 Modulen",
    "Sprechlabor mit KI-Feedback",
    "9 eigene Übungsprüfungen im Goethe-Format",
    "Konto-Login und Gastmodus",
  ],
  statusNext: [
    "B1-Module 11–13",
    "Interaktive Überarbeitung der C1-Kapitel",
    "Aktivierung der kontobasierten Cloud-Speicherung",
    "Breitere Verteilung der iPhone-App",
  ],
  statusNote: "Die App wird aktiv weiterentwickelt; Inhalte und Funktionen wachsen laufend.",
  finalHeading: "Sie planen ein eigenes Lernprodukt?",
  finalBody:
    "Mit Deutsch da! haben wir ein Bildungsprodukt mit mehrsprachigen Inhalten, Sprachtechnologie und KI von Anfang bis Ende umgesetzt. Erzählen Sie uns von Ihrer Idee.",
};

const en: DeutschDaContent = {
  seo: {
    title: "Deutsch da! | German learning app for Turkish speakers | Fures Tech",
    description:
      "Deutsch da! is Fures Tech's German learning app: A1 to C1 courses explained in Turkish, an AI-assisted speaking lab, spaced repetition, an article trainer, a mistake notebook and original practice tests in the Goethe format. www.deutschda.org",
    keywords:
      "learn german, german learning app, german for turkish speakers, a1 german, b1 german, goethe practice test, austrian german, german speaking practice, deutsch da",
  },
  badge: "Fures Tech · Education",
  title: "Deutsch da!",
  tagline: "Learn German in your own language — and live in German.",
  intro:
    "Deutsch da! is a German learning app for Turkish speakers who live in, or are preparing to move to, Austria, Germany or Switzerland. Explanations are in Turkish; the goal is speaking German in real life: at public offices, at work, at the doctor's, with neighbours. The app brings an A1-to-C1 curriculum, a microphone-based speaking lab and daily review together in one place. It runs in the browser, can be installed on a phone like an app, and its interface is available in Turkish, German and English.",
  ctaOpen: "Open the app",
  ctaContact: "Discuss a similar project",
  backToProjects: "All projects",
  addressLabel: "Address",
  highlights: [
    { value: "A1 → C1", label: "4 levels, step by step" },
    { value: "140+", label: "lessons: vocabulary, grammar, dialogue, reading, practice" },
    { value: "2,000+", label: "words with article, plural and pronunciation" },
    { value: "9", label: "original A1 and A2 practice tests" },
  ],
  screensHeading: "The app at a glance",
  screensIntro: "Real screenshots (with the sample profile “Lena”).",
  screens: {
    home: { caption: "Today: daily goal rings and the next lesson", alt: "Deutsch da! home screen with daily goal rings and the next lesson" },
    lesson: { caption: "Lesson: vocabulary, grammar and practice step by step", alt: "Deutsch da! lesson screen" },
    speak: { caption: "Sprechen: the speaking lab with microphone", alt: "Deutsch da! speaking lab screen" },
    exam: { caption: "Exam: timed or untimed practice tests", alt: "Deutsch da! practice test screen" },
  },
  featuresHeading: "What you can do",
  featuresIntro: "Every tool shares one learning profile: a word from a lesson comes back in review and practice.",
  features: {
    course: {
      title: "Curriculum explained in Turkish",
      description:
        "Each lesson combines vocabulary, grammar, a dialogue, a reading text, exercises and a speaking task. Austrian usage and everyday notes are marked separately.",
    },
    speaking: {
      title: "Speaking lab (Sprechen)",
      description:
        "Planned 5, 15 or 30-minute sessions: reflex answers, listening in noise, explain-and-repeat rounds, shadowing and ear training with different accents. On request, AI gives feedback on the recording.",
    },
    review: {
      title: "Spaced repetition",
      description: "Words from lessons become flashcards and come back right when you start to forget them.",
    },
    articles: {
      title: "Article trainer",
      description: "Short rounds for the der/die/das reflex; words you know well appear less often.",
    },
    mistakes: {
      title: "Mistake notebook",
      description: "Wrong answers are saved and asked again at intervals; two correct answers in a row clear them.",
    },
    exam: {
      title: "Practice tests",
      description:
        "Original practice tests in the Goethe A1 and A2 format with listening, reading, writing and speaking — timed or untimed.",
    },
    listen: {
      title: "German on the go",
      description: "A hands-free playlist of a module's words and dialogues, controllable from the lock screen.",
    },
    music: {
      title: "German with music",
      description: "Synced lyrics, Turkish translations and vocabulary taken from the songs.",
    },
  },
  levelsHeading: "Levels",
  levelsIntro: "Learners pick their level and goal at the start; the app begins at the right place.",
  levels: [
    { level: "A1", title: "Starting from zero", description: "Foundations and 14 modules: introductions, shopping, directions, the doctor, family. 6 original practice tests in the Goethe A1 format." },
    { level: "A2", title: "Confident in everyday life", description: "13 modules: talking about the past, work, public offices, complaints, invitations. 3 original practice tests in the A2 format." },
    { level: "B1", title: "Independent use", description: "In progress: 10 of 13 modules ready (job applications, housing, health, media, formal letters and rights)." },
    { level: "C1", title: "Advanced", description: "14 modules: reported speech and citing sources, nominal style and the passive, media and AI, society and ethics." },
  ],
  techHeading: "Technical architecture",
  techIntro: "Fast, app-like on a phone, and local-first with data.",
  tech: [
    { title: "App", items: ["React + TypeScript", "Vite, installable PWA", "Tailwind CSS", "Interface in Turkish, German, English"] },
    { title: "Data", items: ["Local-first storage with IndexedDB", "Supabase sign-in (email, Google)", "Cloud backup with row-level security", "Guest mode"] },
    { title: "Speech & AI", items: ["Natural German voices with Azure Speech", "Austrian, German and Swiss accents", "Speaking feedback with Google Gemini", "Live voice role-play"] },
    { title: "Quality & delivery", items: ["Serverless functions on Vercel", "500+ automated tests with Vitest", "Browser checks on mobile and desktop", "Capacitor app shell for iPhone"] },
  ],
  audienceHeading: "Who is it for?",
  audiences: [
    {
      title: "Moving and new beginnings",
      body: "For people preparing to move to a German-speaking country or who have just arrived.",
      bullets: ["Real situations: offices, doctors, renting", "Practice for language exams", "Austrian words and notes"],
    },
    {
      title: "Working people",
      body: "For people who need German at work — especially in hospitality and tourism.",
      bullets: ["Short daily sessions in the speaking lab", "Role-play with guests and colleagues", "Listening practice in noisy places"],
    },
  ],
  principlesHeading: "Design principles",
  principles: [
    { title: "Privacy first", description: "Progress is kept on the device first. Voice recordings never leave the device; AI feedback is sent only when the learner asks." },
    { title: "Independent content", description: "The practice tests are original material in the exam format and are not affiliated with the Goethe-Institut or any other exam provider." },
    { title: "Built for real life", description: "Dialogues, tasks and speaking instead of word lists; official sources are referenced for rules and deadlines." },
  ],
  statusHeading: "Product status",
  statusLiveLabel: "Live",
  statusNextLabel: "Next",
  statusLive: [
    "A1, A2 and C1 curriculum",
    "B1: 10 of 13 modules",
    "Speaking lab with AI feedback",
    "9 original practice tests in the Goethe format",
    "Account sign-in and guest mode",
  ],
  statusNext: [
    "B1 modules 11–13",
    "Interactive rewrite of the C1 chapters",
    "Switching on account-based cloud storage",
    "Wider distribution of the iPhone app",
  ],
  statusNote: "The app is in active development; content and features keep growing.",
  finalHeading: "Planning your own learning product?",
  finalBody:
    "With Deutsch da! we built an education product end to end, combining multilingual content, speech technology and AI. Tell us about your idea.",
};

export const DEUTSCHDA_CONTENT: Record<DeutschDaLanguage, DeutschDaContent> = { tr, en, de };

/** The site's RU visitors read the English case study. */
export function deutschDaLanguage(language: Language): DeutschDaLanguage {
  return language === "ru" ? "en" : language;
}

export function getDeutschDaContent(language: Language): DeutschDaContent {
  return DEUTSCHDA_CONTENT[deutschDaLanguage(language)];
}
