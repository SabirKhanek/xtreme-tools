export interface InputProps {
  label?: string;
  className?: string;
  name?: string;
  labelClass?: string;
  type?: React.HTMLInputTypeAttribute;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  containerClass?: string;
  labelAction?: React.ReactNode;
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
}: InputProps) {
  return (
    <div className={`${containerClass}`}>
      {label && (
        <div className="flex justify-between">
          <label
            className={`${
              labelClass || ""
            } text-black/70 font-semibold text-sm`}
            htmlFor={name}
          >
            {label}
          </label>
          {labelAction}
        </div>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`bg-[#E6B0D92E]/20 rounded-lg text-black/70 w-full p-1 outline-[#E6B0D92E]/50 text-lg ${className}`}
      />
    </div>
  );
}
