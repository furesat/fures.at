import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Header } from "./components/Header";
import { HeaderDE } from "./components/HeaderDE";
import { Footer } from "./components/Footer";
import { FooterDE } from "./components/FooterDE";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ServicesPage } from "./pages/ServicesPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { TeamPage } from "./pages/TeamPage";
import { FAQPage } from "./pages/FAQPage";
import { ContactPage } from "./pages/ContactPage";
import { ProfileViewer, PROFILE_CONFIG } from "./pages/ProfileViewer";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { CookiePolicyPage } from "./pages/CookiePolicyPage";
import { KvkkDisclosurePage } from "./pages/KvkkDisclosurePage";
import { BlogListPage } from "./pages/BlogListPage";
import { BlogPostPage } from "./pages/BlogPostPage";
import { CampaignListPage } from "./pages/CampaignListPage";
import { CampaignPostPage } from "./pages/CampaignPostPage";
import { HomePageDE } from "./pages/de/HomePageDE";
import { ServicesPageDE } from "./pages/de/ServicesPageDE";
import { ContactPageDE } from "./pages/de/ContactPageDE";
import AssistantWidget from "./furesai/components/AssistantWidget";
import ChatWindow from "./furesai/components/ChatWindow";
import { detectLanguageByCountry } from "./utils/routes";
import type { Language } from "./contexts/LanguageContext";

// Detects visitor country via IP geolocation (cached 24 h) and redirects accordingly.
// Falls back to browser language if the API is unavailable.
function RootRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    detectLanguageByCountry().then((lang: Language) => {
      if (!cancelled) {
        const roots: Record<Language, string> = {
          tr: '/tr',
          en: '/en',
          ru: '/ru',
          de: '/de',
        };
        navigate(roots[lang], { replace: true });
      }
    });

    return () => { cancelled = true; };
  }, [navigate]);

  return null;
}

