import React, { useState, useEffect, useMemo, useRef } from 'react';
import { translations, experienceOrder } from './data/translations';
import Header from './components/Sidebar';
import KPIs from './components/KPIs';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Education from './components/Education';
import Certificates from './components/Certificates';
import Projects from './components/Projects';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import { CertificateModal } from './components/modals/CertificateModal';
import { AccessibilityModal } from './components/modals/AccessibilityModal';

type Theme = 'light' | 'dark' | 'system';

const Hero = ({ t }: { t: any }) => (
  <section id="hero" className="min-h-[92vh] flex items-center justify-center text-center pt-20 md:pt-24" aria-labelledby="hero-title">
    <div className="max-w-4xl mx-auto px-4 space-y-6">
      <div className="flex justify-center">
        <div className="relative">
          <div
            className="absolute inset-0 rounded-full blur-3xl opacity-30 bg-[var(--highlight-gradient)]"
            aria-hidden="true"
          />
          <img
            src={t.contactInfo.profileImage}
            alt={t.hero.imageAlt || `${t.name} portrait`}
            className="relative h-40 w-40 rounded-full border-2 border-white/30 shadow-2xl object-cover ring-8 ring-white/5"
            loading="eager"
          />
        </div>
      </div>
      <div className="space-y-3">
        <h1 id="hero-title" className="text-5xl md:text-7xl font-bold text-primary-text font-display leading-tight">
          {t.name}
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm md:text-base text-secondary-text">
          <a href={`tel:${t.contactInfo.phone}`} className="glass-card px-3 py-1.5 rounded-full border-none">
            {t.hero.contact.phone}: {t.contactInfo.phoneDisplay || t.contactInfo.phone}
          </a>
          <a href={`mailto:${t.contactInfo.email}`} className="glass-card px-3 py-1.5 rounded-full border-none">
            {t.hero.contact.email}: {t.contactInfo.email}
          </a>
          <div className="glass-card px-3 py-1.5 rounded-full border-none">
            {t.hero.contact.address}: {t.contactInfo.address}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <div className="inline-block glass-card rounded-full px-4 py-1.5 text-sm font-semibold border-none">
          {t.title}
        </div>
        <div className="inline-block glass-card rounded-full px-4 py-1.5 text-sm font-semibold border-none">
          {t.hero.pretitle}
        </div>
      </div>
      <h2 className="text-4xl md:text-6xl font-bold text-primary-text font-display leading-tight">
        {t.hero.title}{' '}
        <span className="text-transparent bg-clip-text bg-[var(--highlight-gradient)]">
          {t.hero.titleGradient}
        </span>
      </h2>
      <p className="text-lg md:text-xl max-w-2xl mx-auto text-secondary-text leading-relaxed">
        {t.hero.subtitle}
      </p>
    </div>
  </section>
);

const App = () => {
  const [language, setLanguage] = useState('tr');
  const [theme, setTheme] = useState<Theme>('dark');
  const [selectedCert, setSelectedCert] = useState<any>(null);
  const [isAccessibilityModalOpen, setIsAccessibilityModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isPrinting, setIsPrinting] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const userLang = navigator.language.split('-')[0];
    if (translations[userLang as keyof typeof translations]) {
      setLanguage(userLang);
    }
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    setTheme(savedTheme || 'dark');
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    const isDark =
      theme === 'dark' ||
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    root.classList.remove(isDark ? 'light' : 'dark');
    root.classList.add(isDark ? 'dark' : 'light');

    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -60% 0px', threshold: 0 }
    );

    const sections = contentRef.current?.querySelectorAll('section');
    sections?.forEach((section) => observer.observe(section));

    return () => sections?.forEach((section) => observer.unobserve(section));
  }, [contentRef]);

  useEffect(() => {
    const handleBeforePrint = () => setIsPrinting(true);
    const handleAfterPrint = () => setIsPrinting(false);

    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);

    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
    };
  }, []);

  const t = translations[language as keyof typeof translations] || translations.tr;

  const seoDescription = useMemo(() => t.hero.subtitle.replace(/\s+/g, ' ').slice(0, 155), [t.hero.subtitle]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = `${t.name} | ${t.title}`;

    const description = document.querySelector<HTMLMetaElement>('meta[name=\"description\"]');
    if (description) description.content = seoDescription;

    const ogTitle = document.querySelector<HTMLMetaElement>('meta[property=\"og:title\"]');
    if (ogTitle) ogTitle.content = `${t.name} | ${t.title}`;

    const ogDescription = document.querySelector<HTMLMetaElement>('meta[property=\"og:description\"]');
    if (ogDescription) ogDescription.content = seoDescription;
  }, [language, seoDescription, t.name, t.title]);

  return (
    <div className="min-h-screen">
      <Header
        t={t}
        language={language}
        setLanguage={setLanguage}
        activeSection={activeSection}
        theme={theme}
        setTheme={setTheme}
      />
          
      <div ref={contentRef} className="container mx-auto px-4 lg:px-8 max-w-screen-lg">
          <main id="main-content" className="space-y-24 md:space-y-32 pt-24 pb-16">
            <Hero t={t} />
            <KPIs t={t} />
            <Experience t={t} experienceOrder={experienceOrder} />
            <Skills t={t} />
            <Projects t={t} />
            <Education t={t} />
            <Certificates t={t} onCertificateSelect={setSelectedCert} />
            <Footer t={t} onAccessibilityClick={() => setIsAccessibilityModalOpen(true)} />
          </main>
      </div>
      
      <Chatbot t={t} language={language} isPrinting={isPrinting} />

      {selectedCert && <CertificateModal cert={selectedCert} onClose={() => setSelectedCert(null)} lang={t.certificates} />}
      {isAccessibilityModalOpen && <AccessibilityModal onClose={() => setIsAccessibilityModalOpen(false)} lang={t.accessibility} />}
    </div>
  );
};

export default App;