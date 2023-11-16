import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { getContent } from "../../../../shared/utils/getToc";
import { Input } from "../../../../components/input";
import { Button } from "../../../../components/button";
import { FaEdit } from "react-icons/fa";

export interface TOCGeneratorProps {
  className?: string;
}
export function TOCGenerator({ className }: TOCGeneratorProps) {
  const [webName, setWebName] = useState("");
  const [webUrl, setWebUrl] = useState("");

  const [content, setContent] = useState("");
  useEffect(() => {
    if (webName === "" || webUrl === "") return;
    else setContent(getContent(webName, webUrl));
  }, [webName, webUrl]);
  return (
    <div className={`${className}`}>
      <div>
        <h1 className="text-primary text-4xl font-semibold">
          Terms of Conditions Generator
        </h1>
        <p className="text-sm text-black/70 my-2">
          Online Tool for Extracting Email Addresses From Any Text in Seconds
        </p>
      </div>
      <div className="w-full border border-black rounded-xl h-[69.5vh] p-6 flex flex-col">
        <div className=" flex justify-between items-center gap-5 mb-5">
          <Input
            containerClass="basis-1/2"
            placeholder="Enter website's name"
            label="Website Name"
            value={webName}
            onChange={(e) => setWebName(e.target.value)}
          />
          <Input
            containerClass="basis-1/2"
            placeholder="Enter website's name"
            label="Website Name"
            value={webUrl}
            onChange={(e) => setWebUrl(e.target.value)}
          />
        </div>
        <div className="grow grid grid-rows-1 mt-3">
          {content !== "" && (
            <ReactQuill
              theme="snow"
              value={content}
              className="h-[330px]"
              onChange={(e) => setContent(e)}
            />
          )}
          {content === "" && (
            <div className="grid grid-rows-1 rounded-3xl bg-[#9758DA0A] relative shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] p-3 ">
              <div>
                <div className="w-full animate-pulse rounded-3xl bg-slate-400 h-5 mb-1"></div>
                <div className="w-full animate-pulse rounded-3xl bg-slate-400 h-5 mb-1"></div>
                <div className="w-full animate-pulse rounded-3xl bg-slate-400 h-5 mb-1"></div>
                <div className="w-1/2 animate-pulse rounded-3xl bg-slate-400 h-5 mb-1"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  className={`border border-primary bg-transparent ${
                    (webName === "" || webUrl === "") && "cursor-not-allowed"
                  }`}
                  onClick={() => {
                    if (webName === "" || webUrl === "") return;
                    else setContent(getContent(webName, webUrl));
                  }}
                >
                  <span className="flex justify-center items-center text-primary gap-2">
                    <FaEdit />
                    <span className="font-semibold">Generate</span>
                  </span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
