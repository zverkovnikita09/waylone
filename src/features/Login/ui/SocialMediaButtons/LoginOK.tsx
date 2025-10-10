import { FaOdnoklassniki } from "react-icons/fa";

export const LoginOK = () => {
  return (
    <button
      type="button"
      onClick={() => {}}
      className="cursor-pointer flex gap-md p-md border-1 justify-center text-xl rounded-lg font-medium transition-all duration-base text-[#ee8208] border-[#ee8208] relative overflow-hidden group hover:text-white"
    >
      <div className="absolute top-0 left-0 w-full bg-[#ee8208] h-full transition-all duration-base transform scale-x-0 origin-left group-hover:scale-x-100" />
      <div className="relative z-0 flex gap-md items-center">
        <FaOdnoklassniki />
        <span className="text-sm">Войти через Одноклассники</span>
      </div>
    </button>
  );
};

