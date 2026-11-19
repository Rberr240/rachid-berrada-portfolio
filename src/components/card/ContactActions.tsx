import { Mail, Phone, UserPlus } from "lucide-react";
import type { Dictionary } from "@/content/types";
import { person } from "@/content/facts";
import type { Locale } from "@/lib/i18n";
import { paths } from "@/lib/paths";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { button } from "@/components/ui/styles";

const tile =
  "flex min-h-16 flex-col items-center justify-center gap-1 rounded-2xl border border-line-strong px-2 py-2 text-center text-[0.8rem] font-medium leading-tight text-fg transition-colors hover:border-fg-subtle hover:bg-white/[0.04]";

/**
 * Les quatre actions de la carte de visite. Le suivi (clics WhatsApp,
 * appel, e-mail, vCard) est déduit des href par components/site/Attribution.
 */
export function ContactActions({ lang, t }: { lang: Locale; t: Dictionary }) {
  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-[1.7fr_1fr_1fr_1fr]">
      <a
        href={getWhatsAppLink(person.whatsappNumber, t.whatsapp.defaultMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className={`${button.primary} col-span-3 min-h-14 sm:col-span-1 sm:min-h-16`}
      >
        <WhatsAppIcon className="size-5 shrink-0" />
        {t.common.whatsapp}
        <span className="sr-only"> {t.common.externalHint}</span>
      </a>
      <a href={paths.vcard(lang)} className={tile}>
        <UserPlus className="size-[1.15rem] text-accent-text" aria-hidden="true" />
        {t.common.saveContact}
      </a>
      <a href={`tel:${person.phoneE164}`} className={tile}>
        <Phone className="size-[1.15rem] text-accent-text" aria-hidden="true" />
        {t.common.call}
      </a>
      <a href={`mailto:${person.email}`} className={tile}>
        <Mail className="size-[1.15rem] text-accent-text" aria-hidden="true" />
        {t.common.email}
      </a>
    </div>
  );
}
