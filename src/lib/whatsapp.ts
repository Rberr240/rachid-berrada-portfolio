import { siteConfig } from "@/data/profile";

/**
 * Construit un lien wa.me valide avec un message pré-rempli correctement encodé.
 */
export function getWhatsAppLink(message: string = siteConfig.whatsappDefaultMessage) {
  const digitsOnly = siteConfig.whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${digitsOnly}?text=${encodeURIComponent(message)}`;
}
