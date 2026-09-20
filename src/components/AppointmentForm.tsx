import { FormEvent, useEffect, useRef, useState } from "react";
import { CalendarCheck, CheckCircle2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "./ui/button";

/**
 * Randevu talebi — iletişim formundan ayrı bir Netlify formu.
 *
 * Ayrı isim (`fures-appointment`) bilerek: Netlify gönderileri form adına
 * göre grupluyor, yani randevu talepleri iletişim mesajlarıyla aynı kutuya
 * karışmıyor ve panelde kendi bildirimini alabiliyor.
 *
 * Netlify formu derleme anında statik HTML'de görmek zorunda; SPA'da
 * React'in ürettiği işaretleme yeterli değil. Bu yüzden index.html içinde
 * gizli bir eş kopyası var — alan adları ikisinde de aynı kalmalı.
 */
const FORM_NAME = "fures-appointment";
const RECIPIENT = "furkanyonat@gmail.com";

const encodeFormData = (formData: FormData) => {
  const params = new URLSearchParams();
  formData.forEach((value, key) => params.append(key, value.toString()));
  return params.toString();
};

export function AppointmentForm({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { language, t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const firstFieldRef = useRef<HTMLInputElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  // Açılışta odağı forma al, Escape ile kapat, arkadaki sayfayı kilitle.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => firstFieldRef.current?.focus(), 80);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(focusTimer);
    };
  }, [open, onClose]);

  // Kapanınca bir sonraki açılış temiz başlasın.
  useEffect(() => {
    if (open) return;
    const resetTimer = window.setTimeout(() => {
      setIsSubmitted(false);
      setError("");
    }, 300);
    return () => window.clearTimeout(resetTimer);
  }, [open]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("form-name", FORM_NAME);
    formData.set("language", language);
    formData.set("recipient", RECIPIENT);

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

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-[30000] flex items-end justify-center overflow-y-auto overscroll-contain bg-black/60 p-4 backdrop-blur-[2px] sm:items-center"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={t("appointment.title")}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fures-card relative my-auto max-h-[calc(100dvh-2rem)] w-full max-w-2xl overflow-y-auto rounded-[2rem] p-6 text-left sm:p-8"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label={t("appointment.close")}
              className="fures-icon-pill absolute right-4 top-4 flex h-9 w-9 items-center justify-center text-white/70 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            {isSubmitted ? (
              <div className="py-6 text-center" role="status" aria-live="polite">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-300/30 bg-emerald-400/15">
                  <CheckCircle2 className="h-7 w-7 text-emerald-300" />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-white">{t("form.success_title")}</h3>
                <p className="mx-auto max-w-xl text-white/70">{t("appointment.success")}</p>
                <Button type="button" variant="outline" className="mt-7 text-sm" onClick={onClose}>
                  {t("appointment.close")}
                </Button>
              </div>
            ) : (
              <form
                name={FORM_NAME}
                method="POST"
                action="/"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
              >
                <input type="hidden" name="form-name" value={FORM_NAME} />
                <input type="hidden" name="recipient" value={RECIPIENT} />
                <input type="hidden" name="language" value={language} />
                <p className="hidden">
                  <label>
                    Don’t fill this out if you’re human: <input name="bot-field" />
                  </label>
                </p>

                <div className="mb-6 pr-10">
                  <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-400/25 bg-orange-400/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-orange-300">
                    <CalendarCheck className="h-3.5 w-3.5" />
                    {t("appointment.badge")}
                  </span>
                  <h3 className="text-2xl font-bold text-white">{t("appointment.title")}</h3>
                  <p className="mt-2 text-sm text-white/55">{t("appointment.helper")}</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-white/70">{t("form.name")}</span>
                    <input
                      ref={firstFieldRef}
                      required
                      type="text"
                      name="name"
                      autoComplete="name"
                      className="fures-input"
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
                      className="fures-input"
                      placeholder="name@example.com"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-white/70">{t("appointment.phone")}</span>
                    <input
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      className="fures-input"
                      placeholder="+43 ..."
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-white/70">{t("form.company")}</span>
                    <input
                      type="text"
                      name="company"
                      autoComplete="organization"
                      className="fures-input"
                      placeholder={t("form.company")}
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-white/70">{t("appointment.date")}</span>
                    <input
                      required
                      type="date"
                      name="preferred-date"
                      className="fures-input"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-white/70">{t("appointment.time")}</span>
                    <input
                      type="text"
                      name="preferred-time"
                      className="fures-input"
                      placeholder={t("appointment.time_placeholder")}
                    />
                  </label>

                  <label className="block sm:col-span-2">
                    <span className="mb-2 block text-sm font-medium text-white/70">{t("appointment.message")}</span>
                    <textarea
                      name="message"
                      rows={4}
                      className="fures-input resize-y"
                      placeholder={t("appointment.message_placeholder")}
                    />
                  </label>
                </div>

                {error && (
                  <p className="mt-4 text-sm text-red-300" role="alert">
                    {error}
                  </p>
                )}

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-white/40">{t("appointment.privacy")}</p>
                  <Button type="submit" variant="gradient" size="lg" disabled={isSubmitting} className="text-sm">
                    {isSubmitting ? t("form.submitting") : t("appointment.submit")}
                  </Button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
