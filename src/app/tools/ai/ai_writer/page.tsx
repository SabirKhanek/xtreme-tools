"use client";
const ReactQuill = dynamic(
  () => {
    return import("react-quill");
  },
  { ssr: false }
);
import "react-quill/dist/quill.snow.css";

import { Button } from "@/app/components/button";
import { Input } from "@/app/components/input";
import { Toggler } from "@/app/components/toggle";
import { useEffect, useState } from "react";
import { generateContent } from "@/app/services/ai";
import { toast } from "react-toastify";
import { FaRegCopy, FaSpinner } from "react-icons/fa";
import { Tool } from "../../types/tool";

import { ToolUsage } from "../../components/toolUsage";
import { ToolBody } from "@/app/components/toolBody";
import { AIWriterDetails } from "./details";
import Nossr from "@/app/components/nossr";
import dynamic from "next/dynamic";
import { useCookies } from "next-client-cookies";

const toolId = "ai_writer";
const requireLogin = true;
export default function AiWriter() {
  const [usage, setUsage] = useState({ used: 0, quota: 20 });
  const [content, setContent] = useState("");
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [appendSwitch, setAppendSwitch] = useState(false);
  const cookie = useCookies();
  const handleRequest = async () => {
    if (usage.quota <= usage.used) {
      toast.info("Limit reached");
      return;
    }
    setIsLoading(true);
    try {
      const resp = await generateContent(input);
      if (appendSwitch) setContent(content + " " + resp.data);
      else setContent(resp.data);
      setUsage({ used: usage.used + 1, quota: usage.quota });
    } catch (err) {
      toast("Something went wrong");
    }
    setIsLoading(false);
  };

  return (
    <ToolBody
      requireLogin={requireLogin}
      heading="AI Writer"
      subheading="Online tool for generating content using AI"
      ToolDescription={AIWriterDetails}
    >
      <div>
        <label className="mb-2">User Input</label>
        <div
          id="user_input"
          className="flex flex-col md:flex-row items-center md:justify-between gap-5"
        >
          <div className="flex flex-col xs:flex-row items-center gap-2 grow w-full">
            <Input
              containerClass="grow basis-3/5 w-full"
              placeholder="Enter topic you want to generate content"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="flex items-center gap-1 shrink-0">
              <Toggler
                value={appendSwitch}
                onChange={(v) => {
                  setAppendSwitch(v);
                }}
              />
              <span>Append</span>
            </div>
          </div>
          <Button
            className="border-primary border "
            onClick={() => {
              // Assuming `content` is your HTML content
              if (typeof document === undefined) return;
              const temporaryElement = document.createElement("div");
              temporaryElement.innerHTML = content || "";

              // Extract text content from the temporary element
              const plainText =
                temporaryElement.textContent || temporaryElement.innerText;

              navigator.clipboard
                .writeText(plainText)
                .then(() => {
                  toast("Copied to Clipboard");
                })
                .catch((error) => {
                  console.error("Error copying to clipboard:", error);
                });
            }}
          >
            <FaRegCopy className="text-primary" />
          </Button>
          <Button
            className="bg-primary shrink-0 w-full md:w-fit"
            onClick={() => handleRequest()}
          >
            <span className="flex justify-center items-center text-white gap-1">
              <span>Generate</span>
              {isLoading && (
                <span className="animate-spin">
                  <FaSpinner />
                </span>
              )}
            </span>
          </Button>
        </div>
      </div>
      <div className="grow grid grid-rows-1 mt-3 ">
        {
          <Nossr>
            <ReactQuill
              theme="snow"
              value={content}
              className="my-2 h-[340px]"
              onChange={(e) => setContent(e)}
            />
          </Nossr>
        }
      </div>
      <Nossr>
        <ToolUsage
          className=" md:mt-10 mt-16"
          toolId={toolId}
          usage={usage}
          setUsage={(v) => setUsage(v)}
        />
      </Nossr>
    </ToolBody>
  );
}
