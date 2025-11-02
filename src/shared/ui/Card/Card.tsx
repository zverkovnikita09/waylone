import { PropsWithChildren } from "react";
import cn from "classnames";

interface CardProps {
  className?: string;
}

export const Card = ({ children, className }: PropsWithChildren<CardProps>) => {
  return (
    <div className={cn("rounded-xl p-2xl shadow-md bg-main-bg", className)}>
      {children}
    </div>
  );
};

