import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useLanguage } from "../contexts/LanguageContext";
import { getPath } from "../utils/routes";
import { DollarSign, Zap } from "lucide-react";
import { Section, SectionHeading } from "./ui/section";

export function Pricing() {
  const { t, language } = useLanguage();

  const highlights = [
    { title: "Modüler", description: "İhtiyaca göre birleştirilebilir" },
    { title: "Şeffaf", description: "Sabit kapsam + sprint" },
    { title: "Hızlı", description: "48 saat içinde teklif" },
  ];

  return (
    <Section>
      <div className="mx-auto max-w-5xl">
        <div className="liquid-icon mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full">
          <DollarSign className="h-7 w-7 text-white" />
        </div>

        <SectionHeading
          title={t('pricing.title')}
          description={t('pricing.description')}
          className="mb-10"
        />

        <p className="mb-12 text-center text-lg font-medium text-orange-400">{t('pricing.subtitle')}</p>

        <div className="mx-auto mb-12 grid max-w-4xl grid-cols-1 gap-5 md:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.title} className="fures-card rounded-[2rem] p-7 text-center">
              <div className="mb-2 flex items-center justify-center gap-2">
                <Zap className="h-4 w-4 text-orange-400" />
                <h3 className="text-base font-semibold text-white">{item.title}</h3>
              </div>
              <p className="text-sm text-white/55">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4">
          <Button asChild size="lg" variant="gradient" className="text-sm">
            <Link to={getPath(language, "contact")}>{t('pricing.cta')} →</Link>
          </Button>
          <p className="text-sm text-white/50">{t('pricing.cta_desc')}</p>
        </div>
      </div>
    </Section>
  );
}
