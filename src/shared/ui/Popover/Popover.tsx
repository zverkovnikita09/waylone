import {
  Root,
  Trigger,
  Portal,
  Content as RadixContent,
} from "@radix-ui/react-popover";
import { PropsWithChildren, useState, ReactNode } from "react";

interface PopoverProps {
  Content: ReactNode;
  side?: "bottom" | "left" | "right" | "top";
  align?: "end" | "start" | "center";
  avoidCollisions?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Popover = ({
  children,
  Content,
  side = "bottom",
  align = "center",
  open: controlledOpen,
  onOpenChange,
  avoidCollisions = true,
}: PropsWithChildren<PopoverProps>) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const handleOpenChange = (newOpen: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(newOpen);
    }
    if (onOpenChange) {
      onOpenChange(newOpen);
    }
  };
  return (
    <Root open={open} onOpenChange={handleOpenChange}>
      <Trigger asChild>
        <div>{children}</div>
      </Trigger>
      <Portal>
        <RadixContent
          side={side}
          align={align}
          className="w-[260px] rounded bg-white p-5 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=top]:animate-slideDownAndFade"
          // sideOffset={5}
          avoidCollisions={avoidCollisions}
          // collisionPadding={16}
          collisionBoundary={[]}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          {Content}
        </RadixContent>
      </Portal>
    </Root>
  );
};

