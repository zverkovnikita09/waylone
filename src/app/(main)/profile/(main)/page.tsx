import { FaStar } from "react-icons/fa";
import { MdOutlineMuseum } from "react-icons/md";
import { TbBuildingMonument } from "react-icons/tb";

export const metadata = {
  title: "Профиль",
};

export default function Profile() {
  return (
    <div>
      <p className="text-xl font-semibold">Недавно посещенные места</p>
      <div className="grid mt-lg grid-cols-2 gap-lg mb-2xl">
        <div className="transition-all duration-base border-1 rounded-lg border-gray-200 cursor-pointer overflow-hidden hover:-translate-y-xs hover:shadow-md">
          <div className="w-full h-[150px] bg-[linear-gradient(135deg,#667eea,#764ba2)] grid place-content-center text-white text-5xl">
            <TbBuildingMonument />
          </div>
          <div className="p-lg">
            <p className="font-semibold">Красная площадь</p>
            <div className="flex justify-between mt-xs">
              <p className="text-secondary-text text-xs">
                Москва • 3 дня назад
              </p>
              <div className="flex gap-xs items-center text-warning text-xs">
                <FaStar />
                5.0
              </div>
            </div>
          </div>
        </div>

        <div className="transition-all duration-base border-1 rounded-lg border-gray-200 cursor-pointer overflow-hidden hover:-translate-y-xs hover:shadow-md">
          <div className="w-full h-[150px] bg-[linear-gradient(135deg,#667eea,#764ba2)] grid place-content-center text-white text-5xl">
            <MdOutlineMuseum />
          </div>
          <div className="p-lg">
            <p className="font-semibold">Эрмитаж</p>
            <div className="flex justify-between mt-xs">
              <p className="text-secondary-text text-xs">
                Санкт-Петербург • 2 дня назад
              </p>
              <div className="flex gap-xs items-center text-warning text-xs">
                <FaStar />
                4.0
              </div>
            </div>
          </div>
        </div>

        <div className="transition-all duration-base border-1 rounded-lg border-gray-200 cursor-pointer overflow-hidden hover:-translate-y-xs hover:shadow-md">
          <div className="w-full h-[150px] bg-[linear-gradient(135deg,#667eea,#764ba2)] grid place-content-center text-white text-5xl">
            <TbBuildingMonument />
          </div>
          <div className="p-lg">
            <p className="font-semibold">Красная площадь</p>
            <div className="flex justify-between mt-xs">
              <p className="text-secondary-text text-xs">
                Москва • 3 дня назад
              </p>
              <div className="flex gap-xs items-center text-warning text-xs">
                <FaStar />
                5.0
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-xl font-semibold">Ваша статистика</p>
      <div className="grid grid-cols-3 gap-lg mt-lg">
        <div className="bg-gray-200 rounded-lg p-xl text-center">
          <p className="text-primary font-bold mb-xs text-3xl">47</p>
          <p className="text-secondary-text text-sm">Мест посещено</p>
        </div>

        <div className="bg-gray-200 rounded-lg p-xl text-center">
          <p className="text-primary font-bold mb-xs text-3xl">23</p>
          <p className="text-secondary-text text-sm">Маршрутов пройдено</p>
        </div>

        <div className="bg-gray-200 rounded-lg p-xl text-center">
          <p className="text-primary font-bold mb-xs text-3xl">156</p>
          <p className="text-secondary-text text-sm">Фото загружено</p>
        </div>

        <div className="bg-gray-200 rounded-lg p-xl text-center">
          <p className="text-primary font-bold mb-xs text-3xl">89</p>
          <p className="text-secondary-text text-sm">Отзывов написано</p>
        </div>
      </div>
    </div>
  );
}

