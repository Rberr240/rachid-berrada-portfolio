"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

interface WhatsAppFloatingButtonProps {
  href: string;
  ariaLabel: string;
}

// En haut de page, le CTA principal du Hero ouvre déjà WhatsApp : le bouton
// flottant n'apparaît qu'après ce seuil, pour ne jamais chevaucher les CTA
// du premier écran sur les petits viewports mobiles.
const SHOW_AFTER_SCROLL = 480;

export function WhatsAppFloatingButton({ href, ariaLabel }: WhatsAppFloatingButtonProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_SCROLL);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-full bg-accent text-white shadow-[0_0_0_1px_rgba(61,99,255,0.4),0_10px_30px_-6px_rgba(61,99,255,0.6)] transition-[opacity,transform] duration-200 hover:scale-105 active:scale-95 md:hidden ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <MessageCircle className="size-6" aria-hidden="true" />
    </a>
  );
}