// TR site layout – dark neon theme
function TRLayout() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <ThemeProvider theme="dark">
      <LanguageProvider initialLanguage="tr">
        <div className="min-h-screen bg-black text-white overflow-x-hidden">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/hakkimizda/*" element={<AboutPage />} />
              <Route path="/hizmetler/*" element={<ServicesPage />} />
              <Route path="/projeler/*" element={<ProjectsPage />} />
              <Route path="/ekip/*" element={<TeamPage />} />
              <Route path="/sss/*" element={<FAQPage />} />
              <Route path="/iletisim/*" element={<ContactPage />} />
              <Route path="/gizlilik-politikasi" element={<PrivacyPolicyPage />} />
              <Route path="/cerez-politikasi" element={<CookiePolicyPage />} />
              <Route path="/kvkk-aydinlatma-metni" element={<KvkkDisclosurePage />} />
              <Route path="/blog" element={<BlogListPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/kampanyalar" element={<CampaignListPage />} />
              <Route path="/kampanyalar/:slug" element={<CampaignPostPage />} />
              <Route path="*" element={<Navigate to="/tr" replace />} />
            </Routes>
          </main>
          <Footer />
          <AssistantWidget isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
          {isChatOpen && <ChatWindow closeChat={() => setIsChatOpen(false)} />}
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

// EN site layout
function ENLayout() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <ThemeProvider theme="dark">
      <LanguageProvider initialLanguage="en">
        <div className="min-h-screen bg-black text-white overflow-x-hidden">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about/*" element={<AboutPage />} />
              <Route path="/services/*" element={<ServicesPage />} />
              <Route path="/projects/*" element={<ProjectsPage />} />
              <Route path="/team/*" element={<TeamPage />} />
              <Route path="/faq/*" element={<FAQPage />} />
              <Route path="/contact/*" element={<ContactPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/cookie-policy" element={<CookiePolicyPage />} />
              <Route path="/gdpr-disclosure" element={<KvkkDisclosurePage />} />
              <Route path="/blog" element={<BlogListPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/campaigns" element={<CampaignListPage />} />
              <Route path="/campaigns/:slug" element={<CampaignPostPage />} />
              <Route path="*" element={<Navigate to="/en" replace />} />
            </Routes>
          </main>
          <Footer />
          <AssistantWidget isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
          {isChatOpen && <ChatWindow closeChat={() => setIsChatOpen(false)} />}
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

// RU site layout
function RULayout() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <ThemeProvider theme="dark">
      <LanguageProvider initialLanguage="ru">
        <div className="min-h-screen bg-black text-white overflow-x-hidden">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about/*" element={<AboutPage />} />
              <Route path="/services/*" element={<ServicesPage />} />
              <Route path="/projects/*" element={<ProjectsPage />} />
              <Route path="/team/*" element={<TeamPage />} />
              <Route path="/faq/*" element={<FAQPage />} />
              <Route path="/contact/*" element={<ContactPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/cookie-policy" element={<CookiePolicyPage />} />
              <Route path="/gdpr-disclosure" element={<KvkkDisclosurePage />} />
              <Route path="/blog" element={<BlogListPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/campaigns" element={<CampaignListPage />} />
              <Route path="/campaigns/:slug" element={<CampaignPostPage />} />
              <Route path="*" element={<Navigate to="/ru" replace />} />
            </Routes>
          </main>
          <Footer />
          <AssistantWidget isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
          {isChatOpen && <ChatWindow closeChat={() => setIsChatOpen(false)} />}
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

// DE site layout – DACH hotel-focused
function DELayout() {
  return (
    <ThemeProvider theme="dark">
      <LanguageProvider initialLanguage="de">
        <div className="min-h-screen bg-black text-white overflow-x-hidden">
          <HeaderDE />
          <main>
            <Routes>
              <Route path="/" element={<HomePageDE />} />
              <Route path="/ueber-uns/*" element={<AboutPage />} />
              <Route path="/leistungen/*" element={<ServicesPageDE />} />
              <Route path="/referenzen/*" element={<ProjectsPage />} />
              <Route path="/team/*" element={<TeamPage />} />
              <Route path="/faq/*" element={<FAQPage />} />
              <Route path="/kontakt/*" element={<ContactPageDE />} />
              <Route path="/datenschutz" element={<PrivacyPolicyPage />} />
              <Route path="/cookies" element={<CookiePolicyPage />} />
              <Route path="/datenschutzhinweis" element={<KvkkDisclosurePage />} />
              <Route path="/blog" element={<BlogListPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="*" element={<Navigate to="/de" replace />} />
            </Routes>
          </main>
          <FooterDE />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Root: auto-redirect by IP country (falls back to browser language) */}
        <Route path="/" element={<RootRedirect />} />
        <Route path="/preview_page.html" element={<RootRedirect />} />

        {/* Legacy un-prefixed paths → redirect to /tr */}
        <Route path="/hakkimizda/*" element={<Navigate to="/tr/hakkimizda" replace />} />
        <Route path="/hizmetler/*" element={<Navigate to="/tr/hizmetler" replace />} />
        <Route path="/projeler/*" element={<Navigate to="/tr/projeler" replace />} />
        <Route path="/ekip/*" element={<Navigate to="/tr/ekip" replace />} />
        <Route path="/sss/*" element={<Navigate to="/tr/sss" replace />} />
        <Route path="/iletisim/*" element={<Navigate to="/tr/iletisim" replace />} />
        <Route path="/blog" element={<Navigate to="/tr/blog" replace />} />
        <Route path="/blog/:slug" element={<Navigate to="/tr/blog" replace />} />
        <Route path="/kampanyalar" element={<Navigate to="/tr/kampanyalar" replace />} />
        <Route path="/kampanyalar/:slug" element={<Navigate to="/tr/kampanyalar" replace />} />

        {/* Profile pages (keep at root for backwards-compat) */}
        <Route path="/furkanyonat/*" element={
          <LanguageProvider initialLanguage="tr">
            <ProfileViewer profile={PROFILE_CONFIG.furkanyonat} />
          </LanguageProvider>
        } />
        <Route path="/gulbeneser/*" element={
          <LanguageProvider initialLanguage="tr">
            <ProfileViewer profile={PROFILE_CONFIG.gulbeneser} />
          </LanguageProvider>
        } />
        <Route path="/kariyer/*" element={
          <LanguageProvider initialLanguage="tr">
            <ProfileViewer profile={PROFILE_CONFIG.kariyer} />
          </LanguageProvider>
        } />

        {/* Language-prefixed locales */}
        <Route path="/tr/*" element={<TRLayout />} />
        <Route path="/en/*" element={<ENLayout />} />
        <Route path="/ru/*" element={<RULayout />} />
        <Route path="/de/*" element={<DELayout />} />

        {/* Catch-all */}
        <Route path="*" element={<RootRedirect />} />
      </Routes>
    </Router>
  );
}
