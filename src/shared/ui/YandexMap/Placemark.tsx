import { isValidElement } from "react";

type Coord = [number, number];
interface PlacemarkProps {
  coords: Coord;
  balloonContent?: string;
  hintContent?: string;
  options?: {
    preset?: string;
    iconLayout?: string;
    iconImageClipRect?: [Coord, Coord];
    iconImageHref?: string;
    iconImageSize?: Coord;
    iconImageOffset?: Coord;
  };
  onClick?: () => void;
  isChoosen?: boolean;
}

export type PlacemarkElement = React.ReactElement<PlacemarkProps>;

export function isPlacemarkElement(element: any): element is PlacemarkElement {
  return (
    isValidElement(element) &&
    typeof element.type !== "string" &&
    typeof element.type === "function" &&
    "displayName" in element.type &&
    element.type.displayName === "Placemark"
  );
}

export const Placemark = ({}: PlacemarkProps) => {
  return null;
};

Placemark.displayName = "Placemark";

