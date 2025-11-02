"use client";

import { Root, List, Trigger } from "@radix-ui/react-tabs";
import { Children, PropsWithChildren, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { isTabElement, TabElement } from "./Tab";

interface TabsProps {}

export const Tabs = ({ children }: PropsWithChildren<TabsProps>) => {
  const tabs = useMemo(
    () =>
      Children.toArray(children).filter((child): child is TabElement =>
        isTabElement(child)
      ),
    [children]
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const activeContent = tabs[activeIndex]?.props.content;

  return (
    <Root className="flex w-full flex-col" value={`tab${activeIndex}`}>
      {/* Заголовки табов */}
      <List className="flex bg-gray-100 p-xs h-max mb-xl rounded-lg">
        {tabs.map(({ props: { title } }, index) => (
          <Trigger
            key={index}
            value={`tab${index}`}
            onClick={() => setActiveIndex(index)}
            className={`
              flex flex-1 cursor-pointer select-none rounded-md items-center justify-center 
              p-sm text-sm leading-none outline-none transition-all duration-200
              ${
                index === activeIndex
                  ? "text-primary bg-main-bg shadow-md"
                  : "text-secondary-text"
              }
            `}
          >
            {title}
          </Trigger>
        ))}
      </List>

      {/* Контент с анимацией всегда справа */}
      <div className="relative w-full overflow-hidden min-h-[120px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="w-full"
          >
            {activeContent}
          </motion.div>
        </AnimatePresence>
      </div>
    </Root>
  );
};

