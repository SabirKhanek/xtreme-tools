"use client";
import { useState, ChangeEvent, DragEvent, useEffect } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
export interface ImageUploadProps {
  className?: string;
  handleChange?: (file: File | null) => void;
  file?: File | null;
  accept?: string;
}
export function FileUpload({
  className,
  file: fileObj = null,
  handleChange: _handleChange,
  accept,
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  //   const [file, setFile] = useState<string | null>(null);

  const handleChange = (obj: File) => {
    _handleChange && _handleChange(obj);
  };

  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files.length > 0) {
      handleChange(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile) {
      handleChange(selectedFile);
    }
  };

  return (
    <label
      className={`w-full h-[350px] border ${
        isDragging ? "border-primary border-dashed" : "border-black/20"
      } rounded-3xl grid grid-cols-1 relative cursor-pointer transition-all duration-200 ease-in-out overflow-hidden group ${className}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {fileObj && (
        <div
          className={`absolute w-full h-full justify-center items-center grid-cols-1 bg-black/40 ${
            !isDragging ? "hidden" : "grid"
          } group-hover:grid`}
          style={{ pointerEvents: "none" }}
        >
          <div className="flex justify-center items-center flex-col gap-3">
            <span className="text-white font-semibold">{fileObj?.name}</span>
            <div className="w-24">
              <hr className="bg-white/60"></hr>
            </div>
            <span className="text-white/80">
              {isDragging
                ? "Drop the file here"
                : "Drag and drop a file here or click"}
            </span>
          </div>
        </div>
      )}
      {!fileObj && (
        <div className="flex flex-col gap-2 text-black/30 justify-center items-center">
          <IoCloudUploadOutline className="text-5xl" />
          <p className="text-2xl">
            {isDragging
              ? "Drop the file here"
              : "Drag and drop a file here or click"}
          </p>
        </div>
      )}

      <input
        name="avatar"
        accept={accept || "*"}
        id="contained-button-file"
        type="file"
        hidden
        onChange={handleFileInputChange}
      />
    </label>
  );
}
