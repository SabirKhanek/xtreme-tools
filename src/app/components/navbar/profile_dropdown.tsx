import { FaChevronDown } from "react-icons/fa";

export interface ProfileDropDownProps {
  className?: string;
}

export default function ProfileDropDown({ className }: ProfileDropDownProps) {
  const user_avatar =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQryuAUHXwmxp9kAMxlFxKw24qlI6JXG0kvEg&usqp=CAU";
  return (
    <div className={`flex gap-2 items-center justify-center ${className}`}>
      <div className="rounded-full flex justify-center items-center">
        <img
          className="object-cover rounded-full w-10 h-10"
          src={user_avatar}
          alt=""
        />
      </div>

      <div className="flex justify-center items-center gap-1">
        <FaChevronDown
          className="text-black hover:cursor-pointer"
          onClick={() => console.log("profile dropdown clicked")}
        />
      </div>
    </div>
  );
}
