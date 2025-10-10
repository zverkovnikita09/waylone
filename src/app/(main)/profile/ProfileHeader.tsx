import { Button } from "@/shared/ui/Button";

export const ProfileHeader = () => {
  return (
    <div className="bg-main-bg transition-all duration-base shadow-md p-2xl rounded-2xl flex gap-2xl items-center">
      <div className="text-5xl w-[120px] h-[120px] bg-[linear-gradient(135deg,#6366f1_0%,#f59e0b_100%)] text-white rounded-full font-semibold grid place-content-center">
        НЗ
      </div>
      <div>
        <p className="text-2xl font-bold">Никита Зверков</p>
        <p className="text-secondary-text">nikitazverkov@example.ru</p>
        <div className="flex mt-lg gap-2xl">
          <div>
            <p className="text-primary-500 text-2xl font-semibold">47</p>
            <p className="text-secondary-text text-sm">Посещено мест</p>
          </div>
          <div>
            <p className="text-primary-500 text-2xl font-semibold">12</p>
            <p className="text-secondary-text text-sm">Городов</p>
          </div>
          <div>
            <p className="text-primary-500 text-2xl font-semibold">238</p>
            <p className="text-secondary-text text-sm">Км пройдено</p>
          </div>
        </div>
      </div>
      <div className="flex gap-lg ml-auto">
        <Button>Редактировать</Button>
        <Button variant="secondary">Поделиться</Button>
      </div>
    </div>
  );
};

