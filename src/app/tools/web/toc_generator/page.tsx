"use client";
const ReactQuill = dynamic(
  () => {
    return import("react-quill");
  },
  { ssr: false }
);

import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { getTocContent } from "@/app/shared/utils/getToc";
import { Input } from "@/app/components/input";
import { Button } from "@/app/components/button";
import { FaEdit } from "react-icons/fa";
import nossr from "@/app/components/nossr";
import Nossr from "@/app/components/nossr";
import dynamic from "next/dynamic";

export default function TOCGenerator() {
  const [webName, setWebName] = useState("");
  const [webUrl, setWebUrl] = useState("");
  const [show, setShow] = useState(false);
  const [content, setContent] = useState("");
  useEffect(() => {
    if (!show) return;
    if (webName === "" || webUrl === "") return;
    else {
      setContent(getTocContent(webName, webUrl));
    }
  }, [webName, webUrl]);
  return (
    <div className={``}>
      <div>
        <h1 className="text-primary text-4xl font-semibold">
          Terms of Conditions Generator
        </h1>
        <p className="text-sm text-black/70 my-2">
          Online Tool for generating Terms of Conditions document in Seconds
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
            placeholder="Enter website's URL"
            label="Website URL"
            value={webUrl}
            onChange={(e) => setWebUrl(e.target.value)}
          />
        </div>
        <div className="grow grid grid-rows-1 mt-3">
          {content !== "" && (
            <Nossr>
              {" "}
              <ReactQuill
                theme="snow"
                value={content}
                className="h-[330px]"
                onChange={(e) => setContent(e)}
              />
            </Nossr>
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
                    else {
                      setShow(true);
                      setContent(getTocContent(webName, webUrl));
                    }
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
      <div className="w-full border border-black rounded-xl p-6 my-5">
        <div>
          <h2 className="font-semibold text-lg">
            What is the Terms Page Generator?
          </h2>
          <p className="text-black/70 my-2">
            Introducing a game-changing online tool that can generate a
            comprehensive terms page for your website in seconds! Say goodbye to
            the hassle of creating legal documents from scratch or spending
            hours scouring the web for templates. Our easy-to-use tool does all
            the heavy lifting for you, creating a professional and legally
            compliant terms page that meets your website's specific needs.
            <br />
            <br />
            Whether you're a small business owner, blogger, or website
            administrator, our tool simplifies the process of generating a terms
            page. Enter your website's details, and our tool will take care of
            the rest, generating a tailored terms page that covers all the
            important legal aspects, including disclaimers, copyright, privacy,
            and more.
            <br />
            <br /> Our tool is designed to save you time and effort without
            compromising on quality or accuracy. So why waste time creating a
            terms page from scratch? Try our tool today and see how easy and
            stress-free it can be to generate a professional terms page for your
            website!
          </p>
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
