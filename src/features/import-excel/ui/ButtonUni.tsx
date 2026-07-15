import type React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
}
export const Button = ({
  isLoading,
  disabled,
  children,
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <button
      disabled={disabled || isLoading}
      className={`
      bg-(--bg-dark) flex p-1 hover:bg-(--bg-dark) rounded-xl  justify-center items-center 
      transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 
        ${className}
      `}
      {...props}
    >
      {isLoading ? "Сохранение..." : children}
    </button>
  );
};
