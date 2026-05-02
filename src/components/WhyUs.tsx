import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { Zap, Palette, BarChart3, Building2, CheckCircle2 } from "lucide-react";

export function WhyUs() {
  const { t } = useLanguage();
  const theme = useTheme();
  const isLight = theme === "light";

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
    <section className={`whyus-section py-32 relative overflow-hidden ${isLight ? "bg-[#f6f3f0]" : "bg-black"}`}>
      {/* Background */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 ${isLight ? "bg-gradient-to-b from-[#f8f5f2] via-[#f1eef4]/70 to-[#f3f0ee]" : "bg-gradient-to-b from-black via-gray-900/30 to-black"}`}></div>
        <div className={`absolute top-1/4 left-10 w-96 h-96 rounded-full blur-3xl ${isLight ? "bg-orange-300/20" : "bg-orange-500/10"}`}></div>
        <div className={`absolute bottom-1/4 right-10 w-96 h-96 rounded-full blur-3xl ${isLight ? "bg-violet-300/20" : "bg-purple-600/10"}`}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-sm uppercase tracking-wider text-orange-400 mb-4">
            {t('why_us.subtitle')}
          </h2>
          <h3 className={`text-4xl sm:text-5xl lg:text-6xl mb-6 ${isLight ? "text-[#1f2430]" : ""}`}>
            <span className={isLight ? "bg-gradient-to-r from-[#c96586] to-[#8f5bff] bg-clip-text text-transparent" : "bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"}>
              {t('why_us.title')}
            </span>
          </h3>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group fures-nav-glass rounded-[2rem] p-8 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-gradient-to-br from-orange-500/0 to-purple-600/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:from-orange-500/12 group-hover:to-purple-600/10"></div>

              <div className="relative z-10">
                <div className="liquid-icon mb-6 flex h-14 w-14 items-center justify-center rounded-2xl group-hover:-rotate-3 transition-transform duration-300">
                  <feature.icon className="h-7 w-7 text-white" />
                </div>

                <h4 className={`text-xl mb-3 font-semibold ${isLight ? "text-[#20242d]" : "text-white"}`}>{feature.title}</h4>
                <p className={`leading-relaxed ${isLight ? "text-[#5c6677]" : "text-gray-300/80"}`}>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="mt-20">
          <h3 className="text-3xl sm:text-4xl text-center mb-12">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {t('benefits.title')}
            </span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="fures-nav-glass rounded-[2rem] p-8 transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <h4 className={`text-lg mb-2 ${isLight ? "text-[#20242d]" : "text-white"}`}>{benefit.title}</h4>
                    <p className={isLight ? "text-[#5f6775]" : "text-gray-400"}>{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
