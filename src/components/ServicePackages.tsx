import { useLanguage } from "../contexts/LanguageContext";
import { getPath } from "../utils/routes";
import { Rocket, TrendingUp, Bot, Megaphone, Languages } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { CardIcon, Section, SectionHeading } from "./ui/section";

export function ServicePackages() {
  const { t, language } = useLanguage();

  const packages = [
    {
      icon: Rocket,
      name: t('packages.launch_web'),
      subtitle: t('packages.launch_web_subtitle'),
      description: t('packages.launch_web_desc'),
      price: t('packages.launch_web_price')
    },
    {
      icon: TrendingUp,
      name: t('packages.growth_web'),
      subtitle: t('packages.growth_web_subtitle'),
      description: t('packages.growth_web_desc'),
      price: t('packages.growth_web_price'),
      featured: true
    },
    {
      icon: Bot,
      name: t('packages.ai_automation'),
      subtitle: t('packages.ai_automation_subtitle'),
      description: t('packages.ai_automation_desc'),
      price: t('packages.ai_automation_price')
    },
    {
      icon: Megaphone,
      name: t('packages.social_media_pro'),
      subtitle: t('packages.social_media_pro_subtitle'),
      description: t('packages.social_media_pro_desc'),
      price: t('packages.social_media_pro_price')
    },
    {
      icon: Languages,
      name: t('packages.translation'),
      subtitle: t('packages.translation_subtitle'),
      description: t('packages.translation_desc'),
      price: t('packages.translation_price')
    }
  ];

  return (
    <Section>
      <SectionHeading
        title={t('packages.title')}
        description={t('packages.subtitle')}
      />
      <p className="mx-auto -mt-8 mb-14 max-w-3xl text-center text-sm text-white/45">
        {t('packages.note')}
      </p>

      <div className="mb-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg, index) => (
          <article
            key={index}
            className={`fures-card group rounded-[2rem] p-8 hover:-translate-y-0.5 ${
              pkg.featured ? 'ring-1 ring-orange-400/30' : ''
            }`}
          >
            {pkg.featured && (
              <span className="mb-4 inline-flex rounded-full bg-orange-400/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange-400">
                Popüler
              </span>
            )}

            <CardIcon className="group-hover:-rotate-3">
              <pkg.icon className="h-5 w-5 text-white" />
            </CardIcon>

            <h3 className="mb-1.5 text-lg font-semibold text-white" style={{ letterSpacing: '-0.02em' }}>
              {pkg.name}
            </h3>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-orange-400">
              {pkg.subtitle}
            </p>
            <p className="mb-6 text-sm leading-relaxed text-white/55">{pkg.description}</p>

            <div className="border-t border-white/10 pt-5">
              <p className="text-sm text-white/70">{pkg.price}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="text-center">
        <Button asChild size="lg" variant="gradient" className="text-sm">
          <Link to={getPath(language, "contact")}>{t('pricing.cta')} →</Link>
        </Button>
        <p className="mt-4 text-sm text-white/50">{t('pricing.cta_desc')}</p>
      </div>
    </Section>
  );

}
