import { Button } from "@/shared/ui/Button";
import { RouteCategories } from "./RouteCategories";

const ROUTE_CATEGORIES = [
  { title: "Популярные", icon: "" },
  { title: "На выходные", icon: "" },
  { title: "Для семьи", icon: "" },
  { title: "Активный отдых", icon: "" },
  { title: "История и культура", icon: "" },
  { title: "Гастрономические", icon: "" },
  { title: "Бюджетные", icon: "" },
];

export default function Routes() {
  return (
    <div>
      <div className="bg-[linear-gradient(135deg,#0ea5e9_0%,#6366f1_100%)] px-3xl py-[60px] text-white text-center">
        <h1 className="my-xl text-5xl font-bold">Готовые маршруты по России</h1>
        <p className="mb-2xl opacity-90 text-xl">
          Исследуйте страну с проверенными маршрутами от местных экспертов и
          опытных путешественников
        </p>
        <div className="flex gap-lg justify-center">
          <Button>Найти маршрут</Button>
          <Button>Создать свой</Button>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto w-full py-2xl px-xl">
        <div className="grid grid-cols-4 gap-lg mt-lg">
          <div className="bg-main-bg transition-all duration-base rounded-lg p-xl text-center shadow-md">
            <p className="text-primary font-bold mb-xs text-3xl">3456</p>
            <p className="text-secondary-text text-sm">Готовых маршрутов</p>
          </div>

          <div className="bg-main-bg rounded-lg p-xl text-center transition-all duration-base shadow-md">
            <p className="text-primary font-bold mb-xs text-3xl">189</p>
            <p className="text-secondary-text text-sm">Городов</p>
          </div>

          <div className="bg-main-bg rounded-lg p-xl text-center shadow-md transition-all duration-base">
            <p className="text-primary font-bold mb-xs text-3xl">45 тыс.+</p>
            <p className="text-secondary-text text-sm">Путешественников</p>
          </div>

          <div className="bg-main-bg rounded-lg p-xl text-center shadow-md transition-all duration-base">
            <p className="text-primary font-bold mb-xs text-3xl">4.8</p>
            <p className="text-secondary-text text-sm">Средний рейтинг</p>
          </div>
        </div>

        <RouteCategories categories={ROUTE_CATEGORIES} />

        <div className="w-full mt-2xl bg-main-bg transition-all duration-base shadow-md rounded-3xl flex overflow-hidden">
          <div className="w-full p-2xl">
            <p className="mb-lg font-bold text-3xl">
              Золотое кольцо России за 7 дней
            </p>
            <p>
              Классический маршрут по древним городам России. Посетите Сергиев
              Посад, Переславль-Залесский, Ростов, Ярославль, Кострому, Иваново,
              Суздаль и Владимир.
            </p>
            <div className="mb-2xl"></div>
            <Button>Подробнее о маршруте</Button>
          </div>
          <div className="bg-[linear-gradient(135deg,#667eea,#764ba2)] w-full max-w[540px]"></div>
        </div>
      </div>
    </div>
  );
}

