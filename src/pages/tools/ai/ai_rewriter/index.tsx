import { useState } from "react";
import { Button } from "../../../../components/button";
import paraicon from "./assets/paraicon.svg";
import { FaCopy, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import { paraphraseText } from "../../../../services/ai";
import { Tool } from "../../types/tool";
import { useAuth } from "../../../../shared/contexts/auth";
import { LoginRequiredAlert } from "../../components/loginRequiredAlert";
import { ToolUsage } from "../../components/toolUsage";
export interface AIRewriterProps extends Tool {
  className?: string;
}
export function AIRewriter({
  className,
  requireLogin,
  toolId,
}: AIRewriterProps) {
  const auth = useAuth();
  const [usage, setUsage] = useState({ used: 0, quota: 20 });

  const [style, setStyle] = useState(styleOptions[0]);
  const [result, setResult] = useState("");
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleRequest = async () => {
    if (usage.quota <= usage.used) {
      toast.info("Limit reached");
      return;
    }
    setIsLoading(true);
    try {
      const resp = await paraphraseText(input);
      setResult(resp.data);
      setUsage({ used: usage.used + 1, quota: usage.quota });
    } catch (err) {
      toast.error("Something went wrong!");
    }
    setIsLoading(false);
  };
  return (
    <div className={`${className}`}>
      <div>
        <h1 className="text-primary text-4xl font-semibold">AI Rewriter</h1>
        <p className="text-sm text-black/70 my-2">
          Online Tool for rewriting and paraphrasing using AI
        </p>
      </div>
      {(requireLogin ? auth.authDetails.isLoggedIn : true) && (
        <div className="w-full border border-black rounded-xl justify-between min-h-[69.5vh] p-6 grid grid-cols-1">
          <div className="rounded-3xl shadow-lg bg-white grow flex flex-col gap-1">
            <div
              id="styles_bar"
              className="p-2 border-b border-black/20 flex items-center gap-3"
            >
              <label>Styles: </label>
              <div className="flex items-center gap-2">
                {styleOptions.map((opt) => {
                  return (
                    <div
                      key={opt}
                      className={`grow text-black/70 font-medium cursor-pointer ${
                        style === opt
                          ? "text-primary border-b border-black"
                          : ""
                      } `}
                      onClick={() => setStyle(opt)}
                    >
                      {opt}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="grid grid-cols-2 grow">
              <div className="border-r border-black/20 h-full w-full p-3 flex flex-col gap-1">
                <div>
                  <Button
                    className="bg-[#F0ABDCB2] !rounded-3xl flex items-center gap-1"
                    onClick={handleRequest}
                  >
                    <span className="text-primary">Paraphrase</span>
                    {isLoading && (
                      <span className="animate-spin text-primary">
                        <FaSpinner />
                      </span>
                    )}
                  </Button>
                </div>
                <textarea
                  className=" p-1 outline-none text-black/70 font-medium no-scrollbar resize-none grow"
                  placeholder="To paraphrase text, enter or paste it here and click “Paraphrase Button”"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                ></textarea>
              </div>
              <div className="border-l border-black/20 h-full w-full flex flex-col gap-1 p-3">
                {result.length <= 0 && (
                  <div className="grow flex flex-col justify-center items-center gap-2">
                    <img src={paraicon} alt="" />
                    <span className="text-xl text-primary font-semibold">
                      Paraphrase!
                    </span>
                    <label className="text-black/50">
                      Your "Paraphrased" text will appear here.
                    </label>
                  </div>
                )}
                {result.length > 0 && (
                  <>
                    <div className="flex flex-row-reverse">
                      <button
                        className="flex gap-1 rounded-3xl px-2 py-1 bg-[#11CA6D33] items-center"
                        onClick={() => {
                          navigator.clipboard.writeText(result || "");
                          toast(`Copied paraphrased text to clipboard`);
                        }}
                      >
                        <FaCopy className="text-[#11CA6D]" />
                        <span className="text-[#11CA6D]">Copy</span>
                      </button>
                    </div>
                    <textarea
                      value={result}
                      onChange={(e) => setResult(e.target.value)}
                      className=" p-1 outline-none text-black/70 font-medium no-scrollbar resize-none grow"
                    ></textarea>
                  </>
                )}
              </div>
            </div>
            <ToolUsage
              className="p-2 my-3"
              toolId={toolId}
              usage={usage}
              setUsage={(v) => setUsage(v)}
            />
          </div>
        </div>
      )}
      {!(requireLogin ? auth.authDetails.isLoggedIn : true) && (
        <LoginRequiredAlert />
      )}
      <div className="w-full border border-black rounded-xl p-6 my-5">
        <h2 className="font-semibold text-lg">
          Rewrite in any style you want.
        </h2>
        <p className="text-black/70 my-2">
          The AI paragraph rewriter tool uses artificial intelligence algorithms
          to automatically rewrite or generate new text based on an existing
          source. This tool can quickly create new content that retains the
          meaning and tone of the original text but presents it in a new and
          unique way. This is often used for content creation, avoiding
          plagiarism, or generating new text for SEO purposes. In other words,
          it rewrites human-readable paragraphs and text into new, intelligent,
          readable text.
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

const styleOptions = [
  "simplify",
  "academic",
  "kiddie",
  "formal",
  "expand",
  "shorten",
  "creative",
  "standard",
];
