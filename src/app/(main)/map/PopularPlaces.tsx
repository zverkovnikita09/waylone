"use client";

import { MdOutlineMuseum } from "react-icons/md";
import { Place } from "@/app/api/places/types";
import { getDistanceInKm, Point } from "@/shared/lib/mapUtils";

interface PopularPlacesProps {
  places: Place[];
  userPosition: Point | null;
  setHoveredPoint: (pointId: number | null) => void;
  setCenterOnPoint: (pointId: number) => void;
}

export const PopularPlaces = ({
  places,
  userPosition,
  setHoveredPoint,
  setCenterOnPoint,
}: PopularPlacesProps) => {
  return (
    <div className="flex flex-col gap-md">
      {places.map(({ title, coords, id }) => (
        <div
          className="flex p-lg items-start gap-lg border-1 border-gray-200 rounded-lg cursor-pointer transition-all duration-base hover:border-primary-500 hover:shadow-md hover:translate-x-xs"
          key={id}
          onMouseEnter={() => setHoveredPoint(id)}
          onMouseLeave={() => setHoveredPoint(null)}
          onClick={() => setCenterOnPoint(id)}
        >
          <div className="w-[60px] h-[60px] bg-primary-500 rounded-lg grid place-content-center text-white text-3xl shrink-0">
            <MdOutlineMuseum />
          </div>
          <div>
            <p className="mb-xs font-semibold">{title}</p>
            {userPosition && (
              <p className="text-gray-500 text-xs">
                Москва •{" "}
                <span className="font-bold">
                  {getDistanceInKm(userPosition, coords).toFixed(2)} км{" "}
                </span>
                от вас
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

