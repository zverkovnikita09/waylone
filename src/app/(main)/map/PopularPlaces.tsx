"use client";

interface PopularPlacesProps {
  places: {
    title: string;
    city: string;
    distance: string;
    icon: JSX.Element;
  }[];
}

export const PopularPlaces = ({ places }: PopularPlacesProps) => {
  return (
    <div className="flex flex-col gap-md">
      {places.map(({ city, distance, title, icon }, i) => (
        <div
          className="flex p-lg items-start gap-lg border-1 border-gray-200 rounded-lg cursor-pointer transition-all duration-base hover:border-primary-500 hover:shadow-md hover:translate-x-xs"
          key={i}
        >
          <div className="w-[60px] h-[60px] bg-primary-500 rounded-lg grid place-content-center text-white text-3xl">
            {icon}
          </div>
          <div>
            <p className="mb-xs font-semibold">{title}</p>
            <p className="text-gray-500 text-xs">
              {city} • {distance} от вас
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

