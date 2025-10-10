import { Ymaps } from "@/shared/ui/YandexMap";

declare global {
  interface Window {
    ymaps: Ymaps;
  }
}

export { };