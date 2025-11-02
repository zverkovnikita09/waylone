import { Point } from "@/shared/lib/mapUtils";

export const CATEGORIES = [
  { title: "Музеи", category: "museum", icon: /* <MdOutlineMuseum /> */"" },
  { title: "Парки", category: "park", icon: /* <PiPark /> */"" },
  { title: "Храмы", category: "church", icon: /* <PiChurch /> */"" },
  { title: "Памятники", category: "monument", icon: /* <TbBuildingMonument /> */"" },
  { title: "Театры", category: "theatre", icon: /* <MdOutlineTheaters /> */"" },
  { title: "Кремли", category: "cremlin", icon: /* <GiGreekTemple /> */"" },
];

export type Categories =
  | "theatre"
  | "cremlin"
  | "park"
  | "museum"
  | "monument"
  | "church";

export interface Place {
  coords: Point;
  title: string;
  id: number;
  category: Categories;
  description: string;
  images: string[];
  rating: number;
  history?: string;
  reviews?: string[]; // TODO
  address: string;
}

