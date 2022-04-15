import React, { InputHTMLAttributes } from "react";
import clsx from "clsx";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputClassName?: string;
  labelKey?: string;
  placeholderKey?: string;
  name: string;
  errorKey?: string;
  type?: string;
  shadow?: boolean;
  icon?: any;
}

const Input = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className = "block relative",
      labelKey,
      name,
      errorKey,
      placeholderKey,
      shadow = false,
      type = "text",
      inputClassName,
      icon,
      ...rest
    },
    ref
  ) => {
    const rootClassName =
      "w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm";

    return (
      <div className={className}>
        {labelKey && (
          <label
            htmlFor={name}
            className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer"
          >
            {labelKey}
          </label>
        )}
        <input
          id={name}
          name={name}
          type={type}
          ref={ref}
          // @ts-ignore
          placeholder={placeholderKey}
          className={rootClassName}
          autoComplete="off"
          spellCheck="false"
          aria-invalid={errorKey ? "true" : "false"}
          {...rest}
        />
        {icon && icon}
        {errorKey && <p className="my-2 text-xs text-red-500">{errorKey}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
