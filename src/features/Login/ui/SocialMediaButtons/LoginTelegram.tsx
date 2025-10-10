import { FaTelegramPlane } from "react-icons/fa";

export const LoginTelegram = () => {
  return (
    <button
      type="button"
      onClick={() => {}}
      className="cursor-pointer flex gap-md p-md border-1 justify-center text-xl rounded-lg font-medium transition-all duration-base text-[#0088cc] border-[#0088cc] relative overflow-hidden group hover:text-white"
    >
      <div className="absolute top-0 left-0 w-full bg-[#0088cc] h-full transition-all duration-base transform scale-x-0 origin-left group-hover:scale-x-100" />
      <div className="relative z-0 flex gap-md items-center">
        <FaTelegramPlane />
        <span className="text-sm">Войти через Telegram</span>
      </div>
    </button>
  );
};

