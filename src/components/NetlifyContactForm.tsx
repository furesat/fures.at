import { FormEvent, useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "./ui/button";

const FORM_NAME = "fures-contact";

const encodeFormData = (formData: FormData) => {
  const params = new URLSearchParams();

  formData.forEach((value, key) => {
    params.append(key, value.toString());
  });

  return params.toString();
};

export function NetlifyContactForm() {
  const { language, t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("form-name", FORM_NAME);
    formData.set("language", language);
    formData.set("recipient", "furkanyonat@gmail.com");

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeFormData(formData),
      });

      if (!response.ok) {
        throw new Error(`Netlify form submission failed: ${response.status}`);
      }

      form.reset();
      setIsSubmitted(true);
    } catch (submissionError) {
      console.error(submissionError);
      setError(t("form.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="liquid-glass mx-auto max-w-3xl rounded-[2rem] border border-emerald-300/25 p-8 text-center"
        role="status"
        aria-live="polite"
      >
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-300/30 bg-emerald-400/15">
          <CheckCircle2 className="h-7 w-7 text-emerald-300" />
        </div>
        <h3 className="mb-3 text-2xl font-bold text-white">{t("form.success_title")}</h3>
        <p className="mx-auto max-w-xl text-white/70">{t("form.success")}</p>
      </motion.div>
    );
  }

  return (
    <form
      name={FORM_NAME}
      method="POST"
      action="/"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="liquid-glass mx-auto max-w-3xl rounded-[2rem] border border-white/15 p-6 text-left sm:p-8"
    >
      <input type="hidden" name="form-name" value={FORM_NAME} />
      <input type="hidden" name="recipient" value="furkanyonat@gmail.com" />
      <input type="hidden" name="language" value={language} />
      <p className="hidden">
        <label>
          Don’t fill this out if you’re human: <input name="bot-field" />
        </label>
      </p>

      <div className="mb-6 text-center">
        <h3 className="text-2xl font-bold text-white">{t("form.title")}</h3>
        <p className="mt-2 text-sm text-white/55">{t("form.helper")}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-white/70">{t("form.name")}</span>
          <input
            required
            type="text"
            name="name"
            autoComplete="name"
            className="w-full rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-white outline-none transition-colors placeholder:text-white/30 focus:border-orange-300/60"
            placeholder={t("form.name")}
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-white/70">{t("form.email")}</span>
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            className="w-full rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-white outline-none transition-colors placeholder:text-white/30 focus:border-orange-300/60"
            placeholder="name@example.com"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-white/70">{t("form.company")}</span>
          <input
            type="text"
            name="company"
            autoComplete="organization"
            className="w-full rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-white outline-none transition-colors placeholder:text-white/30 focus:border-orange-300/60"
            placeholder={t("form.company")}
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-white/70">{t("form.date")}</span>
          <input
            type="text"
            name="start-date"
            className="w-full rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-white outline-none transition-colors placeholder:text-white/30 focus:border-orange-300/60"
            placeholder={t("form.date_placeholder")}
          />
        </label>
      </div>

      <label className="mt-4 block">
        <span className="mb-2 block text-sm font-medium text-white/70">{t("form.needs")}</span>
        <textarea
          required
          name="message"
          rows={5}
          className="w-full resize-none rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-white outline-none transition-colors placeholder:text-white/30 focus:border-orange-300/60"
          placeholder={t("form.message_placeholder")}
        />
      </label>

      {error && (
        <p className="mt-4 rounded-2xl border border-red-400/25 bg-red-500/10 px-4 py-3 text-sm text-red-200" role="alert">
          {error}
        </p>
      )}

      <div className="mt-6 flex justify-center">
        <Button type="submit" size="lg" variant="gradient" className="group" disabled={isSubmitting}>
          <Send className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:rotate-12" />
          {isSubmitting ? t("form.submitting") : t("form.submit")}
        </Button>
      </div>
    </form>
  );
}
