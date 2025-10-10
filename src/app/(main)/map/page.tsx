"use client";
import { CategoriesList } from "./CategoriesList";
import { MdOutlineMuseum, MdOutlineTheaters } from "react-icons/md";
import { PiPark, PiChurch } from "react-icons/pi";
import { TbBuildingMonument } from "react-icons/tb";
import { GiGreekTemple } from "react-icons/gi";
import { PopularPlaces } from "./PopularPlaces";
import { Input } from "@/shared/ui/Input";
import { YMap } from "@/shared/ui/YandexMap";
import { InputRange } from "@/shared/ui/InputRange";
import { useState } from "react";
import { radiusToZoom } from "@/shared/lib/radiusToZoom";

const categories = [
  { title: "Музеи", link: "", icon: <MdOutlineMuseum /> },
  { title: "Парки", link: "", icon: <PiPark /> },
  { title: "Храмы", link: "", icon: <PiChurch /> },
  { title: "Памятники", link: "", icon: <TbBuildingMonument /> },
  { title: "Театры", link: "", icon: <MdOutlineTheaters /> },
  { title: "Кремли", link: "", icon: <GiGreekTemple /> },
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

export default function Home() {
  const [range, setRange] = useState([10]);
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
        <YMap zoom={radiusToZoom(range[0])} />
      </div>
    </div>
  );
}

