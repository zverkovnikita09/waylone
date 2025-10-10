import { FaYandex } from "react-icons/fa6";

export const LoginYandex = () => {
  return (
    <button
      type="button"
      onClick={() => {}}
      className="cursor-pointer flex gap-md p-md border-1 justify-center text-xl rounded-lg font-medium transition-all duration-base text-[#fc3f1d] border-[#fc3f1d] relative overflow-hidden group hover:text-white"
    >
      <div className="absolute top-0 left-0 w-full bg-[#fc3f1d] h-full transition-all duration-base transform scale-x-0 origin-left group-hover:scale-x-100" />
      <div className="relative z-0 flex gap-md items-center">
        <FaYandex />
        <span className="text-sm">Войти через Яндекс ID</span>
      </div>
    </button>
  );
};

