"use client";
import Link, { LinkProps } from "next/link";
import { PropsWithChildren } from "react";
import { usePathname } from "next/navigation";
import cn from "classnames";

export const CustomLink = ({
  children,
  ...props
}: PropsWithChildren<LinkProps>) => {
  const pathname = usePathname();
  return (
    <Link
      {...props}
      className={cn(
        "font-medium  transition-all duration-fast relative group inline-block h-max",
        {
          "text-primary-500 pointer-events-none": pathname === props.href,
          "text-secondary-text hover:text-primary-500": pathname !== props.href,
        }
      )}
    >
      <span>{children}</span>
      <span className="absolute bottom-[-3px] left-0 w-0 h-0.5 bg-primary-500 transition-all duration-base group-hover:w-full" />
    </Link>
  );
};

