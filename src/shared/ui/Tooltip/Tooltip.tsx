"use client";
import {
  Provider,
  Root,
  Portal,
  Content as RadixContent,
  Trigger,
  Arrow,
} from "@radix-ui/react-tooltip";
import { PropsWithChildren, ReactNode } from "react";

interface TooltipProps {
  Content: ReactNode;
}

export const Tooltip = ({
  children,
  Content,
}: PropsWithChildren<TooltipProps>) => {
  return (
    <Provider>
      <Root>
        <Trigger asChild>
          {children}
        </Trigger>
        <Portal>
          <RadixContent
            className="select-none rounded bg-white px-[15px] py-2.5 z-modal text-md leading-none text-main-text shadow-md will-change-[transform,opacity] data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade"
            sideOffset={5}
          >
            {Content}
            <Arrow className="fill-white" />
          </RadixContent>
        </Portal>
      </Root>
    </Provider>
  );
};

