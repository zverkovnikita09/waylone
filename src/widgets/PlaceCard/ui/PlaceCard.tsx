"use client";
import { CATEGORIES, Place } from "@/app/api/places/types";
import { Button } from "@/shared/ui/Button";
import { FavoriteButton } from "@/shared/ui/FavoriteButton";
import Image from "next/image";
import Link from "next/link";
import { LuBadgeRussianRuble } from "react-icons/lu";
import { MdOutlineTimer } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";

interface PlaceCardProps extends Place {
  short?: boolean;
  visited_at?: string;
}

export const PlaceCard = ({
  category: categoryId,
  description,
  images,
  rating,
  title,
  address,
  id,
  short,
  visited_at,
}: PlaceCardProps) => {
  return (
    <Link
      href={`/places/${id}`}
      className="shadow-md overflow-hidden cursor-pointer rounded-xl transition-all duration-base flex-col flex hover:shadow-lg hover:-translate-y-1"
    >
      <div className="bg-[linear-gradient(135deg,#667eea,#764ba2)] h-[180px] relative">
        <Image
          fill
          alt=""
          src={images[0]}
          className="object-cover object-top"
        />
        {!short && (
          <p className="bg-main-bg rounded-2xl text-xs font-semibold top-md left-md absolute text-primary px-md py-sm">
            {CATEGORIES.find(({ category }) => category === categoryId)?.title}
          </p>
        )}
        {!short && (
          <div
            className="absolute top-md right-md"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <FavoriteButton />
          </div>
        )}
      </div>

      <div className="bg-white p-lg flex-1 flex flex-col">
        <p className="text-lg font-semibold">{title}</p>
        <p className="text-secondary-text mt-sm text-sm">{address}</p>
        {!short && (
          <p className="text-secondary-text text-sm mt-sm mb-lg line-clamp-2">
            {description}
          </p>
        )}
        {!!visited_at && (
          <div className="mt-sm flex justify-between items-center">
            <p className="flex items-center gap-xs text-green-500 font-semibold">
              <IoMdDoneAll />
              Посещено
            </p>
            <p className="text-secondary-text text-sm">{visited_at}</p>
          </div>
        )}
        {!short && (
          <div className="border-t-1 border-gray-200 pt-lg mt-auto flex justify-between items-center text-sm">
            <p className="text-secondary-text flex gap-xs items-center">
              <MdOutlineTimer size={18} />2 - 4 часа
            </p>
            <p className="text-secondary-text flex gap-xs items-center">
              <LuBadgeRussianRuble size={18} />
              от 1000₽
            </p>
          </div>
        )}
        <div
          className="border-t-1 border-gray-200 pt-lg mt-lg grid grid-cols-3 text-sm gap-sm"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <Button variant="secondary" size="xs">
            Отзывы
          </Button>
          <Button variant="secondary" size="xs">
            Фото
          </Button>
          <Button variant="secondary" size="xs">
            На карте
          </Button>
        </div>
      </div>
    </Link>
  );
};

