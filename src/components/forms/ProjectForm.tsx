"use client";

import { useId, useState, type FormEvent } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { projectTypes, siteConfig } from "@/data/profile";
import { getWhatsAppLink } from "@/lib/whatsapp";

const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";

type Status = "idle" | "submitting" | "success" | "error";

interface FormState {
  name: string;
  company: string;
  phone: string;
  email: string;
  projectType: string;
  message: string;
}

const initialState: FormState = {
  name: "",
  company: "",
  phone: "",
  email: "",
  projectType: projectTypes[0],
  message: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ProjectForm() {
  const formId = useId();
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>("idle");

  const isConnected = FORM_ENDPOINT.length > 0;

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!values.name.trim()) next.name = "Merci d'indiquer votre nom.";
    if (!values.phone.trim()) next.phone = "Merci d'indiquer un numéro de téléphone.";
    if (!values.email.trim()) {
      next.email = "Merci d'indiquer votre email.";
    } else if (!EMAIL_REGEX.test(values.email)) {
      next.email = "Le format de l'email semble invalide.";
    }
    if (!values.message.trim()) next.message = "Décrivez brièvement votre projet.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isConnected) return;
    if (!validate()) return;

    setStatus("submitting");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: values.name,
          company: values.company,
          phone: values.phone,
          email: values.email,
          projectType: values.projectType,
          message: values.message,
        }),
      });

      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setValues(initialState);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-3 rounded-2xl border border-border-strong bg-surface/60 p-8"
      >
        <CheckCircle2 className="size-8 text-accent-2" aria-hidden="true" />
        <p className="text-base font-medium text-fg">Message envoyé, merci !</p>
        <p className="text-sm leading-relaxed text-fg-muted">
          Je reviens vers vous rapidement. Pour aller plus vite, vous pouvez aussi me
          contacter directement sur WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {!isConnected ? (
        <div className="flex items-start gap-3 rounded-xl border border-gold/30 bg-gold/[0.06] p-4">
          <AlertCircle className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
          <p className="text-sm leading-relaxed text-fg-muted">
            Le formulaire n&apos;est pas encore connecté à un service d&apos;envoi. En
            attendant, contactez-moi directement via{" "}
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent-2 underline underline-offset-2"
            >
              WhatsApp
            </a>{" "}
            ou par{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-medium text-accent-2 underline underline-offset-2"
            >
              email
            </a>
            .
          </p>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id={`${formId}-name`}
          label="Nom"
          required
          autoComplete="name"
          value={values.name}
          onChange={(v) => update("name", v)}
          error={errors.name}
        />
        <Field
          id={`${formId}-company`}
          label="Entreprise"
          autoComplete="organization"
          value={values.company}
          onChange={(v) => update("company", v)}
        />
        <Field
          id={`${formId}-phone`}
          label="Téléphone / WhatsApp"
          required
          type="tel"
          autoComplete="tel"
          value={values.phone}
          onChange={(v) => update("phone", v)}
          error={errors.phone}
        />
        <Field
          id={`${formId}-email`}
          label="Email"
          required
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(v) => update("email", v)}
          error={errors.email}
        />
      </div>

      <div>
        <label
          htmlFor={`${formId}-type`}
          className="mb-1.5 block text-sm font-medium text-fg"
        >
          Type de projet
        </label>
        <select
          id={`${formId}-type`}
          value={values.projectType}
          onChange={(e) => update("projectType", e.target.value)}
          className="w-full rounded-xl border border-border-strong bg-surface px-4 py-3 text-sm text-fg outline-none transition-colors focus:border-accent-2"
        >
          {projectTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor={`${formId}-message`}
          className="mb-1.5 block text-sm font-medium text-fg"
        >
          Message <span className="text-accent-2">*</span>
        </label>
        <textarea
          id={`${formId}-message`}
          required
          rows={4}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${formId}-message-error` : undefined}
          placeholder="Parlez-moi de votre projet, de votre activité et du besoin à résoudre."
          className="w-full resize-none rounded-xl border border-border-strong bg-surface px-4 py-3 text-sm text-fg outline-none transition-colors placeholder:text-fg-subtle focus:border-accent-2"
          suppressHydrationWarning
        />
        {errors.message ? (
          <p id={`${formId}-message-error`} className="mt-1.5 text-xs text-red-400">
            {errors.message}
          </p>
        ) : null}
      </div>

      {status === "error" ? (
        <p role="alert" className="text-sm text-red-400">
          Une erreur est survenue lors de l&apos;envoi. Merci de réessayer ou de me
          contacter directement via WhatsApp.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={!isConnected || status === "submitting"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-accent-2 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
      >
        {status === "submitting" ? (
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        ) : null}
        Envoyer ma demande
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  required,
  type = "text",
  autoComplete,
  error,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
  autoComplete?: string;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-fg">
        {label} {required ? <span className="text-accent-2">*</span> : null}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="w-full rounded-xl border border-border-strong bg-surface px-4 py-3 text-sm text-fg outline-none transition-colors focus:border-accent-2"
        suppressHydrationWarning
      />
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}
