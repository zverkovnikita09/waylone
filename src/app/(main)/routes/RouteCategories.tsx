interface RouteCategoriesProps {
  categories: { title: string; icon: any }[];
}

export const RouteCategories = ({ categories }: RouteCategoriesProps) => {
  return (
    <div className="flex gap-lg flex-wrap mt-2xl">
      {categories.map(({ title }) => (
        <div
          key={title}
          className="border-1 border-gray-200 rounded-3xl cursor-pointer px-xl py-md bg-main-bg transition-all duration-base flex font-medium hover:border-primary hover:shadow-md hover:-translate-y-xs"
        >
          {title}
        </div>
      ))}
    </div>
  );
};

