import { InputHTMLAttributes } from "react";
import { CiSearch } from "react-icons/ci";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = ({ ...props }: InputProps) => {
  return (
    <div className="relative w-full">
      <CiSearch className="absolute text-2xl top-1/2 left-lg -translate-y-1/2" />
      <input className="border-2 border-gray-200 pl-3xl py-md pr-xl w-full rounded-xl bg-gray text-gray-900" {...props} />
    </div>
  );
};

