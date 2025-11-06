import { CategoryButton } from "@/shared/ui/CategoryButton";

interface RouteCategoriesProps {}

const ROUTE_CATEGORIES = [
  { title: "Популярные", icon: "" },
  { title: "На выходные", icon: "" },
  { title: "Для семьи", icon: "" },
  { title: "Активный отдых", icon: "" },
  { title: "История и культура", icon: "" },
  { title: "Гастрономические", icon: "" },
  { title: "Бюджетные", icon: "" },
];

export const RouteCategories = ({}: RouteCategoriesProps) => {
  return (
    <div className="flex gap-lg flex-wrap mt-2xl">
      {ROUTE_CATEGORIES.map(({ title }) => (
        <CategoryButton key={title}>{title}</CategoryButton>
      ))}
    </div>
  );
};

