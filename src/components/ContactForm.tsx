import { FormEvent, useMemo, useState } from "react";
import { Send } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { useLanguage } from "../contexts/LanguageContext";

const CONTACT_RECIPIENT = "furkanyonat@gmail.com";
const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_RECIPIENT}`;
const NETLIFY_FORM_NAME = "fures-contact";

type FormStatus = "idle" | "submitting" | "success" | "error";

function encodeFormData(data: Record<string, string>) {
  return new URLSearchParams(data).toString();
}

export function ContactForm() {
  const { t, language } = useLanguage();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const subject = useMemo(
    () => `Fures.at iletişim formu (${language.toUpperCase()})`,
    [language]
  );

  async function submitToNetlify(formData: Record<string, string>) {
    const response = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encodeFormData({ "form-name": NETLIFY_FORM_NAME, ...formData }),
    });

    if (!response.ok) {
      throw new Error("Netlify form submission failed");
    }
  }

  async function submitToFormSubmit(formData: Record<string, string>) {
    const response = await fetch(FORMSUBMIT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("FormSubmit delivery failed");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setStatusMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload: Record<string, string> = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      message: String(formData.get("message") || "").trim(),
      page: window.location.href,
      language,
      _subject: subject,
      _template: "table",
      _captcha: "false",
    };

    try {
      await Promise.allSettled([
        submitToFormSubmit(payload),
        submitToNetlify(payload),
      ]).then((results) => {
        if (results.every((result) => result.status === "rejected")) {
          throw new Error("All contact delivery providers failed");
        }
      });

      setStatus("success");
      setStatusMessage(t("contact.form_success"));
      form.reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
      setStatusMessage(t("contact.form_error"));
    }
  }

  const fieldClass =
    "w-full rounded-2xl border border-white/15 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-orange-300/60 focus:bg-white/[0.09] focus:ring-2 focus:ring-orange-400/20";

  return (
    <motion.form
      name={NETLIFY_FORM_NAME}
      method="POST"
      action={FORMSUBMIT_ENDPOINT}
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="liquid-glass mx-auto mb-16 max-w-3xl rounded-[2rem] border border-white/15 p-5 text-left shadow-2xl sm:p-7"
    >
      <input type="hidden" name="form-name" value={NETLIFY_FORM_NAME} />
      <input type="hidden" name="_subject" value={subject} />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <p className="hidden">
        <label>
          Do not fill this field: <input name="bot-field" />
        </label>
      </p>

      <div className="mb-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange-300/80">
          {t("contact.form_eyebrow")}
        </p>
        <h4 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
          {t("contact.form_title")}
        </h4>
        <p className="mt-2 text-sm leading-relaxed text-white/55">
          {t("contact.form_description")}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-white/75">
          {t("contact.form_name")}
          <input
            className={`${fieldClass} mt-2`}
            name="name"
            type="text"
            autoComplete="name"
            placeholder={t("contact.form_name_placeholder")}
            required
          />
        </label>

        <label className="block text-sm font-medium text-white/75">
          {t("contact.form_email")}
          <input
            className={`${fieldClass} mt-2`}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="name@example.com"
            required
          />
        </label>

        <label className="block text-sm font-medium text-white/75 sm:col-span-2">
          {t("contact.form_phone")}
          <input
            className={`${fieldClass} mt-2`}
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+43 ..."
          />
        </label>

        <label className="block text-sm font-medium text-white/75 sm:col-span-2">
          {t("contact.form_message")}
          <textarea
            className={`${fieldClass} mt-2 min-h-36 resize-y`}
            name="message"
            placeholder={t("contact.form_message_placeholder")}
            required
          />
        </label>
      </div>

      <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-xs leading-relaxed text-white/45">
          {t("contact.form_delivery_note")}
        </p>
        <Button
          type="submit"
          size="lg"
          variant="gradient"
          disabled={status === "submitting"}
          className="group w-full sm:w-auto"
        >
          <Send className="w-4 h-4 transition-transform duration-200 group-hover:rotate-12" />
          {status === "submitting"
            ? t("contact.form_sending")
            : t("contact.form_submit")}
        </Button>
      </div>

      {statusMessage && (
        <div
          className={`mt-5 rounded-2xl border px-4 py-3 text-sm ${
            status === "success"
              ? "border-emerald-300/25 bg-emerald-400/10 text-emerald-100"
              : "border-red-300/25 bg-red-400/10 text-red-100"
          }`}
          role="status"
          aria-live="polite"
        >
          {statusMessage}
        </div>
      )}
    </motion.form>
  );
}
