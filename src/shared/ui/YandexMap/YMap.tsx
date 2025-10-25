"use client";
import {
  Children,
  memo,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useYandexMaps } from "./useYandexMaps";
import { MapContextProvider } from "./MapContext";
import { Point } from "@/shared/lib/mapUtils";
import { radiusToZoom } from "@/shared/lib/radiusToZoom";
import { Button } from "../Button";
import { UserPosition } from "./UserPosition";

interface YMapProps {
  userPosition: Point | null;
  center?: Point;
  zoom?: number;
}

export const YMap = memo(
  ({ children, userPosition = null }: PropsWithChildren<YMapProps>) => {
    const mapRef = useRef(null);
    const mapInstance = useRef(null);
    const geoObjects = useRef(null);

    const { ymaps, loading, error } = useYandexMaps();

    // const placemarks = useMemo(
    //   () =>
    //     Children.toArray(children).filter((child): child is PlacemarkElement =>
    //       isPlacemarkElement(child)
    //     ),
    //   [children]
    // );

    useEffect(() => {
      if (ymaps && mapRef.current) {
        const map = new ymaps.Map(mapRef.current, {
          center: [55.76, 37.64],
          // zoom: radiusToZoom(searchRadius || 10),
          zoom: 10,
          controls: [],
        });

        map.options.set({
          copyrightLogoVisible: false,
          copyrightProvidersVisible: false,
          copyrightUaVisible: false,
          suppressMapOpenBlock: true,
          yandexMapDisablePoiInteractivity: true,
        });

        map.behaviors.disable("dblClickZoom");
        geoObjects.current = new ymaps.GeoObjectCollection();
        map.geoObjects.add(geoObjects.current);

        mapInstance.current = map;
      }
    }, [ymaps, mapRef]);

    // useEffect(() => {
    //   if (
    //     mapInstance.current &&
    //     geoObjects.current &&
    //     ymaps &&
    //     typeof searchRadius === "number"
    //   ) {
    //     mapInstance.current.setZoom(radiusToZoom(searchRadius));

    //     if (circleRef.current) {
    //       geoObjects.current.remove(circleRef.current);
    //     }

    //     const circle = new ymaps.Circle(
    //       [[55.76, 37.64], searchRadius],
    //       {},
    //       {
    //         fillColor: "rgba(0, 0, 255, 0.1)",
    //         strokeColor: "#0000FF",
    //         strokeWidth: 2,
    //         interactive: false,
    //         cursor: "default",
    //         draggable: false,
    //       }
    //     );

    //     geoObjects.current.add(circle);
    //     circleRef.current = circle;
    //   }
    // }, [searchRadius]);

    if (loading) return <div className="h-full w-full">Загрузка карты...</div>;
    if (error || !ymaps)
      return <div className="h-full w-full">Ошибка: {error.message}</div>;

    return (
      <MapContextProvider
        ymaps={ymaps}
        geoObjects={geoObjects}
        mapInstance={mapInstance}
      >
        <div className="flex-1 flex">
          <div ref={mapRef} className="flex-1" />;
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

