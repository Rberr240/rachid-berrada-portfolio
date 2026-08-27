import Link from "next/link";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getSiteUrl } from "@/lib/site-url";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

/**
 * Route de secours pour toute URL qui ne correspond à aucune route — en
 * dehors de app/[lang], donc sans accès au layout/à la locale (convention
 * global-not-found.js : nécessaire quand le layout racine vit sous un
 * segment dynamique). Sans ce fichier, Next.js sert son 404 générique par
 * défaut pour cette route, dont l'image OpenGraph résout en dur vers
 * http://localhost:3000 (aucun metadataBase dans sa chaîne d'ancêtres) —
 * une vraie fuite dans le HTML de production, indépendante de
 * l'avertissement metadataBase cosmétique au moment du build (bug amont
 * documenté : vercel/next.js#77512, la métadonnée d'une page notFound()
 * n'hérite pas correctement du layout). openGraph/twitter.images sont
 * fournis ici explicitement en URL absolue pour éviter toute tentative de
 * résolution relative sur cette route orpheline.
 */
export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "Page not found | Rachid Berrada",
  description: "The page you are looking for does not exist.",
  robots: { index: false, follow: false },
  openGraph: {
    images: [{ url: `${getSiteUrl()}/opengraph-image`, width: 1200, height: 630 }],
  },
  twitter: {
    images: [`${getSiteUrl()}/opengraph-image`],
  },
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col items-center justify-center gap-4 bg-ink px-6 text-center text-fg">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent-2">
          404
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">Page not found</h1>
        <p className="max-w-sm text-sm leading-relaxed text-fg-muted">
          The page you are looking for does not exist.
        </p>
        <div className="mt-2 flex gap-4 text-sm font-medium">
          <Link href="/" className="text-accent-2 hover:text-fg">
            Home (English)
          </Link>
          <Link href="/fr" className="text-accent-2 hover:text-fg">
            Accueil (Français)
          </Link>
        </div>
      </body>
    </html>
  );
}
