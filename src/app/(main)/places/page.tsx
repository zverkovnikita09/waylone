import { Place } from "@/app/api/places/route";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { PlaceCard } from "@/widgets/PlaceCard";

export const metadata = {
  title: "Места",
  description: "Открой лучшие места города",
};

export default async function Places() {
  const data: Place[] = await fetch("http://localhost:3000/api/places", {
    cache: "no-cache",
  }).then((res) => res.json());
  return (
    <div>
      <div className="bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] p-3xl text-white text-center">
        <h1 className="my-xl text-5xl font-bold">Открой лучшие места города</h1>
        <p className="mb-2xl opacity-90 text-xl text-center">
          Тысячи достопримечательностей, скрытых жемчужин и <br />
          популярных мест ждут тебя
        </p>
        <div className="bg-main-bg p-sm rounded-lg flex w-full max-w-[900px] mx-auto shadow-md gap-lg">
          <Input placeholder="Поиск мест, достопримечательностей" />
          <Button>Найти</Button>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto py-2xl">
        <div className="grid grid-cols-4 gap-xl">
          <div className="bg-white shadow-md p-xl flex flex-col items-center justify-center rounded-xl">
            <p className="text-primary text-3xl font-bold mb-xs">2847</p>
            <p className="text-secondary-text text-sm">Всего мест</p>
          </div>

          <div className="bg-white shadow-md p-xl flex flex-col items-center justify-center rounded-xl">
            <p className="text-primary text-3xl font-bold mb-xs">1232</p>
            <p className="text-secondary-text text-sm">Популярных</p>
          </div>

          <div className="bg-white shadow-md p-xl flex flex-col items-center justify-center rounded-xl">
            <p className="text-primary text-3xl font-bold mb-xs">156</p>
            <p className="text-secondary-text text-sm">Категорий</p>
          </div>

          <div className="bg-white shadow-md p-xl flex flex-col items-center justify-center rounded-xl">
            <p className="text-primary text-3xl font-bold mb-xs">4.8</p>
            <p className="text-secondary-text text-sm">Средний рейтинг</p>
          </div>
        </div>
        <div className="mt-2xl">
          <div className="flex justify-between">
            <h2 className="font-bold text-2xl">Все места</h2>
            {/*<Link href={"/"} className="text-primary">*/}
            {/*  Все маршруты*/}
            {/*</Link>*/}
          </div>
          <div className="grid grid-cols-4 gap-xl mt-xl">
            {data.map((place) => (
              <PlaceCard key={place.id} {...place} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

