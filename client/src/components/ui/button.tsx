import clsx from "clsx";
import React, { forwardRef, ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: "primary" | "secondary";
  active?: boolean;
  type?: "submit" | "reset" | "button";
  loading?: boolean;
  disabled?: boolean;
  size?: "xl" | "lg" | "base" | "sm" | "xs";
  icon?: {
    position?: "left" | "right";
    component: any;
  };
}

const styles = {
  loading: "cursor-not-allowed",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    className,
    variant = "primary",
    children,
    active,
    loading = false,
    disabled = false,
    icon,
    size = "base",
    ...rest
  } = props;

  const _icon = {
    ...icon,
    position: icon?.position ?? "right",
  };

  const rootClassName = clsx(
    " rounded-lg inline-flex font-semibold items-center cursor-pointer transition ease-in-out duration-300 text-center justify-center focus-visible:outline-none focus:outline-none text-sm px-5 py-2.5 mr-3 md:mr-0 focus:ring-4 focus:outline-none",
    disabled && "cursor-not-allowed brightness-75",
    variant === "primary" &&
      "text-primary bg-light-gray hover:bg-light-gray-hover focus:ring-blue-200",
    variant === "secondary" &&
      "text-white bg-secondary hover:bg-secondary-hover focus:ring-yellow-900",
    loading && "cursor-not-allowed brightness-75",
    className
  );

  return (
    <button
      aria-pressed={active}
      data-variant={variant}
      ref={ref}
      className={rootClassName}
      disabled={disabled}
      {...rest}
    >
      {_icon?.component && (
        <span className="mr-2">
          {_icon?.component && _icon?.position === "left" && _icon?.component}
        </span>
      )}
      {children}
      {_icon?.component && (
        <span className="ml-2">
          {_icon?.component && _icon?.position === "right" && _icon?.component}
        </span>
      )}
    </button>
  );
});
Button.displayName = "Button";
export default Button;
