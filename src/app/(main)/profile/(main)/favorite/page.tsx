import { Place } from "@/app/api/places/types";
import { FavoriteContent } from "./FavoriteContent";

export const metadata = {
  title: "Избранное",
};

export default async function Favorite() {
  const data: Place[] = await fetch("http://localhost:3000/api/places", {
    cache: "no-cache",
  }).then((res) => res.json());
  return (
    <div className="flex flex-col min-h-full">
      <h2 className="text-xl font-bold mb-lg">Избранное</h2>
      <FavoriteContent data={data} />
    </div>
  );
}

