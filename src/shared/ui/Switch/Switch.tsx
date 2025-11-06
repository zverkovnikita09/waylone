import * as RadixSwitch from "@radix-ui/react-switch";
import { useId } from "react";

interface SwitchProps {
  title?: string;
}

export const Switch = ({ title }: SwitchProps) => {
  const id = useId();

  return (
    <div className="flex items-center">
      {title && (
        <label className="pr-[15px] text-[15px] leading-none" htmlFor={id}>
          {title}
        </label>
      )}
      <RadixSwitch.Root
        className="relative h-[25px] w-[42px] [-webkit-tap-highlight-color:rgba(0,0,0,0)] cursor-pointer rounded-full bg-gray-50 outline-none data-[state=checked]:bg-primary data-[state=checked]:border-primary border-1 border-gray-200"
        id={id}
      >
        <RadixSwitch.Thumb className="block size-[21px] translate-x-0.5 rounded-full bg-gray-300 shadow-md transition-all duration-base will-change-transform data-[state=checked]:translate-x-[19px] data-[state=checked]:bg-white" />
      </RadixSwitch.Root>
    </div>
  );
};

