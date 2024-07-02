"use client";
import { useState } from "react";
import { Button } from "@/app/components/button";
import { FaCopy, FaSpinner } from "react-icons/fa";
import { MdOutlineTranslate } from "react-icons/md";
import { toast } from "react-toastify";
import { translateText } from "@/app/services/ai";
import { Tool } from "../../types/tool";
import { useAuth } from "@/app/shared/contexts/auth";
import { LoginRequiredAlert } from "../../components/loginRequiredAlert";
import { ToolUsage } from "../../components/toolUsage";
import { useCookies } from "next-client-cookies";

const toolId = "ai_translator";
const requireLogin = true;
export default function AITranslator() {
  const auth = useAuth();
  const [usage, setUsage] = useState({ used: 0, quota: 20 });
  const [result, setResult] = useState("");
  const [input, setInput] = useState("");
  const [from, setFrom] = useState("auto");
  const [to, setTo] = useState("english");
  const [isLoading, setIsLoading] = useState(false);
  const handleRequest = async () => {
    if (from === to) {
      toast.info("Language cannot be translated to same language");
      return;
    }
    if (usage.quota <= usage.used) {
      toast.info("Limit reached");
      return;
    }
    setIsLoading(true);
    try {
      const resp = await translateText(input, from, to);
      if (resp.status === "success") {
        setResult(resp.data);
        if (!resp.skip_increment) {
          setUsage({ used: usage.used + 1, quota: usage.quota });
        }
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
    setIsLoading(false);
  };
  const isLoggedIn = useCookies().get("x_auth") ? true : false;

  return (
    <div>
      <div>
        <h1 className="text-primary text-4xl font-semibold">AI Translator</h1>
        <p className="text-sm text-black/70 my-2">
          Online Tool for translating paragraphs using AI
        </p>
      </div>
      {(requireLogin ? isLoggedIn || auth.authDetails.isLoggedIn : true) && (
        <div className="w-full border border-black rounded-xl justify-between min-h-[75vh] p-6 flex flex-col gap-2">
          <div className="grid grid-cols-1 grow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 grow">
              <div className="bg-white shadow-lg rounded-3xl h-full w-full p-3 flex flex-col gap-1 min-h-[350px] md:min-h-full ">
                <div className="border-b border-black/20 py-3 flex justify-between">
                  <h2 className="text-xl text-black font-medium">
                    Original Text
                  </h2>
                  <div className="border border-black rounded-md">
                    <select
                      className="outline-none boder border-black rounded-md"
                      onChange={(e) => setFrom(e.target.value)}
                    >
                      <option value="auto">Auto</option>
                      {languages.map((language) => (
                        <option key={language} value={language}>
                          {language.charAt(0).toUpperCase() +
                            language.substring(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <textarea
                  className="p-1 outline-none text-black/70 font-medium no-scrollbar resize-none grow"
                  placeholder="With the AI Paragraph Translator, you can accurately translate even the most complex sentences, making it the perfect solution for all your translation needs. Try it out today and see just how easy communication can be!"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                ></textarea>
              </div>
              <div className="bg-[#9758DA0A] rounded-3xl shadow-md h-full w-full flex flex-col gap-1 p-3 min-h-[350px] md:min-h-full">
                <div className="border-b border-black/20 py-3 flex flex-row-reverse justify-between">
                  <h2 className="text-xl text-black font-medium">
                    Translated Text
                  </h2>
                  <div className="border border-black rounded-md">
                    <select
                      className="outline-none boder border-black rounded-md bg-transparent"
                      onChange={(e) => setTo(e.target.value)}
                    >
                      {languages.map((language) => (
                        <option key={language} value={language}>
                          {language.charAt(0).toUpperCase() +
                            language.substring(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {result.length <= 0 && (
                  <div className="grow flex flex-col gap-1 relative">
                    <div className="skeleton w-full h-4"></div>
                    <div className="skeleton w-full h-4"></div>
                    <div className="skeleton w-full h-4"></div>
                    <div className="skeleton w-full h-4"></div>
                    <div className="skeleton w-1/2 h-4"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button
                        className={`border border-primary bg-transparent !rounded-3xl`}
                        onClick={handleRequest}
                      >
                        <span className="flex justify-center items-center text-primary gap-2 rounded-3xl">
                          <MdOutlineTranslate />
                          <span className="font-semibold">Generate</span>
                          {isLoading && (
                            <div className="animate-spin">
                              <FaSpinner />
                            </div>
                          )}
                        </span>
                      </Button>
                    </div>
                  </div>
                )}
                {result.length > 0 && (
                  <>
                    <textarea
                      value={result}
                      onChange={(e) => setResult(e.target.value)}
                      className="p-1 bg-transparent outline-none text-black/70 font-medium no-scrollbar resize-none grow"
                    ></textarea>
                    <div className="flex justify-between items-center">
                      <Button
                        onClick={handleRequest}
                        className={` bg-primary !rounded-3xl`}
                      >
                        <span className="flex justify-center items-center text-white gap-2 rounded-3xl">
                          <MdOutlineTranslate />
                          <span className="font-semibold">Generate</span>
                          {isLoading && (
                            <div className="animate-spin">
                              <FaSpinner />
                            </div>
                          )}
                        </span>
                      </Button>
                      <button
                        className="flex gap-1 rounded-3xl px-2 py-1 bg-[#11CA6D33] items-center"
                        onClick={() => {
                          navigator.clipboard.writeText(result || "");
                          toast(`Copied translated text to clipboard`);
                        }}
                      >
                        <FaCopy className="text-[#11CA6D]" />
                        <span className="text-[#11CA6D]">Copy</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <ToolUsage
            toolId={toolId}
            usage={usage}
            setUsage={(v) => setUsage(v)}
          />
        </div>
      )}
      {!(requireLogin ? isLoggedIn || auth.authDetails.isLoggedIn : true) && (
        <LoginRequiredAlert />
      )}
      <div className="w-full border border-black rounded-xl p-6 my-5">
        <h2 className="font-semibold text-lg">
          What Is the AI Paragraph Translator Tool?
        </h2>
        <p className="text-black/70 my-2">
          With this tool, you can easily translate paragraphs into multiple
          languages with just a few clicks. Whether you're traveling abroad,
          communicating with international clients, or simply want to reach a
          wider audience, this tool will help you break down language barriers.
          <br />
          To use the AI Paragraph Translator, follow these easy steps:
          <br />
          <br />
          1. Input the paragraph you want to translate into the text box.
          <br />
          2. Pick the languages, and click the "Translate" button.
          <br />
          3. Click the "Translate" button to generate your translated paragraph.
          <br />
          <br />
          With this tool, you can easily translate paragraphs into multiple
          languages with just a few clicks. Whether you're traveling abroad,
          communicating with international clients, or simply want to reach a
          wider audience, this tool will help you break down language barriers.
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

const languages = ["english", "urdu", "spanish", "french", "german", "hindi"];
