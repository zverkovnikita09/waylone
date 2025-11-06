import { Place } from "@/app/api/places/types";
import { PlaceCard } from "@/widgets/PlaceCard";

export const metadata = {
  title: "Мои места",
};

export default async function Places() {
  const data: Place[] = await fetch("http://localhost:3000/api/places", {
    cache: "no-cache",
  }).then((res) => res.json());
  return (
    <div className="flex flex-col min-h-full">
      <p className="text-xl font-semibold">Мои места</p>
      <div className="grid mt-lg grid-cols-2 gap-lg mb-2xl">
        {data.map((place) => (
          <PlaceCard key={place.id} {...place} short visited_at="01.01.2025" />
        ))}
      </div>
    </div>
  );
}

