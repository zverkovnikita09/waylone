import {useEffect, useRef} from "react";
import {Point} from "@/shared/lib/mapUtils";
import {useMapContext} from "@/shared/ui/YandexMap/MapContext";
import {radiusToZoom} from "@/shared/lib/radiusToZoom";

interface SearchRadiusProps {
  searchRadius: number;
  userPosition: Point | null;
}

export const SearchRadius = ({searchRadius,userPosition}: SearchRadiusProps) => {
  const circleRef = useRef<any>(null);
  const {mapInstance, ymaps, geoObjects} = useMapContext()

  useEffect(() => {
    if (
      mapInstance.current &&
      geoObjects.current &&
      ymaps &&
      typeof searchRadius === "number" &&
          userPosition
    ) {
      mapInstance.current.setCenter(userPosition,radiusToZoom(searchRadius));

      if (circleRef.current) {
        geoObjects.current.remove(circleRef.current);
      }

      const circle = new ymaps.Circle(
        [[55.76, 37.64], searchRadius],
        {},
        {
          fillColor: "rgba(0, 0, 255, 0.1)",
          strokeColor: "#0000FF",
          strokeWidth: 2,
          interactive: false,
          cursor: "default",
          draggable: false,
        }
      );

      geoObjects.current.add(circle);
      circleRef.current = circle;
    }
  }, [searchRadius]);

  return <></>;
};

SearchRadius.displayName = "SearchRadius";

