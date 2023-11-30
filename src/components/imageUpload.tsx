import { useState, ChangeEvent, DragEvent } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
export interface ImageUploadProps {
  className?: string;
  handleChange?: (file: File | null) => void;
}
export function ImageUpload({
  className,
  handleChange: _handleChange,
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<string | null>(null);
  const [fileObj, setFileObj] = useState<File | null>(null);

  const handleChange = () => {
    _handleChange && _handleChange(fileObj);
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

    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        setFile(fileReader.result as string);
      }
    };

    if (e.dataTransfer.files.length > 0) {
      fileReader.readAsDataURL(e.dataTransfer.files[0]);
      setFileObj(e.dataTransfer.files[0]);
      handleChange();
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        setFile(fileReader.result as string);
      }
    };

    const selectedFile = e.target.files?.item(0);

    if (selectedFile) {
      fileReader.readAsDataURL(selectedFile);
      setFileObj(selectedFile);
      handleChange();
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
      {file && (
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
      {!file && (
        <div className="flex flex-col gap-2 text-black/30 justify-center items-center">
          <IoCloudUploadOutline className="text-5xl" />
          <p className="text-2xl">
            {isDragging
              ? "Drop the file here"
              : "Drag and drop a file here or click"}
          </p>
        </div>
      )}
      {file && (
        <div className="flex justify-center h-full">
          <img className="max-h-[350px] w-auto" src={file}></img>
        </div>
      )}
      <input
        name="avatar"
        accept="image/*"
        id="contained-button-file"
        type="file"
        hidden
        onChange={handleFileInputChange}
      />
    </label>
  );
}
