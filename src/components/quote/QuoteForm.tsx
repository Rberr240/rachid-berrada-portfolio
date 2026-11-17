"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2 } from "lucide-react";
import type { Dictionary } from "@/content/types";
import {
  CONTACT_PREFERENCE_VALUES,
  FORM_NAME,
  SERVICE_VALUES,
  TIMELINE_VALUES,
  validateLead,
  type LeadErrorKey,
} from "@/lib/lead";
import { ATTRIBUTION_KEY, type Attribution } from "@/lib/attribution";
import { button, textLink } from "@/components/ui/styles";

type Status = "idle" | "submitting" | "success" | "error";

const empty = {
  name: "",
  company: "",
  email: "",
  phone: "",
  projectType: "",
  message: "",
  timeline: "",
  contactPreference: "",
  budget: "",
  consent: false,
  botField: "",
};

// Champ du formulaire à focaliser pour chaque erreur.
const errorField: Record<LeadErrorKey, string> = {
  name: "name",
  contact: "email",
  email: "email",
  phone: "phone",
  service: "projectType",
  description: "message",
  consent: "consent",
};

const input =
  "w-full rounded-xl border border-line-strong bg-surface px-4 py-3 text-base text-fg outline-none transition-colors placeholder:text-fg-subtle focus:border-accent-text aria-[invalid=true]:border-danger";

