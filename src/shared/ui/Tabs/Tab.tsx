import { isValidElement, ReactNode } from "react";

interface TabProps {
  title: string;
  content: ReactNode;
}

export type TabElement = React.ReactElement<TabProps>;

export function isTabElement(element: any): element is TabElement {
  return (
    isValidElement(element) &&
    typeof element.type !== "string" &&
    typeof element.type === "function" &&
    "displayName" in element.type &&
    element.type.displayName === "Tab"
  );
}

export const Tab = ({}: TabProps) => {
  return null;
};

Tab.displayName = "Tab";

