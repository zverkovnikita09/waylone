"use client";
import { CategoriesList } from "./CategoriesList";
import { MdOutlineMuseum, MdOutlineTheaters } from "react-icons/md";
import { PiPark, PiChurch } from "react-icons/pi";
import { TbBuildingMonument } from "react-icons/tb";
import { GiGreekTemple } from "react-icons/gi";
import { PopularPlaces } from "./PopularPlaces";
import { Input } from "@/shared/ui/Input";
import {
  Placemark,
  RouteBuilder,
  SearchRadius,
  YMap,
} from "@/shared/ui/YandexMap";
import { InputRange } from "@/shared/ui/InputRange";
import { useCallback, useMemo, useState } from "react";
import { Button } from "@/shared/ui/Button";
import { formatDistance, formatTime } from "@/shared/lib/convert";
import Marker from "./Marker.png";
import MarkerSelected from "./MarkerSelected.png";
import { useSearchParams } from "next/navigation";
import { useGeolocation } from "@/shared/lib/useGeolocation";
import { Point } from "@/shared/lib/mapUtils";
import { Place } from "@/app/api/places/types";
import { BalloonContent } from "@/shared/ui/YandexMap/BalloonContent";
import * as ReactDOMServer from "react-dom/server";

export type Categories =
  | "theatre"
  | "cremlin"
  | "park"
  | "museum"
  | "monument"
  | "church";

const categories = [
  { title: "Музеи", category: "museum", icon: <MdOutlineMuseum /> },
  { title: "Парки", category: "park", icon: <PiPark /> },
  { title: "Храмы", category: "church", icon: <PiChurch /> },
  { title: "Памятники", category: "monument", icon: <TbBuildingMonument /> },
  { title: "Театры", category: "theatre", icon: <MdOutlineTheaters /> },
  { title: "Кремли", category: "cremlin", icon: <GiGreekTemple /> },
];

interface PageProps {
  places: Place[];
}

