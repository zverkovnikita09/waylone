"use client";
import { memo, PropsWithChildren, useEffect, useRef } from "react";
import { useYandexMaps } from "./useYandexMaps";
import { MapContextProvider } from "./MapContext";
import { Point } from "@/shared/lib/mapUtils";
import { UserPosition } from "./UserPosition";
import { MapLoader } from "./MapLoader";

interface YMapProps {
  userPosition: Point | null;
  center?: Point;
  zoom?: number;
}

export const YMap = memo(
  ({ children, userPosition = null }: PropsWithChildren<YMapProps>) => {
    const mapRef = useRef(null);
    const mapInstance = useRef<any>(null);
    const geoObjects = useRef<any>(null);

    const { ymaps, loading, error } = useYandexMaps();

    useEffect(() => {
      if (ymaps && mapRef.current) {
        const map = new ymaps.Map(mapRef.current, {
          center: userPosition ?? [55.76, 37.64],
          // zoom: radiusToZoom(searchRadius || 10),
          zoom: 10,
          controls: [],
        });

        map.options.set({
          suppressMapOpenBlock: true,
          yandexMapDisablePoiInteractivity: true,
        });

        map.behaviors.disable(["dblClickZoom", "rightMouseButtonMagnifier"]);
        geoObjects.current = new ymaps.GeoObjectCollection();
        map.geoObjects.add(geoObjects.current);

        mapInstance.current = map;
      }
    }, [ymaps, mapRef]);

    if (loading)
      return (
        <div className="h-full w-full">
          <MapLoader />
        </div>
      );
    if (error || !ymaps)
      return (
        <div className="h-full w-full">
          Ошибка:{" "}
          {error instanceof Error ? error.message : "Неизвестная ошибка"}
        </div>
      );

    return (
      <MapContextProvider
        ymaps={ymaps}
        geoObjects={geoObjects}
        mapInstance={mapInstance}
      >
        <div className="flex-1 flex">
          <div ref={mapRef} className="flex-1 overflow-hidden" />;
          <UserPosition userPosition={userPosition} />
          {/* <div className="absolute bottom-[20px] text-sm left-[20px] bg-white shadow-md flex gap-sm items-center px-lg py-md rounded-lg">
            <Button onClick={buildRoute}>Построить маршрут</Button>
          </div> */}
        </div>
        {children}
      </MapContextProvider>
    );
  }
);

