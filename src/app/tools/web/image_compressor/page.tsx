"use client";
import { useState } from "react";
import { ImageUpload } from "@/app/components/imageUpload";
import { Button } from "@/app/components/button";
import { FaImages, FaRegTrashAlt, FaSpinner } from "react-icons/fa";
import { compressImage, generateFavicon } from "@/app/services/web";
import { toast } from "react-toastify";
import { FaFile } from "react-icons/fa6";
import { Input } from "@/app/components/input";

export default function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(80);
  const [width, setWidth] = useState<number>();
  const [height, setHeight] = useState<number>();
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<
    {
      downloadPath: string;
      inputSize: number;
      outputSize: number;
      original_name: string;
      sizeDifference: number;
    }[]
  >([]);
  const updateFile = (p: File | null) => {
    console.log("Hi", p);
    setFile(p);
  };
  const handleRequest = async () => {
    if (!file) return;
    setIsLoading(true);
    try {
      let resp = await compressImage(file, width, height, quality);
      resp = JSON.parse(resp);
      if (resp.success) {
        setResults((prev) => {
          return [
            ...prev,
            {
              downloadPath: resp.downloadPath,
              inputSize: resp.inputSize,
              original_name: file.name,
              outputSize: resp.outputSize,
              sizeDifference: resp.sizeDifference,
            },
          ];
        });
      } else {
        toast.error(resp.message);
      }
      
    } catch (err) {
      toast.error("Something went wrong.");
    }
    setIsLoading(false);
  };

  return (
    <div className={``}>
      <div>
        <h1 className="text-primary text-4xl font-semibold">
          Image Compressor
        </h1>
        <p className="text-sm text-black/70 my-2">
          Online Tool for compressing image size
        </p>
      </div>
      <div className="w-full border border-black rounded-xl justify-between min-h-[69.5vh] p-6 flex flex-col">
        <div>
          <ImageUpload file={file} handleChange={updateFile} />
          {file && (
            <div className="rounded-lg mt-3 p-2 w-full flex justify-between border border-gray-400">
              <div className="flex items-center gap-2">
                <FaFile></FaFile>
                <span>{file.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>{calculateFileSize(file.size)}</span>
                <button
                  className="hover:text-red-500"
                  onClick={() => setFile(null)}
                >
                  <FaRegTrashAlt></FaRegTrashAlt>
                </button>
              </div>
            </div>
          )}
          <h2 className="text-primary mt-3 font-semibold text-lg">
            Output settings
          </h2>
          <div className="grid my-3 items-center grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-3 max-w-56">
            <label className="text-right">Width</label>
            <Input
              value={width}
              placeholder="Enter width"
              type="number"
              onChange={(e) => {
                setWidth(parseInt(e.target.value));
              }}
            />
            <label className="text-right">Height</label>
            <Input
              value={height}
              placeholder="Enter height"
              type="number"
              onChange={(e) => {
                setHeight(parseInt(e.target.value));
              }}
            />
            <label className="text-right">Width</label>
            <Input
              value={quality}
              placeholder="Enter quality"
              type="number"
              onChange={(e) => {
                setQuality(parseInt(e.target.value));
              }}
            />
          </div>
          <Button className="bg-primary" onClick={handleRequest}>
            <span className="flex items-center gap-2">
              Compress Image{" "}
              {isLoading && (
                <FaSpinner className="animate-spin size-4 ml-2"></FaSpinner>
              )}
            </span>
          </Button>
          <div className="flex flex-col gap-2">
            {results.length > 0 && (
              <>
                <h2 className="font-semibold mt-3 text-lg">Results</h2>
                {results.map((r, i) => (
                  <div
                    key={i}
                    className="rounded-lg mt-3 p-2 w-full flex justify-between border border-gray-400"
                  >
                    <div className="flex items-center gap-2">
                      <FaFile></FaFile>
                      <span>{r.original_name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>
                        {calculateFileSize(r.outputSize)} (
                        <span className="text-green-500">
                          {calculateFileSize(r.sizeDifference * -1)}
                        </span>
                        )
                      </span>
                      <a
                        href={r.downloadPath}
                        target="_blank"
                        className="hover:underline"
                      >
                        Download
                      </a>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="w-full border border-black rounded-xl p-6 my-5">
        <div>
          <h2 className="font-semibold text-lg">What is Image Compresser?</h2>
          <p className="text-black/70 my-2"></p>
        </div>

        <span className="text-black/70 font-semibold text-lg">
          <span className="text-primary">Contact Us </span>
          <span>
            for suggestions, complaints, or just feedback without hesitation.
          </span>
        </span>
      </div>
    </div>
  );
}

function calculateFileSize(bytes: number): string {
  const negativeFlag = bytes < 0;
  if (negativeFlag) bytes *= -1;
  const units = ["Bytes", "KB", "MB", "GB", "TB"];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${negativeFlag ? "-" : ""}${size.toFixed(2)} ${units[unitIndex]}`;
}
