/**
 * Génération d'une vCard 3.0 (RFC 2426) — format le mieux pris en charge
 * par iOS, Android et Outlook. Sans dépendance : importable par les tests Node.
 */

export interface VCardInput {
  givenName: string;
  familyName: string;
  title: string;
  email: string;
  phoneE164: string;
  url: string;
  githubUrl?: string;
  note?: string;
  /** JPEG encodé en base64 (sans préfixe data:). */
  photoBase64?: string;
}

/** Échappe les caractères spéciaux d'une valeur texte vCard. */
export function escapeVCardText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\r?\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

/** Plie une ligne à 75 octets maximum (UTF-8), sans couper un caractère. */
export function foldLine(line: string): string {
  const encoder = new TextEncoder();
  const parts: string[] = [];
  let current = "";
  let bytes = 0;
  for (const char of line) {
    const size = encoder.encode(char).length;
    // Les lignes de continuation commencent par un espace (1 octet).
    const limit = parts.length === 0 ? 75 : 74;
    if (bytes + size > limit) {
      parts.push(current);
      current = "";
      bytes = 0;
    }
    current += char;
    bytes += size;
  }
  parts.push(current);
  return parts.join("\r\n ");
}

export function buildVCard(input: VCardInput): string {
  const t = escapeVCardText;
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${t(input.familyName)};${t(input.givenName)};;;`,
    `FN:${t(`${input.givenName} ${input.familyName}`)}`,
    `TITLE:${t(input.title)}`,
    `TEL;TYPE=CELL,VOICE:${input.phoneE164}`,
    `EMAIL;TYPE=INTERNET,PREF:${input.email}`,
    `URL:${input.url}`,
    ...(input.githubUrl ? [`X-SOCIALPROFILE;TYPE=github:${input.githubUrl}`] : []),
    ...(input.note ? [`NOTE:${t(input.note)}`] : []),
    ...(input.photoBase64 ? [`PHOTO;ENCODING=b;TYPE=JPEG:${input.photoBase64}`] : []),
    "END:VCARD",
  ];
  return lines.map(foldLine).join("\r\n") + "\r\n";
}
