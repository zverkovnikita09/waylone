"use client";
import { useEffect, useRef } from "react";
import { useYandexMaps } from "./useYandexMaps";
import { MapContextProvider } from "./MapContext";

interface YMapProps {
  zoom?: number;
}

export const YMap = ({ zoom = 10 }: YMapProps) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const { ymaps, loading, error } = useYandexMaps();

  useEffect(() => {
    if (ymaps && mapRef.current) {
      const map = new ymaps.Map(mapRef.current, {
        center: [55.76, 37.64],
        zoom, // Используем переданный zoom
        controls: [],
      });

      map.options.set({
        copyrightLogoVisible: false,
        copyrightProvidersVisible: false,
        copyrightUaVisible: false,
        suppressMapOpenBlock: true,
      });

      mapInstance.current = map; // Сохраняем экземпляр карты
    }
  }, [ymaps, mapRef]);

  useEffect(() => {
    if (mapInstance.current && typeof zoom === "number") {
      mapInstance.current.setZoom(zoom);
    }
  }, [zoom]);

  if (loading) return <div className="h-full w-full">Загрузка карты...</div>;
  if (error)
    return <div className="h-full w-full">Ошибка: {error.message}</div>;

  return (
    <MapContextProvider>
      <div className="flex-1 flex">
        <div ref={mapRef} className="flex-1" />;
        <div className="absolute bottom-[80px] text-sm right-[20px] bg-white shadow-md flex gap-sm items-center px-lg py-md rounded-lg">
          <div className="rounded-full bg-success w-md h-md" />
          <p>Москва, Тверская улица</p>
        </div>
      </div>
    </MapContextProvider>
  );
};

