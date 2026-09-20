import { Button } from "./ui/button";
import { NetlifyContactForm } from "./NetlifyContactForm";
import { Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { CardIcon, Section, SectionHeading } from "./ui/section";

export function CTA() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const contactItems = [
    {
      icon: Mail,
      title: t('contact.email'),
      content: "info@fures.at",
      href: "mailto:info@fures.at",
    },
    {
      icon: Phone,
      title: t('contact.phone'),
      content: "+43 664 99735268",
      href: "tel:+4366499735268",
    },
    {
      icon: MapPin,
      title: t('contact.headquarters'),
      content: t('contact.headquarters_location'),
      href: null,
    },
    {
      icon: MapPin,
      title: t('contact.second_location'),
      content: t('contact.second_location_place'),
      href: null,
    },
  ];

  return (
    <div ref={ref}>
      <Section>
        {/* Intro film */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="fures-card mx-auto max-w-5xl overflow-hidden rounded-[2.5rem]">
            <iframe
              src="https://player.vimeo.com/video/1054771811?autoplay=1&loop=1&autopause=0&muted=1&playsinline=1&background=1&controls=0"
              className="aspect-video w-full"
              frameBorder="0"
              allow="autoplay; fullscreen"
              title="Contact Fures Tech"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <SectionHeading
            eyebrow={t('contact.title')}
            title={t('contact.subtitle')}
            description={t('contact.description')}
          />

          <div className="mb-10 flex justify-center">
            <Button asChild size="lg" variant="outline" className="text-sm">
              <a href="https://calendly.com/fures" target="_blank" rel="noopener noreferrer">
                {t('contact.schedule_meeting')}
              </a>
            </Button>
          </div>

          <NetlifyContactForm />
        </motion.div>

        {/* Contact details */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {contactItems.map((item, index) => {
            const Component = item.href ? 'a' : 'div';
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.25 + index * 0.07 }}
              >
                <Component
                  {...(item.href && { href: item.href })}
                  className="fures-card group block h-full rounded-[2rem] p-7 hover:-translate-y-0.5"
                >
                  <CardIcon>
                    <item.icon className="h-5 w-5 text-white" />
                  </CardIcon>
                  <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-white/40">
                    {item.title}
                  </p>
                  <p className="text-sm font-medium text-white transition-colors group-hover:text-orange-400">
                    {item.content}
                  </p>
                </Component>
              </motion.div>
            );
          })}
        </div>
      </Section>
    </div>
  );
}
