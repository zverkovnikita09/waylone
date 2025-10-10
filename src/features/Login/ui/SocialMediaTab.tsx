import { LoginVK } from "./SocialMediaButtons/LoginVK";
import { LoginOK } from "./SocialMediaButtons/LoginOK";
import { LoginMailRu } from "./SocialMediaButtons/LoginMailRu";
import { LoginYandex } from "./SocialMediaButtons/LoginYandex";
import { LoginTelegram } from "./SocialMediaButtons/LoginTelegram";

export const SocialMediaTab = () => {
  return (
    <div className="flex flex-col gap-md">
      <LoginVK />
      <LoginOK />
      <LoginYandex />
      <LoginTelegram />
      <LoginMailRu />
    </div>
  );
};

