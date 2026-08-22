import { MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@/lib/whatsapp";

export function WhatsAppFloatingButton() {
  return (
    <a
      href={getWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Discuter sur WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-full bg-accent text-white shadow-[0_0_0_1px_rgba(61,99,255,0.4),0_10px_30px_-6px_rgba(61,99,255,0.6)] transition-transform duration-200 hover:scale-105 active:scale-95 md:hidden"
    >
      <MessageCircle className="size-6" aria-hidden="true" />
    </a>
  );
}
