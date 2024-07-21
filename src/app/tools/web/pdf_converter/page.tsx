"use client";
import { useState } from "react";
import { Button } from "@/app/components/button";
import { FaCopy, FaRegTrashAlt, FaSpinner } from "react-icons/fa";
import { MdOutlineTranslate } from "react-icons/md";
import { toast } from "react-toastify";
import { translateText } from "@/app/services/ai";
import { Tool } from "../../types/tool";
import { useAuth } from "@/app/shared/contexts/auth";
import { LoginRequiredAlert } from "../../components/loginRequiredAlert";
import { ToolUsage } from "../../components/toolUsage";
import { useCookies } from "next-client-cookies";
import { FaFile } from "react-icons/fa6";
import { FileUpload } from "@/app/components/fileUpload";
import { convertPdf } from "@/app/services/web";
import Nossr from "@/app/components/nossr";

const toolId = "pdf_converter";
const requireLogin = true;
export default function PDFConverter() {
  const auth = useAuth();
  const [usage, setUsage] = useState({ used: 0, quota: 3 });
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<
    {
      downloadPath: string;
      filename: string;
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
      let resp = await convertPdf(file);
      resp = JSON.parse(resp);
      if (resp.success) {
        setUsage({ used: usage.used + 1, quota: usage.quota });
        setResults((prev) => {
          return [
            ...prev,
            {
              downloadPath: resp.downloadPath,
              filename: getFileNameFromUrl(resp.downloadPath),
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
  const isLoggedIn = useCookies().get("x_auth") ? true : false;

  return (
    <div>
      <div>
        <h1 className="text-primary text-4xl font-semibold">PDF Converter</h1>
        <p className="text-sm text-black/70 my-2">
          Online Tool to convert PDF to DOCX
        </p>
      </div>
      {(requireLogin ? isLoggedIn || auth.authDetails.isLoggedIn : true) && (
        <div className="w-full border border-black rounded-xl justify-between min-h-[75vh] p-6 flex flex-col gap-2">
          <div className="grid grid-cols-1 grow">
            <div>
              {!file && (
                <FileUpload
                  accept="application/pdf"
                  file={file}
                  handleChange={updateFile}
                />
              )}
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

              <Button className="bg-primary my-3" onClick={handleRequest}>
                <span className="flex items-center gap-2">
                  Convert PDF{" "}
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
                          <span>{r.filename}</span>
                        </div>
                        <div className="flex items-center gap-2">
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
          <Nossr>
            <ToolUsage
              toolId={toolId}
              usage={usage}
              setUsage={(v) => setUsage(v)}
            />
          </Nossr>
        </div>
      )}
      {!(requireLogin ? isLoggedIn || auth.authDetails.isLoggedIn : true) && (
        <LoginRequiredAlert />
      )}
      <div className="w-full border border-black rounded-xl p-6 my-5">
        <h2 className="font-semibold text-lg">What is PDF Converter tool?</h2>
        <p className="text-black/70 my-2"></p>
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

function getFileNameFromUrl(url: string) {
  const urlObject = new URL(url);
  const pathname = urlObject.pathname;
  const segments = pathname.split("/");
  return segments.pop() || "";
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
