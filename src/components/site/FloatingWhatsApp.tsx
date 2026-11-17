"use client";

import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

/** Bouton mobile qui n'apparaît qu'une fois la carte (premier écran) dépassée. */
export function FloatingWhatsApp({ href, label }: { href: string; label: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-5 end-5 z-30 flex size-14 items-center justify-center rounded-full bg-accent text-white shadow-[0_12px_32px_-8px_rgba(61,99,255,0.7)] transition-opacity duration-200 md:hidden ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <WhatsAppIcon className="size-6" />
    </a>
  );
}
