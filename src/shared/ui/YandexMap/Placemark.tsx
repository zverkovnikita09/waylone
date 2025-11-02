"use client";
import { useEffect, useRef, useState } from "react";
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
    balloonOffset?: Coord;
    balloonCloseButton?: boolean;
    openBalloonOnClick?: boolean;
    balloonPanelMaxMapArea?: number;
    balloonLayout?: string;
  };
  onClick?: () => void;
  panToPoint?: boolean;
  openBaloon?: boolean;
}

export const Placemark = ({
  coords,
  balloonContent,
  hintContent,
  onClick,
  options = {},
  panToPoint,
  openBaloon,
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
      {
        ...options,
        hideIconOnBalloonOpen: false,
        balloonOffset: [
          options.iconImageSize?.[0] ?? 30,
          -(options.iconImageSize?.[1] ?? 37) / 2,
        ],
        //@ts-ignore
        balloonLayout: ymaps.templateLayoutFactory.createClass(
          `<div class="balloon-root bg-main-bg w-[300px] block relative p-lg rounded-lg shadow-lg" style="position: absolute; left: 100%; top: 50%; transform: translateY(-50%);">
          <div class="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[15px] border-r-main-bg absolute -left-[15px] z-0 top-[50%] -translate-y-[50%] shadow-2xl"></div>
          <div class="balloon-body balloon">$[properties.balloonContent]</div>
        </div>`,
          {
            build: function () {
              this.constructor.superclass.build.call(this);
              this._element = document.querySelector(".balloon-root");
            },
          }
        ),
      }
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
      duration: 100,
    });
  }, [panToPoint]);

  useEffect(() => {
    if (openBaloon) {
      placemarkRef.current?.balloon.open();
    } else {
      placemarkRef.current?.balloon.close();
    }
  }, [openBaloon]);

  return null;
};

