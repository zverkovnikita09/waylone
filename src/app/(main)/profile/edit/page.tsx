import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";

export const metadata = {
  title: "Редактирование профиля",
};

export default function Page() {
  return (
    <div className="max-w-[1200px] mx-auto w-full py-2xl px-xl">
      <Card className="rounded-2xl flex gap-2xl items-center">
        <div className="text-5xl w-[120px] h-[120px] bg-[linear-gradient(135deg,#6366f1_0%,#f59e0b_100%)] text-white rounded-full font-semibold grid place-content-center">
          НЗ
        </div>
        <div>
          <p className="text-2xl font-bold">Никита Зверков</p>
          <p className="text-secondary-text">nikitazverkov@example.ru</p>
        </div>
        <div className="flex gap-lg ml-auto">
          <Button>Сохранить</Button>
          <Button variant="secondary">Отменить</Button>
        </div>
      </Card>
      {/* <Card>
        <h2 className="font-bold text-xl">Фото профиля</h2>
        <div className="flex mt-lg items-center gap-xl">
          <div className="text-5xl w-[120px] h-[120px] bg-[linear-gradient(135deg,#6366f1_0%,#f59e0b_100%)] text-white rounded-full font-semibold grid place-content-center">
            НЗ
          </div>
          <div className="flex flex-col gap-md">
            <Button>Загрузить фото</Button>
            <Button variant="secondary" fullWidth>
              Удалить
            </Button>
          </div>
        </div>
      </Card>
      <Card>
        <h2 className="font-bold text-xl">Основная информация</h2>
      </Card>
      <Card>
        <h2 className="font-bold text-xl">Социальные сети</h2>
      </Card>
      <div className="flex gap-lg mt-lg justify-end">
        <Button variant="secondary"></Button>
        <Button></Button>
      </div> */}
    </div>
  );
}

