import { Place } from "@/app/api/places/types";
import { Card } from "@/shared/ui/Card";
import { Button } from "@/shared/ui/Button";
import Link from "next/link";
import { PlaceSlider } from "./PlaceSlider";
import { PlaceCard } from "@/widgets/PlaceCard";
import { InfoBlock } from "./InfoBlock";
import { FaPhoneAlt } from "react-icons/fa";
import { PiGlobe } from "react-icons/pi";
import { IoIosMail } from "react-icons/io";
import { LuClock4 } from "react-icons/lu";
import { PiMoneyWavy } from "react-icons/pi";
import { LiaSubwaySolid } from "react-icons/lia";

type PlaceProps = {
  params: Promise<{ id: string }>;
};

const DATA: Place = {
  coords: [51.676, 39.183],
  title: "Благовещенский кафедральный собор",
  id: 1,
  category: "church",
  description:
    "Один из крупнейших православных храмов в России, открыт в 2009 году, высота около 97 м.",
  images: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIqin-RVc7JEzu3mtG9_K6XCnw17CnxEzDQg&s",
    "https://sobor-vrn.ru/upload/iblock/117/1174546bdac0f763fba1239380013af6.jpg",
    "https://postmania.ru//files/products/0625-a.800x600.jpg",
    "https://riavrn.ru/i/67/671aede83cf4c91544ea8a99ca37d501.jpg",
  ],
  rating: 4.8,
  address: "Воронеж",
};

export default async function PlacePage({ params }: PlaceProps) {
  const { id } = await params;
  const data: Place[] = await fetch("http://localhost:3000/api/places", {
    cache: "no-cache",
  }).then((res) => res.json());

  return (
    <div className="max-w-[1360px] mx-auto py-2xl">
      <PlaceSlider images={DATA.images} />
      <div className="mt-2xl grid grid-cols-[2fr_1fr] gap-2xl">
        <div className="flex flex-col gap-2xl">
          <Card>
            <div className="flex justify-between">
              <h1 className="text-4xl font-bold">{DATA.title}</h1>
            </div>
            <div className="mt-md"></div>
            <div className="mt-lg py-lg flex gap-lg border-y-1 border-gray-200"></div>
          </Card>
          <Card>
            <h2 className="text-2xl font-bold">О месте</h2>
            <p className="text-secondary-text mt-lg">{DATA.description}</p>
            <h2 className="text-2xl font-bold mt-lg">История</h2>
            <p className="text-secondary-text mt-lg">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Molestiae, officia! Accusantium enim quos cum quaerat placeat
              nesciunt. Dolore assumenda sapiente neque omnis, non ea laboriosam
              porro, eaque sed asperiores soluta iusto sit, vitae nulla
              similique totam aliquid consequatur quaerat. Hic in iusto
              accusantium molestias ipsam quas quam quisquam vitae at libero,
              ratione quae maiores mollitia cumque eligendi cupiditate.
              Excepturi perspiciatis sunt, iste accusantium eum optio eveniet
              voluptatum culpa cupiditate, perferendis neque ipsum, quis aliquam
              expedita rerum adipisci veniam labore a veritatis fugit tempora.
              Architecto commodi dicta laborum voluptates, amet tempore rem
              iusto vel officia deleniti minus id accusantium laboriosam
              provident?
            </p>
          </Card>
          <Card>
            <h2 className="text-2xl font-bold">Детали посещения</h2>
            <div className="grid grid-cols-3 gap-lg mt-lg">
              <div className="flex flex-col">
                <h3 className="text-secondary-text text-sm">Время посещения</h3>
                <p className="text-lg font-semibold">2-3 часа</p>
              </div>
              <div className="flex flex-col">
                <h3 className="text-secondary-text text-sm">Стоимость</h3>
                <p className="text-lg font-semibold">500р взрослый</p>
              </div>
              <div className="flex flex-col">
                <h3 className="text-secondary-text text-sm">Режим работы</h3>
                <p className="text-lg font-semibold">10:00 - 18:00</p>
              </div>
              <div className="flex flex-col">
                <h3 className="text-secondary-text text-sm">Выходной</h3>
                <p className="text-lg font-semibold">Четверг</p>
              </div>
              <div className="flex flex-col">
                <h3 className="text-secondary-text text-sm">Доступность</h3>
                <p className="text-lg font-semibold">Частично</p>
              </div>
              <div className="flex flex-col">
                <h3 className="text-secondary-text text-sm">Фотосъёмка</h3>
                <p className="text-lg font-semibold">Разрешена</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold">Отзывы посетителей</h2>
              <Button>Оставить отзыв</Button>
            </div>
          </Card>
          <Card>
            <h2 className="text-2xl font-bold">Похожие места рядом</h2>
            <div className="grid grid-cols-3 gap-xl mt-lg">
              {data.slice(0, 4).map((place) => (
                <PlaceCard key={place.id} {...place} short />
              ))}
            </div>
          </Card>
        </div>
        <div className="flex flex-col gap-lg">
          <Card>
            <p className="text-lg font-bold">Быстрая информация</p>
            <div className="flex flex-col gap-md mt-md">
              <InfoBlock title="Время посещения" Icon={<LuClock4 size={20} />}>
                <p className="text-md font-semibold">2-3 часа</p>
              </InfoBlock>
              <InfoBlock title="Входной билет" Icon={<PiMoneyWavy size={20} />}>
                <p className="text-md font-semibold">500Р</p>
              </InfoBlock>
              <InfoBlock title="Сейчас" Icon={<LuClock4 size={20} />}>
                <p className="text-md font-semibold text-green-500">Открыто</p>
              </InfoBlock>
              <InfoBlock
                title="Ближайшее метро"
                Icon={<LiaSubwaySolid size={22} />}
              >
                <p className="text-md font-semibold">Охотный ряд</p>
              </InfoBlock>
            </div>
          </Card>
          <Card>
            <div className="flex flex-col gap-md">
              <Button size="lg">Купить билет</Button>
              <Button size="lg" variant="outline-primary">
                Добавить в маршрут
              </Button>
              <Button size="lg" variant="outline-primary">
                Запланировать визит
              </Button>
            </div>
          </Card>
          <div className="shadow-md rounded-2xl h-[300px] bg-main-bg relative overflow-hidden bg-[linear-gradient(135deg,_#667eea_0%,_#764ba2_100%)]">
            <Link
              href="/map"
              className="flex flex-col bg-[linear-gradient(180deg,_transparent,_rgba(0,0,0,0.7))] absolute bottom-0 z-0 left-0 right-0 text-white p-xl text-sm"
            >
              <p className="font-semibold">Красная площадь, 1</p>
              <p>Нажмите, чтобы открыть в картах</p>
            </Link>
          </div>
          <Card>
            <p className="text-lg font-bold">Контакты</p>
            <div className="flex flex-col gap-md mt-md">
              <InfoBlock title="Телефон" Icon={<FaPhoneAlt size={15} />}>
                <Link href={""} className="text-md font-bold leading-none">
                  +7 (495) 695-41-46
                </Link>
              </InfoBlock>
              <InfoBlock title="Сайт" Icon={<PiGlobe size={20} />}>
                <Link href={""} className="text-md text-primary font-semibold">
                  kreml.ru
                </Link>
              </InfoBlock>
              <InfoBlock title="Email" Icon={<IoIosMail size={20} />}>
                <Link href={""} className="text-md font-semibold">
                  info@kreml.ru
                </Link>
              </InfoBlock>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
