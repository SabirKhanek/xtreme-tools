import ReactQuill from "react-quill";
import { Button } from "../../../../components/button";
import { Input } from "../../../../components/input";
import { Toggler } from "../../../../components/toggle";
import { useState } from "react";
import { generateContent } from "../../../../services/ai";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { Tool } from "../../types/tool";
import { useAuth } from "../../../../shared/contexts/auth";
import { LoginRequiredAlert } from "../../components/loginRequiredAlert";
import { ToolUsage } from "../../components/toolUsage";
export interface AiWriterProps extends Tool {
  className?: string;
}
export function AiWriter({ className, requireLogin, toolId }: AiWriterProps) {
  const [usage, setUsage] = useState({ used: 0, quota: 20 });
  const auth = useAuth();
  const [content, setContent] = useState("");
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [appendSwitch, setAppendSwitch] = useState(false);

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
    <div className={`${className}`}>
      <div className={`${className}`}>
        <div>
          <h1 className="text-primary text-4xl font-semibold">AI Writer</h1>
          <p className="text-sm text-black/70 my-2">
            Online Tool for generating content using AI
          </p>
        </div>
        {(requireLogin ? auth.authDetails.isLoggedIn : true) && (
          <div className="w-full border border-black rounded-xl justify-between min-h-[75vh] p-6 flex flex-col gap-2">
            <div>
              <label className="mb-2">User Input</label>
              <div
                id="user_input"
                className="flex items-center justify-between gap-5"
              >
                <div className="flex items-center gap-2 grow">
                  <Input
                    containerClass="grow basis-3/5"
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
                  className="bg-primary shrink-0"
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
              <ReactQuill
                theme="snow"
                value={content}
                className="my-2 h-[340px]"
                onChange={(e) => setContent(e)}
              />
            </div>
            <ToolUsage
              className="mt-10"
              toolId={toolId}
              usage={usage}
              setUsage={(v) => setUsage(v)}
            />
          </div>
        )}
        {!(requireLogin ? auth.authDetails.isLoggedIn : true) && (
          <LoginRequiredAlert />
        )}
      </div>
      <div className="w-full border border-black rounded-xl p-6 my-5">
        <h2 className="font-semibold text-lg">What is the AI writer tool?</h2>
        <p className="text-black/70 my-2">
          Maybe You heard about Jasper? This AI writer tool is a 100% Free
          Alternative to creating your copy, blog content, script writing, or
          any paragraph you want. It is simply a Free Text Generator! If you are
          new to this AI Content Generation technology, let me explain. AI
          Content Generation tools are the latest trend in content writing,
          blogging, and overall copywriting in general. This technology will
          help you create high-quality content and save time. Think about it as
          a robot sitting beside you and helping you write! It is an AI writing
          assistant. So, in Short: This Free AI Writer Tool Helps You Generate
          Sentences and Paragraphs to Assist You In Writing Articles With The
          Help of AI.
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
