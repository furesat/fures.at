import { useLanguage } from "../contexts/LanguageContext";
import { Search, MapPin, Share2, Hotel, Cpu, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { CardIcon, Section, SectionHeading } from "./ui/section";

export function Services() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      icon: Search,
      title: t('services.seo'),
      description: t('services.seo_desc'),
    },
    {
      icon: MapPin,
      title: t('services.local_seo'),
      description: t('services.local_seo_desc'),
    },
    {
      icon: Share2,
      title: t('services.social_media'),
      description: t('services.social_media_desc'),
    },
    {
      icon: Hotel,
      title: t('services.hotel_web'),
      description: t('services.hotel_web_desc'),
    },
    {
      icon: Cpu,
      title: t('services.hotel_pms'),
      description: t('services.hotel_pms_desc'),
    },
    {
      icon: Users,
      title: t('services.guest_automation'),
      description: t('services.guest_automation_desc'),
    },
  ];

  return (
    <div ref={ref}>
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionHeading title={t('services.title')} />
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="fures-card rounded-[2rem] p-7 hover:-translate-y-0.5"
            >
              <CardIcon>
                <service.icon className="h-5 w-5 text-white" />
              </CardIcon>
              <h3 className="mb-2.5 text-base font-semibold text-white" style={{ letterSpacing: '-0.02em' }}>
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/55">{service.description}</p>
            </motion.article>
          ))}
        </div>
      </Section>
    </div>
  );
}