export const Page = ({ places }: PageProps) => {
  const [range, setRange] = useState([0]);
  const [choosenPoints, setChoosenPoints] = useState<Place[]>([]);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [centerOnPoint, setCenterOnPoint] = useState<number | null>(null);

  const [distanceAndDuration, setDistanceAndDuration] = useState<
    {
      distance: number;
      duration: number;
    }[]
  >([]);

  const handleChangeChoosenPoints = useCallback((point: Place) => {
    setChoosenPoints((prev) => {
      const oldPoint = prev.find(({ id }) => id === point.id);

      if (oldPoint) {
        return prev.filter(({ id }) => id !== point.id);
      }
      return [...prev, point];
    });
  }, []);

  const searchParams = useSearchParams();

  const sortedPoints = useMemo(() => {
    const categories = searchParams.getAll("category");
    if (categories.length)
      return places.filter(({ category }) => categories.includes(category));
    return places;
  }, [searchParams]);

  const { coords } = useGeolocation();

  const userPosition = useMemo<Point | null>(() => {
    return [51.661328,39.207114]
    // return coords ? [coords.latitude, coords.longitude] : null;
  }, [coords]);

  return (
    <div className="flex h-full overflow-auto">
      <div className="w-[380px] border-r-gray-200 border-r-1 flex flex-col overflow-auto pt-2xl">
        <div className="px-2xl">
          <Input placeholder="Найти город или достопримечательность" isSearch />
          <h2 className="text-sm text-gray-500 mb-lg font-semibold uppercase tracking-wide mt-2xl">
            Категории
          </h2>
          <CategoriesList categories={categories} />
          <div className="mb-2xl">
            <InputRange
              value={range}
              onChange={setRange}
              title="Радиус поиска"
              unitOfMeasurement="м"
              min={0}
              max={15000}
              step={500}
            />
          </div>
          <h2 className="text-sm text-gray-500 mb-lg font-semibold uppercase tracking-wide">
            Популярные места
          </h2>
        </div>
        <div className="flex-1 overflow-auto px-2xl pb-2xl">
          <PopularPlaces
            places={places}
            userPosition={userPosition}
            setHoveredPoint={setHoveredPoint}
            setCenterOnPoint={setCenterOnPoint}
          />
        </div>
      </div>
      <div className="flex-1 bg-gray-200 relative flex">
        {!!choosenPoints.length && (
          <div className="w-[270px] absolute bg-main-bg py-lg left-xs top-xs max-h-[calc(100%_-_8px)] overflow-auto z-1 shadow-md rounded-xl flex flex-col">
            <p className="text-2xl px-lg">Маршрут</p>
            <div className="mt-lg flex-1 overflow-auto px-lg">
              <div
                className="relative pl-md pb-lg leading-none border-primary border-dashed"
                style={{ borderLeftWidth: 2 }}
              >
                <div className="w-md h-md rounded-full bg-primary absolute top-0 left-0 -translate-x-[7px]" />
                <p className="-translate-y-0.5">Мое местоположение</p>
                {!distanceAndDuration[0] && (
                  <div className="flex flex-col gap-xs mt-sm w-[50%]">
                    <div className="h-[18px] bg-gray-300" />
                    <div className="h-[18px] bg-gray-300" />
                  </div>
                )}
                {distanceAndDuration[0] && (
                  <p className="mt-sm text-sm text-secondary-text">
                    ~ {formatDistance(distanceAndDuration[0].distance)} <br />~{" "}
                    {formatTime(distanceAndDuration[0].duration)}
                  </p>
                )}
              </div>
              {choosenPoints.map(({ title, id }, index, arr) => {
                const routeData = distanceAndDuration[index + 1];
                const needShowSkeleton = !routeData && index !== arr.length - 1;

                return (
                  <div
                    className="relative pl-md pb-lg border-dashed leading-none border-primary last:border-transparent"
                    key={id}
                    style={{ borderLeftWidth: 2 }}
                  >
                    <div className="w-md h-md rounded-full bg-primary absolute top-0 left-0 -translate-x-[7px]" />
                    <p className="-translate-y-0.5">{title}</p>
                    {needShowSkeleton && (
                      <div className="flex flex-col gap-xs mt-sm w-[50%]">
                        <div className="h-[18px] bg-gray-300" />
                        <div className="h-[18px] bg-gray-300" />
                      </div>
                    )}
                    {routeData && index !== arr.length - 1 && (
                      <p className="mt-sm text-sm text-secondary-text">
                        ~ {formatDistance(routeData?.distance)} <br />~{" "}
                        {formatTime(routeData?.duration)}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="px-lg">
              <p className="mb-lg">
                Общее время в пути:{" "}
                {formatTime(
                  distanceAndDuration.reduce(
                    (acc, { duration }) => acc + duration,
                    0
                  )
                )}
              </p>
              <Button onClick={() => setChoosenPoints([])} fullWidth>
                Очистить
              </Button>
            </div>
          </div>
        )}
        <YMap userPosition={userPosition}>
          {sortedPoints.map((item) => (
            <Placemark
              key={item.id}
              coords={item.coords}
              onClick={() => handleChangeChoosenPoints(item)}
              balloonContent={ReactDOMServer.renderToString(
                <BalloonContent {...item} />
              )}
              options={{
                iconLayout: "default#image",
                iconImageSize: [30, 37],
                iconImageHref:
                  choosenPoints.find(({ id }) => item.id === id) ||
                  hoveredPoint === item.id
                    ? MarkerSelected.src
                    : Marker.src,
                iconImageOffset: [-15, -35],
                balloonCloseButton: false,
                openBalloonOnClick: false,
                balloonPanelMaxMapArea: 0,
              }}
              panToPoint={centerOnPoint === item.id}
              openBaloon={hoveredPoint === item.id || centerOnPoint === item.id}
            />
          ))}
          <RouteBuilder
            searchRadius={range[0]}
            coords={
              userPosition
                ? [userPosition, ...choosenPoints.map(({ coords }) => coords)]
                : choosenPoints.map(({ coords }) => coords)
            }
            onRouteBuilded={setDistanceAndDuration}
          />
          <SearchRadius searchRadius={range[0]} userPosition={userPosition} />
        </YMap>
      </div>
    </div>
  );
};

