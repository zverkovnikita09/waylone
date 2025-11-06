import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { SettingAction } from "./SettingsAction";

export const metadata = {
  title: "Настройки профиля",
};

export default function Settings() {
  return (
    <div className="flex flex-col min-h-full">
      <p className="text-xl font-semibold">Уведомления</p>
      <SettingAction
        description="Получать письма о новых событиях"
        title="Email уведомления"
        type="switch"
        noBorder
      />
      <SettingAction
        description="Мгновенные уведомления в браузере"
        title="Push уведомления"
        type="switch"
      />
      <SettingAction
        description="Уведомления о новых местах в вашем городе"
        title="Новые места рядом"
        type="switch"
      />
      <SettingAction
        description="Персональные рекомендации маршрутов"
        title="Новые маршруты"
        type="switch"
      />
      <SettingAction
        description="Уведомления о новых достижениях"
        title="Достижения"
        type="switch"
      />
      <SettingAction
        description="Информация о скидках и специальных предложениях"
        title="Новости и акции"
        type="switch"
      />
      <p className="text-xl font-semibold mt-lg">Приватность</p>
      <SettingAction
        description="Другие пользователи смогут видеть ваш профиль"
        title="Публичный профиль"
        type="switch"
        noBorder
      />
      <SettingAction
        description="Отображать ваши посещения и маршруты"
        title="Показывать активность"
        type="switch"
      />
      <SettingAction
        description="Использовать ваше местоположение для рекомендаций"
        title="Геолокация"
        type="switch"
      />
      <SettingAction
        description="Помогать улучшать сервис анонимными данными"
        title="Анонимная статистика"
        type="switch"
      />
      <p className="text-xl font-semibold mt-lg">Предпочтения</p>
      <p className="text-xl font-semibold mt-lg">Безопасность</p>
      <div className="flex flex-col gap-sm mt-md">
        <Input title="Текущий пароль" inputSize="sm" />
        <Input title="Новый пароль" inputSize="sm" />
        <Input title="Подтвердите пароль" inputSize="sm" />
      </div>
      <div className="flex justify-between mt-lg py-lg border-t-1 border-gray-200">
        <div>
          <p className="font-medium">Удалить аккаунт</p>
          <p className="text-secondary-text text-sm">
            Навсегда удалить ваш аккаунт и все данные
          </p>
        </div>
        <Button variant="danger">Удалить</Button>
      </div>

      {/* <div className="flex gap-lg mt-auto justify-end">
        <Button variant="secondary">Отменить</Button>
        <Button>Сохранить</Button>
      </div> */}
    </div>
  );
}

