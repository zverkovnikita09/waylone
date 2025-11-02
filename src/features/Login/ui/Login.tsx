"use client";
import { Button } from "@/shared/ui/Button";
import { Popup } from "@/shared/ui/Popup";
import Link from "next/link";
import { FaRegMap } from "react-icons/fa";
import { FaRoute } from "react-icons/fa";
import { GoTrophy } from "react-icons/go";
import { SocialMediaTab } from "./SocialMediaTab";
import { PhoneTab } from "@/features/Login/ui/PhoneTab";
import { EmailTab } from "@/features/Login/ui/EmailTab";
import { Tab, Tabs } from "@/shared/ui/Tabs";

interface LoginButtonProps {
  autorization?: any;
}

export const LoginButton = ({ autorization }: LoginButtonProps) => {
  return (
    <Popup TriggerButton={<Button>Войти</Button>}>
      {({ Title }) => (
        <div className="w-[480px] rounded-2xl bg-main-bg overflow-hidden">
          <div className="bg-gradient-to-br from-primary-500 to-accent-500 w-full text-white p-2xl text-center">
            <Title>
              <span className="text-2xl mb-sm font-bold">
                Добро пожаловать!
              </span>
            </Title>
            <p className="text-sm opacity-90">
              Войдите, чтобы сохранять места и строить маршруты
            </p>
          </div>
          <div className="p-2xl">
            <Tabs>
              <Tab title="Соцсети" content={<SocialMediaTab />} />
              <Tab
                title="Email"
                content={
                  <EmailTab
                    isCodeSent={autorization?.autorizationType === "email"}
                    state={autorization?.email}
                  />
                }
              />
              <Tab
                title="Телефон"
                content={
                  <PhoneTab
                    isCodeSent={autorization?.autorizationType === "phone"}
                    state={autorization?.phone}
                  />
                }
              />
            </Tabs>
            <div className="border-t-1 border-gray-100 pt-xl mt-xl grid grid-cols-3">
              <div className="flex flex-col items-center text-center gap-sm text-2xl">
                <FaRegMap />
                <span className="text-gray-500 text-xs">Сохраняйте места</span>
              </div>
              <div className="flex flex-col items-center text-center gap-sm text-2xl">
                <FaRoute />
                <span className="text-gray-500 text-xs">Стройте маршруты</span>
              </div>
              <div className="flex flex-col items-center text-center gap-sm text-2xl">
                <GoTrophy />
                <span className="text-gray-500 text-xs">Получайте награды</span>
              </div>
            </div>
            <div className="text-xs border-t-1 border-gray-100 pt-xl mt-xl text-gray-500 text-center">
              Продолжая, вы соглашаетесь с{" "}
              <Link className="text-primary-500 hover:underline" href={""}>
                условиями использования
              </Link>{" "}
              и{" "}
              <Link href={""} className="text-primary-500 hover:underline">
                политикой конфиденциальности
              </Link>
            </div>
          </div>
        </div>
      )}
    </Popup>
  );
};

