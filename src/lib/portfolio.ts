import { existsSync } from "node:fs";
import { join } from "node:path";
import { projects } from "@/data/profile";

export function getProject(id: string) {
  return projects.find((p) => p.id === id);
}

export function getCaseStudyProjects() {
  return projects.filter((p) => p.caseStudy);
}

/**
 * Vérifie, au moment du build, si un asset a bien été déposé dans /public.
 * Utilisé pour la photo de la carte physique Gold Fitness : son emplacement est
 * prêt (public/portfolio/gold-fitness/card-real.jpg) mais le fichier n'existe pas
 * encore tant que Rachid ne l'a pas fournie — dans ce cas la galerie ne l'affiche
 * simplement pas, sans bloquer le build.
 */
export function publicAssetExists(publicPath: string) {
  return existsSync(join(process.cwd(), "public", publicPath.replace(/^\//, "")));
}
