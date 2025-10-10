import { PropsWithChildren, ComponentPropsWithoutRef } from "react";
import cn from "classnames";

type AllowedButtonElementTypes = "button" | "a" | "label";

const STYLE_VARIANTS = {
  primary:
    "bg-primary-500 text-white hover:bg-primary-600 hover:-translate-y-px",
  secondary:
    "bg-gray-50 border-gray-200 border-1 hover:bg-primary-600 hover:border-primary-600 hover:-translate-y-px",
} as const;

const SIZE_VARIANTS = {
  xs: "py-[5px] px-[5px]",
  md: "py-sm px-xl",
} as const;

export type ButtonProps<T extends AllowedButtonElementTypes> = {
  as?: T;
  className?: string;
  fullWidth?: boolean;
  IconLeft?: JSX.Element;
  IconRight?: JSX.Element;
  variant?: keyof typeof STYLE_VARIANTS;
  size?: keyof typeof SIZE_VARIANTS;
  isLoading?: boolean;
} & ComponentPropsWithoutRef<T>;

export const Button = <T extends AllowedButtonElementTypes = "button">(
  props: PropsWithChildren<ButtonProps<T>>
) => {
  const {
    as = "button",
    children,
    className,
    fullWidth,
    IconLeft,
    IconRight,
    variant = "primary",
    isLoading,
    size = "md",
    ...otherProps
  } = props;

  const Component = as;

  return (
    <Component
      className={cn(
        "cursor-pointer rounded-lg font-medium transition-all duration-base",
        STYLE_VARIANTS[variant],
        SIZE_VARIANTS[size]
      )}
      {...otherProps}
    >
      {/* {isLoading && (
        <div className={styles.Loader}>
          <i className="fa fa-spinner fa-pulse" />
        </div>
      )} */}
      {IconLeft}
      {children}
      {IconRight}
    </Component>
  );
};

