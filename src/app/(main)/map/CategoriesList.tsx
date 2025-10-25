"use client";

import cn from "classnames";
import { useSearchParams, useRouter } from "next/navigation";

interface CategoriesListProps {
  categories: { title: string; category: string; icon: JSX.Element }[];
}

export const CategoriesList = ({ categories }: CategoriesListProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const toggleCategory = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());

    // Получаем все текущие категории
    const current = params.getAll("category");

    // Убираем, если уже есть — добавляем, если нет
    if (current.includes(category)) {
      // Удалим все и добавим только оставшиеся
      const newCategories = current.filter((c) => c !== category);
      params.delete("category");
      newCategories.forEach((c) => params.append("category", c));
    } else {
      // Добавим новую
      params.append("category", category);
    }

    // Обновляем URL
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="grid grid-cols-3 gap-sm mb-2xl">
      {categories.map((category) => {
        const isActive = searchParams
          .getAll("category")
          .includes(category.category);
        return (
          <div
            key={category.title}
            className={cn(
              "grid place-content-center cursor-pointer rounded-lg border-2 border-transparent transition-all p-md bg-gray-100 duration-base select-none",
              {
                "bg-primary-500 text-white hover:bg-primary-500": isActive,
                "hover:bg-white hover:shadow-md hover:border-primary-500 hover:-translate-y-0.5":
                  !isActive,
              }
            )}
            onClick={() => toggleCategory(category.category)}
          >
            <div className="text-4xl flex justify-center mb-xs">
              {category.icon}
            </div>
            {category.title}
          </div>
        );
      })}
    </div>
  );
};

