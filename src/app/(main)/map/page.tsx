"use client";
import { CategoriesList } from "./CategoriesList";
import { MdOutlineMuseum, MdOutlineTheaters } from "react-icons/md";
import { PiPark, PiChurch } from "react-icons/pi";
import { TbBuildingMonument } from "react-icons/tb";
import { GiGreekTemple } from "react-icons/gi";
import { PopularPlaces } from "./PopularPlaces";
import { Input } from "@/shared/ui/Input";
import { Placemark, YMap } from "@/shared/ui/YandexMap";
import { InputRange } from "@/shared/ui/InputRange";
import { useCallback, useMemo, useState } from "react";
import { radiusToZoom } from "@/shared/lib/radiusToZoom";
import { Button } from "@/shared/ui/Button";
import { formatDistance, formatTime } from "@/shared/lib/convert";
import Marker from "./Marker.png";
import MarkerSelected from "./MarkerSelected.png";
import { useSearchParams } from "next/navigation";

type Categories =
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

const popular = [
  {
    title: "Красная площадь",
    city: "Москва",
    distance: "2.3км",
    icon: <TbBuildingMonument />,
  },
  {
    title: "Эрмитаж",
    city: "Санкт-Петербург",
    distance: "634м",
    icon: <MdOutlineMuseum />,
  },
  {
    title: "Красная площадь",
    city: "Москва",
    distance: "2.3км",
    icon: <TbBuildingMonument />,
  },
  {
    title: "Эрмитаж",
    city: "Санкт-Петербург",
    distance: "634м",
    icon: <MdOutlineMuseum />,
  },
  {
    title: "Красная площадь",
    city: "Москва",
    distance: "2.3км",
    icon: <TbBuildingMonument />,
  },
  {
    title: "Эрмитаж",
    city: "Санкт-Петербург",
    distance: "634м",
    icon: <MdOutlineMuseum />,
  },
];

interface Place {
  coords: [number, number];
  title: string;
  id: number;
  category: Categories;
}

const POINTS: Place[] = [
  {
    coords: [55.751244, 37.618423],
    title: "Театр",
    id: 1,
    category: "theatre",
  },
  { coords: [55.733834, 37.58881], title: "Музей", id: 2, category: "museum" },
  {
    coords: [55.691029, 37.529857],
    title: "Кремль",
    id: 3,
    category: "cremlin",
  },
  {
    coords: [55.774838, 37.632664],
    title: "Кофейня",
    id: 4,
    category: "park",
  },
  {
    coords: [55.798551, 37.537859],
    title: "Парк",
    id: 5,
    category: "park",
  },
];

export default function Home() {
  const [range, setRange] = useState([10]);
  const [choosenPoints, setChoosenPoints] = useState<Place[]>([]);
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
      return POINTS.filter(({ category }) => categories.includes(category));
    return POINTS;
  }, [searchParams]);

  return (
    <div className="flex h-full overflow-auto">
      <div className="w-[380px] border-r-gray-200 border-r-1 flex flex-col overflow-auto pt-2xl">
        <div className="px-2xl">
          <Input placeholder="Найти город или достопримечательность" />
          <h2 className="text-sm text-gray-500 mb-lg font-semibold uppercase tracking-wide mt-2xl">
            Категории
          </h2>
          <CategoriesList categories={categories} />
          <div className="mb-2xl">
            <InputRange
              value={range}
              onChange={setRange}
              title="Радиус поиска"
              unitOfMeasurement="км"
              min={1}
              max={50}
            />
          </div>
          <h2 className="text-sm text-gray-500 mb-lg font-semibold uppercase tracking-wide">
            Популярные места
          </h2>
        </div>
        <div className="flex-1 overflow-auto px-2xl pb-2xl">
          <PopularPlaces places={popular} />
        </div>
      </div>
      <div className="flex-1 bg-gray-200 relative flex">
        {!!choosenPoints.length && (
          <div className="w-[270px] absolute bg-main-bg p-lg left-xs top-xs z-1 shadow-md rounded-xl">
            <p className="text-2xl">Маршрут</p>
            <div className="mt-lg">
              {/* <div
                className="relative pl-md pb-lg leading-none border-primary border-dashed"
                style={{ borderLeftWidth: 2 }}
              >
                <div className="w-md h-md rounded-full bg-primary absolute top-0 left-0 -translate-x-[7px]" />
                <p className="-translate-y-0.5">Мое местоположение</p>
              </div> */}
              {choosenPoints.map(({ title, id }, index, arr) => {
                const routeData = distanceAndDuration[index];
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
        )}
        <YMap
          zoom={radiusToZoom(range[0])}
          choosenPoints={choosenPoints.map(({ coords }) => coords)}
          handleSetDistanceAndDuration={setDistanceAndDuration}
        >
          {sortedPoints.map((item) => (
            <Placemark
              key={item.id}
              coords={item.coords}
              onClick={() => handleChangeChoosenPoints(item)}
              options={{
                iconLayout: "default#image",
                iconImageSize: [30, 37],
                iconImageHref: choosenPoints.find(({ id }) => item.id === id)
                  ? MarkerSelected.src
                  : Marker.src,
                iconImageOffset: [-15, -35],
              }}
            />
          ))}
        </YMap>
      </div>
    </div>
  );
}

