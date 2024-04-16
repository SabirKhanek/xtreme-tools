"use client"
// import { useEffect } from "react";

export interface InputProps {
  label?: string;
  className?: string;
  name?: string;
  labelClass?: string;
  type?: React.HTMLInputTypeAttribute;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  containerClass?: string;
  placeholder?: string;
  labelAction?: React.ReactNode;
  required?: boolean;
  error?: string;
  formikTouched?: any;
  isTouched?: boolean;
  disabled?: boolean;
}
export function Input({
  className,
  label,
  name,
  labelClass,
  type,
  value,
  onChange,
  containerClass,
  labelAction,
  placeholder,
  required,
  error,
  disabled,
  formikTouched,
  isTouched,
}: InputProps) {
  // useEffect({},[disabled])
  return (
    <div className={`${containerClass}`}>
      {label && (
        <div className="flex justify-between">
          <span
            className={`${
              labelClass || ""
            } text-black/70 font-semibold text-sm`}
          >
            <label htmlFor={name}>{label}</label>
            {required && "*"}
          </span>
          {labelAction}
        </div>
      )}
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={() => {
          formikTouched && formikTouched(name, true);
        }}
        className={`bg-[#E6B0D92E]/20 rounded-lg text-black/70 w-full p-1 outline-[#E6B0D92E]/50 text-lg ${className} ${
          disabled && "cursor-not-allowed"
        }`}
        disabled={disabled}
      />
      {error && isTouched && (
        <div className="text-sm text-red-500">{error}</div>
      )}
    </div>
  );
}
