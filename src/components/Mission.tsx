import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useLanguage } from "../contexts/LanguageContext";
import { getPath } from "../utils/routes";
import { Target } from "lucide-react";
import { Section, SectionHeading } from "./ui/section";

export function Mission() {
  const { t, language } = useLanguage();

  return (
    <Section className="mission-section">
      <div className="mx-auto max-w-4xl text-center">
        <div className="liquid-icon mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full">
          <Target className="h-7 w-7 text-white" />
        </div>

        <SectionHeading title={t('mission.title')} className="mb-8" />

        <p className="mb-5 text-xl leading-relaxed text-white/75 sm:text-2xl">
          {t('mission.description')}
        </p>
        <p className="mb-12 text-base text-white/55">{t('mission.priority')}</p>

        <Button asChild size="lg" variant="gradient" className="text-sm">
          <Link to={getPath(language, "contact")}>{t('mission.cta')} →</Link>
        </Button>
      </div>
    </Section>
  );
}
