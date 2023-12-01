import { useState } from "react";
import { ImageUpload } from "../../../../components/imageUpload";
import { Button } from "../../../../components/button";
import { Toggler } from "../../../../components/toggle";
import { FaImages, FaSpinner } from "react-icons/fa";
import { generateFavicon } from "../../../../services/web";
import { toast } from "react-toastify";
export interface FaviconGeneratorProps {
  className?: string;
}
export function FaviconGenerator({ className }: FaviconGeneratorProps) {
  const [file, setFile] = useState<File | null>(null);
  const [is16x16, setIs16x16] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const updateFile = (p: File | null) => {
    setFile(p);
  };
  const handleRequest = async () => {
    if (!file) return;
    setIsLoading(true);
    try {
      let resp = await generateFavicon(file, is16x16);
      resp = JSON.parse(resp);
      if (resp.zipPath) {
        window.open(resp.zipPath, "_blank");
      }
    } catch (err) {
      toast.error("Something went wrong.");
    }
    setIsLoading(false);
  };
  return (
    <div className={`${className}`}>
      <div>
        <h1 className="text-primary text-4xl font-semibold">
          Favicon Generator
        </h1>
        <p className="text-sm text-black/70 my-2">
          Online Tool for generating favicons for various screens
        </p>
      </div>
      <div className="w-full border border-black rounded-xl justify-between min-h-[69.5vh] p-6 flex flex-col">
        <ImageUpload handleChange={updateFile} />
        <div className="flex justify-between">
          <div className="flex gap-1 items-center">
            <Button
              className={`border border-primary ${
                !is16x16 ? "bg-primary" : "bg-transparent"
              }`}
              onClick={() => setIs16x16(false)}
            >
              <span
                className={`text-sm ${
                  !is16x16 ? "text-white" : "text-primary"
                } font-semibold`}
              >
                Desktop, Web, Android, and iOS (iPhone and iPad)
              </span>
            </Button>
            <Button
              className={`border border-primary ${
                is16x16 ? "bg-primary" : "bg-transparent"
              }`}
              onClick={() => setIs16x16(true)}
            >
              <span
                className={`text-sm ${
                  is16x16 ? "text-white" : "text-primary"
                } font-semibold`}
              >
                Only 16x16
              </span>
            </Button>
            <Toggler />
          </div>
          <Button
            className="bg-transparent border border-primary"
            onClick={() => {
              handleRequest();
            }}
          >
            <div className="flex gap-1 items-center text-primary">
              <FaImages />
              <span>Generate</span>
              {isLoading && (
                <span className="animate-spin">
                  <FaSpinner />
                </span>
              )}
            </div>
          </Button>
        </div>
      </div>
      <div className="w-full border border-black rounded-xl p-6 my-5">
        <div>
          <h2 className="font-semibold text-lg">What are favicons?</h2>
          <p className="text-black/70 my-2">
            Favicons are small images that appear on the browser tab of a
            website, usually in the top right corner. They're used to represent
            websites and apps so they can be easily identified by users. The
            favicon is also known as the “site icon” or “app icon”. It's an
            image file that represents your site/app.
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
