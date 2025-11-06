import { forwardRef, PropsWithChildren } from "react";
import * as RadixSelect from "@radix-ui/react-select";
import cn from "classnames";

interface SelectItemProps {
  className?: string;
  value?: any;
  disabled?: boolean;
}

export const SelectItem = forwardRef<any, PropsWithChildren<SelectItemProps>>(
  ({ children, className, value, disabled }, forwardedRef) => {
    return (
      <RadixSelect.Item
        className={cn(
          "relative flex h-[25px] RadixSelect-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] leading-none text-violet11 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 data-[highlighted]:outline-none",
          className
        )}
        ref={forwardedRef}
        value={value}
        disabled={disabled}
      >
        <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
        <RadixSelect.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
          {/* <CheckIcon /> */}
        </RadixSelect.ItemIndicator>
      </RadixSelect.Item>
    );
  }
);

