import { useState } from "react";

export interface TogglerProps {
  className?: string;
  value?: boolean;
  onChange?: (v: boolean) => void;
}
export function Toggler({ className, value: _value, onChange }: TogglerProps) {
  const [value, setValue] = useState(_value || false);
  return (
    <div
      className={`${className} w-[60px] h-[30px] border p-[0.5] transition-all duration-300 ease-in-out border-black/20 rounded-3xl ${
        !value ? "bg-transparent" : "bg-primary"
      }`}
      onClick={() => {
        setValue(!value);
        onChange && onChange(!value);
      }}
    >
      <div className="relative">
        <div
          className={`absolute ${
            !value ? "left-0" : "right-0"
          } transition-all bg-white border border-black/20 duration-300  rounded-full w-[28px] h-[28px] z-10`}
        ></div>
      </div>
    </div>
  );
}
