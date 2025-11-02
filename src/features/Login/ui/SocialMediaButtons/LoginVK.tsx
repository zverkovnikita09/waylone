import { RiVkFill } from "react-icons/ri";
import {useRouter} from "next/navigation";
import { useState, useEffect } from "react";

export const LoginVK = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // слушаем сообщения от popup
    const handleMessage = (event: MessageEvent) => {
      // ограничим только нашим доменом, если хочешь строго
      if (event.origin !== window.location.origin) return;

      if (event.data === "vk-auth-success") {
        setLoading(false);
        // обновляем страницу, чтобы подхватить новую cookie
        window.location.reload();
      }
      if (event.data === "vk-auth-failed") {
        setLoading(false);
        alert("Ошибка авторизации через VK");
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

    const handleVKLogin = () => {
    setLoading(true);
    const width = 600, height = 700;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    window.open(
        "/api/oauth/vk/auth",
        "vkLogin",
        `width=${width},height=${height},left=${left},top=${top},noopener,noreferrer`
    );
  };

  return (
    <button
      type="button"
      onClick={handleVKLogin}
      className="cursor-pointer flex gap-md p-md border-1 justify-center text-2xl rounded-lg font-medium transition-all duration-base text-[#4680C2] border-[#4680C2] relative overflow-hidden group hover:text-white"
    >
      <div className="absolute top-0 left-0 w-full bg-[#4680C2] h-full transition-all duration-base transform scale-x-0 origin-left group-hover:scale-x-100" />
      <div className="relative z-0 flex gap-md items-center">
        <RiVkFill />
        <span className="text-sm">{loading ? "Ожидание VK..." : "Войти через ВКонтакте"}</span>
      </div>
    </button>
  );
};
