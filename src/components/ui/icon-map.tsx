import {
  Globe,
  LayoutDashboard,
  Sparkles,
  Workflow,
  Building2,
  UtensilsCrossed,
  Hotel,
  KeyRound,
  Dumbbell,
  Briefcase,
  Store,
  type LucideIcon,
} from "lucide-react";

export const serviceIconMap: Record<string, LucideIcon> = {
  web: Globe,
  app: LayoutDashboard,
  ai: Sparkles,
  automation: Workflow,
  digital: Building2,
};

export const industryIconMap: Record<string, LucideIcon> = {
  restaurant: UtensilsCrossed,
  hotel: Hotel,
  realestate: KeyRound,
  gym: Dumbbell,
  business: Briefcase,
  shop: Store,
};
