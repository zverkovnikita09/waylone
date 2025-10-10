import { RiVkFill } from "react-icons/ri";

export const LoginVK = () => {
  return (
    <button
      type="button"
      onClick={() => {}}
      className="cursor-pointer flex gap-md p-md border-1 justify-center text-2xl rounded-lg font-medium transition-all duration-base text-[#4680C2] border-[#4680C2] relative overflow-hidden group hover:text-white"
    >
      <div className="absolute top-0 left-0 w-full bg-[#4680C2] h-full transition-all duration-base transform scale-x-0 origin-left group-hover:scale-x-100" />
      <div className="relative z-0 flex gap-md items-center">
        <RiVkFill />
        <span className="text-sm">Войти через ВКонтакте</span>
      </div>
    </button>
  );
};

