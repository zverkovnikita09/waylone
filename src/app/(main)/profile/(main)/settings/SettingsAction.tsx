"use client";
import { Switch } from "@/shared/ui/Switch";
import cn from "classnames";
interface SwitchProps {
  type: "switch";
}

interface SelectProps {
  type: "select";
}

interface ButtonProps {
  type: "button";
}

interface MainProps {
  description: string;
  title: string;
  noBorder?: boolean;
}

type SettingActionProps = (SwitchProps | SelectProps | ButtonProps) & MainProps;

const renderActionComponent = (type: SettingActionProps["type"]) => {
  switch (type) {
    case "switch":
      return <Switch />;

    default:
      return <></>;
  }
};

export const SettingAction = ({
  type,
  description,
  title,
  noBorder,
}: SettingActionProps) => {
  return (
    <div
      className={cn("flex justify-between py-lg", {
        "border-t-1 border-gray-200": !noBorder,
      })}
    >
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-secondary-text text-sm">{description}</p>
      </div>
      {renderActionComponent(type)}
    </div>
  );
};

