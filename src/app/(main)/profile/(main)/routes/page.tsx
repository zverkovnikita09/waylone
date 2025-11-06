import { Button } from "@/shared/ui/Button";
import { FaPlus } from "react-icons/fa6";

export const metadata = {
  title: "Мои маршруты",
};

export default function Routes() {
  return (
    <div className="flex flex-col min-h-full">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold mb-lg">Мои маршруты</h2>
        <Button IconLeft={<FaPlus />}>Создать маршрут</Button>
      </div>
    </div>
  );
}

