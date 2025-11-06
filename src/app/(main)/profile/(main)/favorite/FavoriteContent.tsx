"use client";
import { Place } from "@/app/api/places/types";
import { Tab, Tabs } from "@/shared/ui/Tabs";
import { PlaceCard } from "@/widgets/PlaceCard";

interface FavoriteContentProps {
  data: Place[];
}

export const FavoriteContent = ({ data }: FavoriteContentProps) => {
  return (
    <Tabs>
      <Tab
        title="Места"
        content={
          <div className="grid mt-lg grid-cols-2 gap-lg mb-2xl">
            {data.map((place) => (
              <PlaceCard
                key={place.id}
                {...place}
                short
                visited_at="01.01.2025"
              />
            ))}
          </div>
        }
      />
      <Tab
        title="Маршруты"
        content={
          <div className="grid mt-lg grid-cols-2 gap-lg mb-2xl">
            {data.map((place) => (
              <PlaceCard
                key={place.id}
                {...place}
                short
                visited_at="01.01.2025"
              />
            ))}
          </div>
        }
      />
      <Tab
        title="События"
        content={
          <div className="grid mt-lg grid-cols-2 gap-lg mb-2xl">
            {data.map((place) => (
              <PlaceCard
                key={place.id}
                {...place}
                short
                visited_at="01.01.2025"
              />
            ))}
          </div>
        }
      />
    </Tabs>
  );
};

