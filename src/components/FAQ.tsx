import { useLanguage } from "../contexts/LanguageContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { HelpCircle } from "lucide-react";
import { Section, SectionHeading } from "./ui/section";

export function FAQ() {
  const { t } = useLanguage();

  const faqs = [
    {
      question: t('faq.q1'),
      answer: t('faq.a1')
    },
    {
      question: t('faq.q2'),
      answer: t('faq.a2')
    },
    {
      question: t('faq.q3'),
      answer: t('faq.a3')
    },
    {
      question: t('faq.q4'),
      answer: t('faq.a4')
    }
  ];

  return (
    <Section>
      <div className="mx-auto max-w-4xl">
        <div className="liquid-icon mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full">
          <HelpCircle className="h-7 w-7 text-white" />
        </div>

        <SectionHeading title={t('faq.title')} />

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="fures-card rounded-[1.5rem] px-6"
            >
              <AccordionTrigger className="py-5 text-left text-base font-semibold text-white transition-colors hover:text-orange-400">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-sm leading-relaxed text-white/60">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}
