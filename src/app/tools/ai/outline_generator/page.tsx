"use client";
import { FaCheck, FaRobot, FaSpinner } from "react-icons/fa";
import { Button } from "@/app/components/button";
import { useState } from "react";
import { generateOutilne } from "@/app/services/ai";
import { Tool } from "../../types/tool";
import { useAuth } from "@/app/shared/contexts/auth";
import { LoginRequiredAlert } from "../../components/loginRequiredAlert";
import { toast } from "react-toastify";
import { ToolUsage } from "../../components/toolUsage";
import { useCookies } from "next-client-cookies";

const toolId = "outline_generator";
const requireLogin = true;
export default function OutlineGenerator() {
  const [usage, setUsage] = useState({ used: 0, quota: 20 });
  const isLoggedIn = useCookies().get("x_auth") ? true : false;

  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const handleSubmit = async () => {
    if (usage.quota <= usage.used) {
      toast.info("Limit reached");
      return;
    }
    setIsLoading(true);
    try {
      const resp = await generateOutilne(input);
      setResult(resp.data);
      setUsage({ used: usage.used + 1, quota: usage.quota });
    } catch (err) {}
    setIsLoading(false);
  };
  return (
    <div className={``}>
      <div className={``}>
        <div>
          <h1 className="text-primary text-4xl font-semibold">
            Outline Generator
          </h1>
          <p className="text-sm text-black/70 my-2">
            Online Tool for generating outline for a given topic
          </p>
        </div>
        {(requireLogin ? isLoggedIn || auth.authDetails.isLoggedIn : true) && (
          <div className="w-full border border-black rounded-xl justify-between p-6 flex flex-col">
            <div id="userInput" className="">
              <label className="mb-5">Your Topic</label>
              <div className="flex items-stretch">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="grow w-full rounded-tl-md rounded-bl-md rounded-tr-md rounded-br-md  xs:rounded-tr-none xs:rounded-br-none p-2 border border-black/40 outline-none"
                />
                <Button
                  className="rounded-tl-none hidden xs:block rounded-bl-none bg-primary shrink-0 grow-0"
                  onClick={handleSubmit}
                >
                  <span className="flex justify-center items-center text-white gap-1">
                    <FaRobot />
                    <span>Generate</span>
                    {isLoading && (
                      <span className="animate-spin">
                        <FaSpinner />
                      </span>
                    )}
                  </span>
                </Button>
              </div>
              <Button
                className="rounded w-full my-3 xs:hidden  bg-primary shrink-0 grow-0"
                onClick={handleSubmit}
              >
                <span className="flex justify-center items-center text-white gap-1">
                  <FaRobot />
                  <span>Generate</span>
                  {isLoading && (
                    <span className="animate-spin">
                      <FaSpinner />
                    </span>
                  )}
                </span>
              </Button>
            </div>
            <div
              className={`flex justify-center items-center ${
                result?.length > 0 || isLoading ? "my-10" : ""
              }`}
            >
              {isLoading && <span className="loading loading-ring w-14"></span>}
              {!isLoading && result.length > 0 && (
                <span className="inline-flex flex-col gap-2 justify-center items-center">
                  <span className="rounded-full w-14 h-14 border-[3px] border-primary flex justify-center items-center">
                    <FaCheck className="text-xl text-primary" />
                  </span>
                  <span className="text-primary font-semibold">Success!</span>
                </span>
              )}
            </div>
            {isLoading && (
              <div className="w-full rounded-xl shadow-lg bg-[#9758DA0A] p-5 flex flex-col gap-1">
                {[1, 2, 3, 4, 5].map((value) => {
                  return (
                    <div
                      key={value}
                      className="bg-black/40 w-full rounded-3xl h-3"
                    ></div>
                  );
                })}
              </div>
            )}
            {!isLoading && result.length > 0 && (
              <>
                <Button
                  className="mb-3 bg-primary xs:!w-fit"
                  onClick={() => {
                    navigator.clipboard.writeText(result || "");
                    toast("Copied to clipboard");
                  }}
                >
                  Copy to Clipboard
                </Button>
                <div className="w-full rounded-xl shadow-lg bg-[#9758DA0A] p-5 flex flex-col">
                  {result.split("\n").map((step, index) => (
                    <div
                      key={index}
                      style={{ paddingLeft: countIndentation(step) * 4 }}
                      className="text-black/70 font-semibold py-2 border-b border-[#DADADA]"
                    >
                      {step.trim()}
                    </div>
                  ))}
                </div>
              </>
            )}
            <ToolUsage
              className="my-3"
              toolId={toolId}
              usage={usage}
              setUsage={(v) => setUsage(v)}
            />
          </div>
        )}
        {!(requireLogin ? isLoggedIn || auth.authDetails.isLoggedIn : true) && (
          <LoginRequiredAlert />
        )}
      </div>
      <div className="w-full border border-black rounded-xl p-6 my-5">
        <h2 className="font-semibold text-lg">What is outline generator</h2>
        <p className="text-black/70 my-2">
          Instead of spending hours surfing the internet to find a keyword,
          title, ideas, and more to write a great outline, you can use our
          Outline Generator. Our Outline Generator helps you draft a content
          outline for free. You can draft your content outline using this free
          integrated tool in seconds without wasting your time on searching and
          writing. H-educate's Outline Generator is the most accessible and
          professional Outline Generator in the market, which relies on
          Artificial Intelligence AI to help you create content outlines. This
          content generator outlines your content from introduction to
          conclusion, helping you save time and effort.
        </p>
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

function countIndentation(line: string): number {
  const match = line.match(/^\s*/);
  return match ? match[0].length : 0;
}
