import React from "react";

export interface ButtonProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}
export function Button({
  className,
  children,
  onClick,
  disabled,
}: ButtonProps) {
  return (
    <button
      className={`text-white px-5 py-2 rounded-xl hover:opacity-95 transition-all duration-100 ease-in-out ${
        disabled && "cursor-not-allowed"
      } ${className}`}
      onClick={() => {
        onClick && onClick();
      }}
    >
      {children}
    </button>
  );
}
