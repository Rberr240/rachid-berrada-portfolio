"use client";

import { useState } from "react";
import { Share2 } from "lucide-react";

interface ShareButtonProps {
  label: string;
  copiedLabel: string;
  failedLabel: string;
  title: string;
  text: string;
  className?: string;
}

/**
 * Partage natif (Web Share API) quand il existe, sinon copie du lien.
 * Le lien partagé est la racine du domaine : chaque destinataire est
 * ensuite dirigé vers sa propre langue.
 */
export function ShareButton({ label, copiedLabel, failedLabel, title, text, className = "" }: ShareButtonProps) {
  const [status, setStatus] = useState("");

  async function share() {
    const url = `${window.location.origin}/`;
    window.plausible?.("share_click");
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setStatus(copiedLabel);
    } catch {
      setStatus(failedLabel);
    }
    window.setTimeout(() => setStatus(""), 4000);
  }

  return (
    <>
      <button type="button" onClick={share} className={className}>
        <Share2 className="size-4" aria-hidden="true" />
        {label}
      </button>
      <span role="status" className="text-sm text-fg-muted">
        {status}
      </span>
    </>
  );
}
