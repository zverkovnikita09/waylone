"use client";
import { useEffect, useRef } from "react";
import { useMapContext } from "./MapContext";

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
  panToPoint?: boolean;
}

export const Placemark = ({
  coords,
  balloonContent,
  hintContent,
  onClick,
  options = {},
  panToPoint,
}: PlacemarkProps) => {
  const { geoObjects, ymaps, mapInstance } = useMapContext();
  const placemarkRef = useRef<any>(null);

  useEffect(() => {
    if (!geoObjects.current) return;

    // Добавляем новые метки
    const yPlacemark = new ymaps.Placemark(
      coords,
      {
        balloonContent,
        hintContent,
      },
      options
    );

    if (onClick) {
      yPlacemark.events.add("click", onClick);
    }

    placemarkRef.current = yPlacemark;

    geoObjects.current.add(yPlacemark);

    return () => {
      geoObjects.current?.remove(placemarkRef.current);
    };
  }, [geoObjects]);

  useEffect(() => {
    if (!placemarkRef.current) return;
    placemarkRef.current.options.set("iconImageHref", options.iconImageHref);
  }, [options.iconImageHref, placemarkRef]);

  useEffect(() => {
    if (!panToPoint || !mapInstance.current) return;

    mapInstance.current.setZoom(15);
    mapInstance.current.panTo(coords, {
      flying: true,
      duration: 1000,
    });
  }, [panToPoint]);

  return null;
};

