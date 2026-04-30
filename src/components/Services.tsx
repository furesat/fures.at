import { useLanguage } from "../contexts/LanguageContext";
import { Search, MapPin, Share2, Hotel, Cpu, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

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

  // Both themes now use the dark glass design
  return (
    <section ref={ref} className="py-32 relative overflow-hidden bg-black">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/30 to-black" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl animate-glow-pulse"
          style={{ background: 'radial-gradient(circle, rgba(255,122,41,0.18) 0%, rgba(143,91,255,0.08) 60%, transparent 100%)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl mb-6" style={{ letterSpacing: '-0.03em' }}>
            <span className="gradient-flow bg-clip-text text-transparent font-bold">
              {t('services.title')}
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="group fures-nav-glass rounded-[2.5rem] p-7 transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ backgroundImage: 'linear-gradient(135deg, rgba(255,122,41,0.07), rgba(143,91,255,0.05))' }} />

              <div className="relative z-10">
                <motion.div
                  whileHover={{ rotate: 4, scale: 1.05 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="liquid-icon mb-5 flex h-11 w-11 items-center justify-center rounded-2xl"
                >
                  <service.icon className="h-5 w-5 text-white/90" />
                </motion.div>
                <h3 className="text-base text-white mb-2.5 font-semibold" style={{ letterSpacing: '-0.02em' }}>
                  {service.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
