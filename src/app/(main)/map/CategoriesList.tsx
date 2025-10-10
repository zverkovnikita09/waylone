"use client";

import { useState } from "react";
import cn from "classnames";

interface CategoriesListProps {
  categories: { title: string; link: string; icon: JSX.Element }[];
}

export const CategoriesList = ({ categories }: CategoriesListProps) => {
  const [selectedCategory, setSelectedCategory] = useState<
    CategoriesListProps["categories"][number] | null
  >(null);
  return (
    <div className="grid grid-cols-3 gap-sm mb-2xl">
      {categories.map((category) => (
        <div
          key={category.title}
          className={cn(
            "grid place-content-center cursor-pointer rounded-lg border-2 border-transparent transition-all p-md bg-gray-100 duration-base",
            {
              "bg-primary-500 text-white hover:bg-primary-500":
                selectedCategory?.title === category.title,
              "hover:bg-white hover:shadow-md hover:border-primary-500 hover:-translate-y-0.5":
                selectedCategory?.title !== category.title,
            }
          )}
          onClick={() =>
            setSelectedCategory((prev) =>
              prev?.title === category.title ? null : category
            )
          }
        >
          <div className="text-4xl flex justify-center mb-xs">
            {category.icon}
          </div>
          {category.title}
        </div>
      ))}
    </div>
  );
};

