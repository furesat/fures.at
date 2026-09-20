import { useLanguage } from "../contexts/LanguageContext";
import { Zap, Palette, BarChart3, Building2, CheckCircle2 } from "lucide-react";
import { CardIcon, Section, SectionHeading } from "./ui/section";

export function WhyUs() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Zap,
      title: t('why_us.operational'),
      description: t('why_us.operational_desc')
    },
    {
      icon: Palette,
      title: t('why_us.design_engineering'),
      description: t('why_us.design_engineering_desc')
    },
    {
      icon: BarChart3,
      title: t('why_us.data_driven'),
      description: t('why_us.data_driven_desc')
    },
    {
      icon: Building2,
      title: t('why_us.industry_depth'),
      description: t('why_us.industry_depth_desc')
    }
  ];

  const benefits = [
    {
      title: t('benefits.customer_experience'),
      description: t('benefits.customer_experience_desc')
    },
    {
      title: t('benefits.efficiency'),
      description: t('benefits.efficiency_desc')
    },
    {
      title: t('benefits.better_decisions'),
      description: t('benefits.better_decisions_desc')
    }
  ];

  return (
    <Section className="whyus-section">
      <SectionHeading eyebrow={t('why_us.subtitle')} title={t('why_us.title')} />

      {/* Features */}
      <div className="mb-20 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <article
            key={index}
            className="fures-card group rounded-[2rem] p-7 hover:-translate-y-0.5"
          >
            <CardIcon className="group-hover:-rotate-3">
              <feature.icon className="h-5 w-5 text-white" />
            </CardIcon>
            <h3 className="whyus-card-title mb-2.5 text-base font-semibold text-white" style={{ letterSpacing: '-0.02em' }}>
              {feature.title}
            </h3>
            <p className="whyus-card-description text-sm leading-relaxed text-white/55">
              {feature.description}
            </p>
          </article>
        ))}
      </div>

      {/* Benefits */}
      <SectionHeading title={t('benefits.title')} className="mb-12" />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {benefits.map((benefit, index) => (
          <article key={index} className="fures-card rounded-[2rem] p-7 hover:-translate-y-0.5">
            <div className="flex items-start gap-3.5">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-orange-400" />
              <div>
                <h3 className="whyus-card-title mb-2 text-base font-semibold text-white">
                  {benefit.title}
                </h3>
                <p className="whyus-benefit-description text-sm leading-relaxed text-white/55">
                  {benefit.description}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
