"use client";
import { createPortal } from "react-dom";
import { FaSpinner } from "react-icons/fa6";

export function LoadingSplash({ message }: { message: string }) {
  return createPortal(
    <div className="absolute flex justify-center items-center top-0 left-0 w-full h-full bg-black/20 text-white backdrop-blur-lg">
      <div className="flex flex-col gap-2 justify-center items-center">
        <FaSpinner className="text-5xl animate-spin" />
        <div className="text-2xl font-medium">{message}</div>
      </div>
    </div>,
    document.getElementById("splash-root")!
  );
}
