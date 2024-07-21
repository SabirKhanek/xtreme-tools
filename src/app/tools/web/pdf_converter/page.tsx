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

const toolId = "pdf_converter";
const requireLogin = true;
export default function PDFConverter() {
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
          <div className="grid grid-cols-1 grow">{/** TOOL INTERFACE */}</div>
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
