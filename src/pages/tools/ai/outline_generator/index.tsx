import { FaCheck, FaRobot, FaSpinner } from "react-icons/fa";
import { Button } from "../../../../components/button";
import { useState } from "react";
import { generateOutilne } from "../../../../services/ai";
export interface OutlineGeneratorProps {
  className?: string;
}
export function OutlineGenerator({ className }: OutlineGeneratorProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const resp = await generateOutilne(input);
      setResult(resp.data);
    } catch (err) {}
    setIsLoading(false);
  };
  return (
    <div className={`${className}`}>
      <div className={`${className}`}>
        <div>
          <h1 className="text-primary text-4xl font-semibold">
            Outline Generator
          </h1>
          <p className="text-sm text-black/70 my-2">
            Online Tool for generating outline for a given topic
          </p>
        </div>
        <div className="w-full border border-black rounded-xl justify-between p-6 flex flex-col">
          <div id="userInput" className="">
            <label className="mb-5">Your Topic</label>
            <div className="flex items-stretch">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="grow rounded-tl-md rounded-bl-md rounded-tr-none rounded-br-none p-2 border border-black/40 outline-none"
              />
              <Button
                className="rounded-tl-none rounded-bl-none bg-primary shrink-0 grow-0"
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
          </div>
          <div
            className={`flex justify-center items-center ${
              result.length > 0 || isLoading ? "my-10" : ""
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
          )}
        </div>
      </div>
    </div>
  );
}

function countIndentation(line: string): number {
  const match = line.match(/^\s*/);
  return match ? match[0].length : 0;
}
