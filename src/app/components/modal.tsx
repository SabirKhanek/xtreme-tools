"use client";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { IoCloseOutline } from "react-icons/io5";
export interface ModalProps {
  className?: string;
  title?: string;
  isOpen: boolean;
  containerClass?: string;
  handleClose?: () => void;
  children: React.ReactNode;
}
export function Modal({
  handleClose,
  children,
  isOpen,
  title,
  containerClass,
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    document.getElementsByTagName("body")[0].classList.add("overflow-hidden");
    return () => {
      document
        .getElementsByTagName("body")[0]
        .classList.remove("overflow-hidden");
    };
  }, []);
  if (!isOpen) return null;

  return createPortal(
    <>
      <div
        className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-50"
        onClick={() => {
          handleClose && handleClose();
        }}
      ></div>
      <div
        style={{ transform: "translate(-50%, -50%)" }}
        className="fixed top-1/2 left-1/2 z-50"
      >
        <div
          className={`flex flex-col relative bg-white rounded-3xl shadow-2xl overflow-hidden  ${
            containerClass || ""
          }`}
        >
          <div className="flex justify-between boder-b border-disable p-5">
            <h2 className="text-xl font-bold text-primary">{title}</h2>

            <div
              className="flex justify-center items-center rounded-full h-6 w-6 bg-primary text-white cursor-pointer p-1"
              onClick={() => handleClose && handleClose()}
            >
              <IoCloseOutline />
            </div>
          </div>
          {children}
        </div>
      </div>
    </>,
    document.getElementById("modal-root")!
  );
}
