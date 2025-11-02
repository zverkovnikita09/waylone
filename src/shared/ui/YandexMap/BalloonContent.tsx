import { Place } from "@/app/api/places/route";
import { Button } from "../Button";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

interface BalloonComponentProps
  extends Pick<Place, "description" | "images" | "title" | "rating" | "id"> {}

export const BalloonContent = ({
  description,
  id,
  images,
  rating,
  title,
}: BalloonComponentProps) => {
  return (
    <div className="">
      <p className="text-md font-semibold mb-sm leading-none">{title}</p>
      <div className="flex items-center gap-xs text-accent-300">
        <span className="text-xs font-medium text-secondary-text mr-auto">
          50 оценок
        </span>
        <FaStar size={15} />
        <span className="text-md font-medium text-gray-700">
          {rating.toFixed(1)}
        </span>
      </div>
      <img src={images[0]} width="100%" className="my-md" />
      <p className="mb-md text-sm">{description}</p>
      <Link href={`/places/${id}`}>
        <Button fullWidth>Подробнее</Button>
      </Link>
    </div>
  );
};

