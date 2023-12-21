import { useState } from "react";
import { Button } from "../../../components/button";
import { getResponsiveClasses } from "../../../shared/constants/getResponsiveClasses";
import { toast } from "react-toastify";
import { subscribeToNewsletter } from "../../../services/neewsletter";

export interface SubscribeSectionProps {
  className?: string;
}
export function SubscribeSection({ className }: SubscribeSectionProps) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const resp = await subscribeToNewsletter(input);
      if (resp.success) {
        toast.success("You are now subscribed to our newsletter.");
      } else {
        toast.error(resp.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
    setIsLoading(false);
  };
  return (
    <div className={`${className} ${getResponsiveClasses()} mb-24`}>
      <div
        style={{ backgroundImage: "" }}
        className="rounded-md bg-[linear-gradient(289deg,#58126A_-40.56%,#F6B2E1_119.32%)] px-10 py-6 flex gap-10 justify-between items-center flex-col md:flex-row mx-auto my-0 max-w-[1024px]"
      >
        <h2 className="text-white font-semibold text-lg md:basis-1/2">
          Keep your fingers on the beat for the latest updates on the software!
        </h2>
        <div className="md:basis-1/2 w-full border border-white/60 rounded flex justify-center items-center p-1 gap-1">
          <input
            className="outline-none bg-transparent text-md h-8 text-xl text-white placeholder:text-white/40 placeholder:text-lg grow"
            placeholder="Enter your email"
            onChange={(e) => {
              setInput(e.target.value);
            }}
            type="text"
          />
          <Button
            isLoading={isLoading}
            className="text-black bg-white shrink-0 !rounded-md"
            onClick={handleSubmit}
            loadingClass="text-black"
          >
            <span className="text-black text-sm font-semibold !rounded">
              Subscribe
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
