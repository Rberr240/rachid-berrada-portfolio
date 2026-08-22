"use client";

import { useId, useState, type FormEvent } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { projectTypes } from "@/data/profile";

const FORM_NAME = "contact";

type Status = "idle" | "submitting" | "success" | "error";

interface FormState {
  name: string;
  company: string;
  phone: string;
  email: string;
  projectType: string;
  message: string;
  botField: string;
}

const initialState: FormState = {
  name: "",
  company: "",
  phone: "",
  email: "",
  projectType: projectTypes[0],
  message: "",
  botField: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function encodeForm(data: Record<string, string>): string {
  return Object.entries(data)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join("&");
}

export function ProjectForm() {
  const formId = useId();
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>("idle");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!values.name.trim()) next.name = "Merci d'indiquer votre nom.";
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
    if (!validate()) return;
    // Honeypot : un champ normalement invisible/inaccessible pour un humain.
    // S'il est rempli, la soumission vient très probablement d'un robot.
    if (values.botField) return;

    setStatus("submitting");
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeForm({
          "form-name": FORM_NAME,
          name: values.name,
          company: values.company,
          phone: values.phone,
          email: values.email,
          projectType: values.projectType,
          message: values.message,
          "bot-field": values.botField,
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
    <form
      name={FORM_NAME}
      onSubmit={handleSubmit}
      noValidate
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      className="space-y-5"
    >
      {/* Champ requis par Netlify Forms pour associer la soumission au formulaire */}
      <input type="hidden" name="form-name" value={FORM_NAME} />

      {/* Honeypot anti-spam : positionné hors écran, jamais rempli par un humain */}
      <p className="absolute -left-[9999px]" aria-hidden="true">
        <label>
          Ne pas remplir si vous êtes humain
          <input
            type="text"
            name="bot-field"
            tabIndex={-1}
            autoComplete="off"
            value={values.botField}
            onChange={(e) => update("botField", e.target.value)}
          />
        </label>
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id={`${formId}-name`}
          name="name"
          label="Nom"
          required
          autoComplete="name"
          value={values.name}
          onChange={(v) => update("name", v)}
          error={errors.name}
        />
        <Field
          id={`${formId}-company`}
          name="company"
          label="Entreprise"
          autoComplete="organization"
          value={values.company}
          onChange={(v) => update("company", v)}
        />
        <Field
          id={`${formId}-phone`}
          name="phone"
          label="Téléphone / WhatsApp (facultatif)"
          type="tel"
          autoComplete="tel"
          value={values.phone}
          onChange={(v) => update("phone", v)}
          error={errors.phone}
        />
        <Field
          id={`${formId}-email`}
          name="email"
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
          name="projectType"
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
          name="message"
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
        disabled={status === "submitting"}
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
  name,
  label,
  value,
  onChange,
  required,
  type = "text",
  autoComplete,
  error,
}: {
  id: string;
  name: string;
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
        name={name}
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
