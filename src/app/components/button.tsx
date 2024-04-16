"use client";
import React from "react";
import { FaSpinner } from "react-icons/fa";

export interface ButtonProps {
  className?: string;
  children?: React.ReactNode;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  loadingClass?: string;
}
export function Button({
  className,
  children,
  onClick,
  type,
  loadingClass,
  isLoading,
  disabled,
}: ButtonProps) {
  return (
    <button
      className={`text-white px-5 py-2 rounded-xl hover:opacity-95 transition-all duration-100 ease-in-out ${className} ${
        disabled ? "cursor-not-allowed" : ""
      }`}
      type={type || "button"}
      onClick={() => onClick && onClick()}
      disabled={disabled}
    >
      <span className="inline-flex justify-center items-center gap-1">
        <div>{children}</div>
        {isLoading && <FaSpinner className={`animate-spin ${loadingClass}`} />}
      </span>
    </button>
  );
}
