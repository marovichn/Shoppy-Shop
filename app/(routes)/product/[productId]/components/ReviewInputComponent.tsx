import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, disabled, ...props }, ref) => {
    return (
      <input
        type={type}
        className={twMerge(
          `
        flex 
        w-full
        border
        border-transparent
        px-5 
        py-3 
        text-sm 
        file:border-0 
        file:bg-transparent 
        file:text-sm 
        file:font-medium 
        placeholder:text-black 
        disabled:cursor-not-allowed 
        disabled:opacity-50
        rounded-full 
        bg-neutral-100
      `,
          disabled && "opacity-75",
          className
        )}
        disabled={disabled}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
