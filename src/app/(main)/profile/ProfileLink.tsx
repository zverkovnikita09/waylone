"use client";
import Link, { LinkProps } from "next/link";
import { PropsWithChildren } from "react";
import { usePathname } from "next/navigation";
import cn from "classnames";

export const ProfileLink = ({
  children,
  ...props
}: PropsWithChildren<LinkProps>) => {
  const pathname = usePathname();
  return (
    <Link
      {...props}
      className={cn(
        "flex items-center gap-md py-md px-lg rounded-lg transition-all duration-base text-secondary-text hover:bg-gray-200 hover:text-primary",
        { "text-white pointer-events-none bg-primary": pathname === props.href }
      )}
    >
      {children}
    </Link>
  );
};

