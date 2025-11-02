"use client";
import cn from "classnames";
import { IoMdShareAlt } from "react-icons/io";
import { Tooltip } from "../Tooltip";

interface ShareButtonProps {
  className?: string;
}

export const ShareButton = ({ className }: ShareButtonProps) => {
  return (
    <Tooltip Content="Поделиться">
      <div
        className={cn(
          "w-[40px] h-[40px] rounded-full bg-main-bg flex items-center justify-center text-xl group/shared cursor-pointer",
          className
        )}
      >
        <IoMdShareAlt className="group-hover/shared:scale-120 transition-all duration-fast" />
      </div>
    </Tooltip>
  );
};

