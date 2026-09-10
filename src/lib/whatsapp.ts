/**
 * Construit un lien wa.me valide avec un message pré-rempli correctement encodé.
 * Ne dépend plus de src/data/profile directement : le numéro et le message
 * viennent du Profile résolu par locale (voir src/data/types.ts#Profile).
 */
export function getWhatsAppLink(whatsappNumber: string, message: string) {
  const digitsOnly = whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${digitsOnly}?text=${encodeURIComponent(message)}`;
}
