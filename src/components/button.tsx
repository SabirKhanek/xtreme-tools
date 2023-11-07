import React from "react";

export interface ButtonProps {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}
export function Button({ className, children, onClick }: ButtonProps) {
  return (
    <button
      className={`text-white px-5 py-2 rounded-xl hover:opacity-95 transition-all duration-100 ease-in-out ${className}`}
      onClick={() => onClick && onClick()}
    >
      {children}
    </button>
  );
}
