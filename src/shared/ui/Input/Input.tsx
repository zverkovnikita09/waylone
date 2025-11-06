import { InputHTMLAttributes, useId } from "react";
import { CiSearch } from "react-icons/ci";
import cn from "classnames";

type InputSize = "sm" | "md" | "lg";
type TitleSize = "sm" | "md" | "lg";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  isSearch?: boolean;
  title?: string;
  inputSize?: InputSize;
  titleSize?: TitleSize;
}

export const Input = ({
  isSearch,
  id,
  title,
  inputSize = "lg",
  titleSize = "sm",
  ...props
}: InputProps) => {
  const uniqueId = useId();
  return (
    <div className="w-full flex flex-col gap-sm">
      {title && (
        <label
          htmlFor={id ?? uniqueId}
          className={cn("text-sm cursor-pointer", {
            "text-sm": titleSize === "sm",
            "text-md": titleSize === "md",
            "text-lg": titleSize === "lg",
          })}
        >
          {title}
        </label>
      )}
      <div className="relative w-full">
        {isSearch && (
          <CiSearch className="absolute text-2xl top-1/2 left-lg -translate-y-1/2" />
        )}
        <input
          className={cn(
            "border-2 border-gray-200 w-full transition-all duration-fast bg-gray text-gray-900 outline-none focus:border-primary",
            { "py-md px-xl rounded-xl": inputSize === "lg" },
            { "p-md rounded-lg text-sm": inputSize === "sm" },
            { "pl-3xl": isSearch }
          )}
          id={id ?? uniqueId}
          {...props}
        />
      </div>
    </div>
  );
};

