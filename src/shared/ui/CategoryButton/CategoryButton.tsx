import { PropsWithChildren } from "react";

interface CategoryButtonProps {}

export const CategoryButton = ({
  children,
}: PropsWithChildren<CategoryButtonProps>) => {
  return (
    <div className="border-1 border-gray-200 rounded-3xl cursor-pointer px-xl py-md bg-main-bg transition-all duration-base flex font-medium hover:border-primary hover:shadow-md hover:-translate-y-xs">
      {children}
    </div>
  );
};

