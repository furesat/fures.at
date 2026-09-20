import { ArrowRight } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { Section, SectionHeading } from "./ui/section";

export function Team() {
  const { t } = useLanguage();
  
  const team = [
    {
      name: t('team.gulben.name'),
      role: t('team.gulben.role'),
      description: t('team.gulben.description'),
      portfolio: "/gulbeneser",
      image: "/images/team-gulben.svg"
    },
    {
      name: t('team.furkan.name'),
      role: t('team.furkan.role'),
      description: t('team.furkan.description'),
      portfolio: "/furkanyonat",
      image: "/images/team-furkan.svg"
    }
  ];

  return (
    <Section>
      <SectionHeading title={t('team.title')} />

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 lg:grid-cols-2">
        {team.map((member, index) => (
          <article
            key={index}
            className="fures-card group rounded-[2rem] p-8 hover:-translate-y-0.5 lg:p-10"
          >
            <div className="mb-6 h-32 w-32 overflow-hidden rounded-2xl border border-white/10 lg:h-36 lg:w-36">
              <img
                src={member.image}
                alt={member.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <h3 className="mb-1.5 text-2xl font-semibold text-white" style={{ letterSpacing: '-0.02em' }}>
              {member.name}
            </h3>
            <p className="mb-4 text-sm font-medium uppercase tracking-wider text-orange-400">
              {member.role}
            </p>
            <p className="mb-6 text-sm leading-relaxed text-white/55">{member.description}</p>

            <a
              href={member.portfolio}
              className="inline-flex items-center gap-2 text-sm font-medium text-white/70 underline-offset-4 transition-colors hover:text-orange-400 hover:underline"
            >
              CV &amp; Portfolio
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </article>
        ))}
      </div>
    </Section>
  );
}