export function QuoteForm({
  lang,
  q,
  privacyHref,
  fallback,
}: {
  lang: string;
  q: Dictionary["quote"];
  privacyHref: string;
  fallback: ReactNode;
}) {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const started = useRef(false);
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState<LeadErrorKey[]>([]);
  const [status, setStatus] = useState<Status>("idle");

  // Pré-sélection depuis une carte de service (/devis?service=automation).
  useEffect(() => {
    const service = new URLSearchParams(window.location.search).get("service") ?? "";
    if ((SERVICE_VALUES as readonly string[]).includes(service)) {
      // Synchronisation ponctuelle depuis l'URL (système externe) après
      // hydratation : la lire au rendu casserait l'hydratation de la page statique.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setValues((v) => ({ ...v, projectType: service }));
    }
  }, []);

  function update<K extends keyof typeof empty>(key: K, value: (typeof empty)[K]) {
    if (!started.current) {
      started.current = true;
      window.plausible?.("quote_start");
    }
    setValues((v) => ({ ...v, [key]: value }));
  }

  const has = (key: LeadErrorKey) => errors.includes(key);
  const describedBy = (...keys: LeadErrorKey[]) => {
    const ids = keys.filter(has).map((k) => `${id}-err-${k}`);
    return ids.length ? ids.join(" ") : undefined;
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const payload = {
      name: values.name,
      company: values.company,
      email: values.email,
      phone: values.phone,
      projectType: values.projectType,
      message: values.message,
      timeline: values.timeline,
      contactPreference: values.contactPreference,
      budget: values.budget,
      consent: values.consent ? "yes" : "",
    };
    const found = validateLead(payload);
    setErrors(found);
    if (found.length > 0) {
      const first = formRef.current?.elements.namedItem(errorField[found[0]]);
      if (first instanceof HTMLElement) first.focus();
      return;
    }

    let attribution: Partial<Attribution> = {};
    try {
      attribution = JSON.parse(window.sessionStorage.getItem(ATTRIBUTION_KEY) ?? "{}");
    } catch {
      attribution = {};
    }

    setStatus("submitting");
    try {
      const body = new URLSearchParams({
        "form-name": FORM_NAME,
        "bot-field": values.botField,
        ...payload,
        locale: lang,
        channel: attribution.channel ?? "direct",
        sourceDetail: attribution.detail ?? "",
        entryPage: attribution.entryPage ?? "",
      });
      const res = await fetch("/netlify-forms/contact.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
      window.plausible?.("quote_submit_success");
    } catch {
      // Jamais de faux succès : la demande n'est pas partie.
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-[1.75rem] border border-line-strong bg-surface p-8">
        <CheckCircle2 className="size-8 text-gold" aria-hidden="true" />
        <h2 className="display mt-4 text-3xl text-fg">{q.successTitle}</h2>
        <p className="mt-3 text-fg-muted">{q.successBody}</p>
      </div>
    );
  }

  const label = "mb-2 block font-medium text-fg";
  const optional = <span className="font-normal text-fg-subtle"> ({q.fields.optional})</span>;
  const required = <span className="text-gold" aria-hidden="true"> *</span>;
  const errorText = (key: LeadErrorKey) =>
    has(key) ? (
      <p id={`${id}-err-${key}`} className="mt-2 text-sm text-danger">
        {q.errors[key]}
      </p>
    ) : null;

  return (
    <form ref={formRef} name={FORM_NAME} onSubmit={onSubmit} noValidate className="space-y-6">
      {errors.length > 0 ? (
        <p role="alert" className="rounded-xl border border-danger/50 px-4 py-3 text-danger">
          {q.errors.summary}
        </p>
      ) : null}

      {/* Piège à robots : invisible et ignoré par les humains et lecteurs d'écran. */}
      <div className="hidden" aria-hidden="true">
        <label>
          {q.fields.honeypot}
          <input
            name="bot-field"
            tabIndex={-1}
            autoComplete="off"
            value={values.botField}
            onChange={(e) => setValues((v) => ({ ...v, botField: e.target.value }))}
          />
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className={label}>
            {q.fields.name}
            {required}
          </label>
          <input
            id={`${id}-name`}
            name="name"
            autoComplete="name"
            required
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={has("name")}
            aria-describedby={describedBy("name")}
            className={input}
          />
          {errorText("name")}
        </div>
        <div>
          <label htmlFor={`${id}-company`} className={label}>
            {q.fields.company}
            {optional}
          </label>
          <input
            id={`${id}-company`}
            name="company"
            autoComplete="organization"
            value={values.company}
            onChange={(e) => update("company", e.target.value)}
            className={input}
          />
        </div>
      </div>

      <fieldset>
        <legend className="sr-only">{q.fields.contactHint}</legend>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor={`${id}-email`} className={label}>
              {q.fields.email}
            </label>
            <input
              id={`${id}-email`}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              dir="ltr"
              value={values.email}
              onChange={(e) => update("email", e.target.value)}
              aria-invalid={has("email") || has("contact")}
              aria-describedby={describedBy("contact", "email") ?? `${id}-contact-hint`}
              className={input}
            />
            {errorText("email")}
          </div>
          <div>
            <label htmlFor={`${id}-phone`} className={label}>
              {q.fields.phone}
            </label>
            <input
              id={`${id}-phone`}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              dir="ltr"
              value={values.phone}
              onChange={(e) => update("phone", e.target.value)}
              aria-invalid={has("phone") || has("contact")}
              aria-describedby={describedBy("contact", "phone") ?? `${id}-contact-hint`}
              className={input}
            />
            {errorText("phone")}
          </div>
        </div>
        <p id={`${id}-contact-hint`} className="mt-2 text-sm text-fg-subtle">
          {q.fields.contactHint}
        </p>
        {errorText("contact")}
      </fieldset>

      <div>
        <label htmlFor={`${id}-service`} className={label}>
          {q.fields.service}
          {required}
        </label>
        <select
          id={`${id}-service`}
          name="projectType"
          value={values.projectType}
          onChange={(e) => update("projectType", e.target.value)}
          aria-invalid={has("service")}
          aria-describedby={describedBy("service")}
          className={input}
        >
          <option value="">{q.fields.choose}</option>
          {SERVICE_VALUES.map((value) => (
            <option key={value} value={value}>
              {q.options.service[value]}
            </option>
          ))}
        </select>
        {errorText("service")}
      </div>

      <div>
        <label htmlFor={`${id}-message`} className={label}>
          {q.fields.description}
          {required}
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={5}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder={q.fields.descriptionPlaceholder}
          aria-invalid={has("description")}
          aria-describedby={describedBy("description")}
          className={`${input} resize-y`}
        />
        {errorText("description")}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-timeline`} className={label}>
            {q.fields.timeline}
            {optional}
          </label>
          <select
            id={`${id}-timeline`}
            name="timeline"
            value={values.timeline}
            onChange={(e) => update("timeline", e.target.value)}
            className={input}
          >
            <option value="">{q.fields.choose}</option>
            {TIMELINE_VALUES.map((value) => (
              <option key={value} value={value}>
                {q.options.timeline[value]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${id}-budget`} className={label}>
            {q.fields.budget}
            {optional}
          </label>
          <input
            id={`${id}-budget`}
            name="budget"
            value={values.budget}
            onChange={(e) => update("budget", e.target.value)}
            placeholder={q.fields.budgetPlaceholder}
            className={input}
          />
        </div>
      </div>

      <fieldset>
        <legend className={label}>
          {q.fields.contactPreference}
          {optional}
        </legend>
        <div className="flex flex-wrap gap-2">
          {CONTACT_PREFERENCE_VALUES.map((value) => (
            <label
              key={value}
              className="flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-line-strong px-4 has-[:checked]:border-accent-text has-[:checked]:text-fg text-fg-muted"
            >
              <input
                type="radio"
                name="contactPreference"
                value={value}
                checked={values.contactPreference === value}
                onChange={() => update("contactPreference", value)}
                className="accent-accent"
              />
              {q.options.contactPreference[value]}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label className="flex items-start gap-3 text-fg-muted">
          <input
            type="checkbox"
            name="consent"
            checked={values.consent}
            onChange={(e) => update("consent", e.target.checked)}
            aria-invalid={has("consent")}
            aria-describedby={describedBy("consent")}
            className="mt-1 size-5 shrink-0 accent-accent"
          />
          <span>
            {q.fields.consent}{" "}
            <Link href={privacyHref} className={textLink}>
              {q.fields.privacyLink}
            </Link>
            .{required}
          </span>
        </label>
        {errorText("consent")}
      </div>

      {status === "error" ? (
        <div role="alert" className="rounded-xl border border-danger/50 px-4 py-3">
          <p className="text-danger">{q.failure}</p>
          <div className="mt-3">{fallback}</div>
        </div>
      ) : null}

      <button type="submit" disabled={status === "submitting"} className={`${button.primary} w-full disabled:opacity-60 sm:w-auto sm:px-8`}>
        {status === "submitting" ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
        {status === "submitting" ? q.submitting : q.submit}
      </button>
    </form>
  );
}
