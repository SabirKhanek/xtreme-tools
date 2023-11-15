import { toast } from "react-toastify";
import { Button } from "../../../../components/button";
import { useState } from "react";
export interface EmailExtractorProps {
  className?: string;
}

const downloadCSV = (csvData: string, filename: string) => {
  const blob = new Blob([csvData], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};

const convertToCSV = (emails: string[]): string => {
  let csvContent = "Email\n";
  emails.forEach((email) => {
    csvContent += email + "\n";
  });
  return csvContent;
};

export function EmailExtractor({ className }: EmailExtractorProps) {
  const [emails, setEmails] = useState<string[]>([]);
  const handleDownload = () => {
    const csvData = convertToCSV(emails);
    downloadCSV(csvData, `emails_csv_${new Date().getTime()}.csv`);
  };
  return (
    <div className={`${className}`}>
      <div>
        <h1 className="text-primary text-4xl font-semibold">
          Email Text Extractor
        </h1>
        <p className="text-sm text-black/70 my-2">
          Online Tool for Extracting Email Addresses From Any Text in Seconds
        </p>
      </div>
      <div className="w-full border border-black rounded-xl grid grid-rows-1 grid-cols-[65%_35%] gap-x-3 h-[69.5vh] p-6">
        <div className="p-3 flex flex-col">
          <div className="border-b border-[#CFCFCF] p-2 flex justify-between items-center">
            <h2 className="text-black font-semibold text-2xl">
              Text With Emails
            </h2>
          </div>
          <div className="grid grid-cols-1 grow">
            <textarea
              onChange={(e) => setEmails(extractEmails(e.target.value))}
              className=" p-1 outline-none text-black/70 font-medium no-scrollbar resize-none"
              placeholder="Start entering the text"
            ></textarea>
          </div>
        </div>
        <div className="bg-[#9758DA0A] rounded-lg p-4 flex flex-col gap-1">
          <div className="grow overflow-y-auto no-scrollbar">
            {emails.length > 0 &&
              emails.map((email, index) => (
                <div
                  key={index}
                  className=" flex justify-between items-center justify-self-start my-1 gap-2"
                >
                  <div className="p-1 px-2 rounded-3xl bg-[#9758DA1A] break-all">
                    {email}
                  </div>
                  <div
                    className="text-black/40 cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(email || "");
                      toast(`Copied '${email}' to clipboard`);
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.916 10.9583H11.1077C9.62435 10.9583 8.41602 9.75831 8.41602 8.26665V6.45831C8.41602 6.11665 8.14102 5.83331 7.79102 5.83331H5.14935C3.22435 5.83331 1.66602 7.08331 1.66602 9.31665V14.85C1.66602 17.0833 3.22435 18.3333 5.14935 18.3333H10.0577C11.9827 18.3333 13.541 17.0833 13.541 14.85V11.5833C13.541 11.2333 13.2577 10.9583 12.916 10.9583Z"
                        fill="black"
                        fill-opacity="0.37"
                      />
                      <path
                        d="M14.8501 1.66669H13.2085H12.3001H9.9418C8.05846 1.66669 6.53346 2.86669 6.4668 5.00835C6.5168 5.00835 6.55846 5.00002 6.60846 5.00002H8.9668H9.87513H11.5168C13.4418 5.00002 15.0001 6.25002 15.0001 8.48335V10.125V12.3834V14.025C15.0001 14.075 14.9918 14.1167 14.9918 14.1584C16.8501 14.1 18.3335 12.8667 18.3335 10.6917V9.05002V6.79169V5.15002C18.3335 2.91669 16.7751 1.66669 14.8501 1.66669Z"
                        fill="black"
                        fill-opacity="0.37"
                      />
                      <path
                        d="M9.9832 5.95831C9.72487 5.69998 9.2832 5.87498 9.2832 6.23331V8.41664C9.2832 9.33331 10.0582 10.0833 11.0082 10.0833C11.5999 10.0916 12.4249 10.0916 13.1332 10.0916C13.4915 10.0916 13.6749 9.67498 13.4249 9.42498C12.5165 8.51664 10.8999 6.89164 9.9832 5.95831Z"
                        fill="black"
                        fill-opacity="0.37"
                      />
                    </svg>
                  </div>
                </div>
              ))}
            {emails.length <= 0 &&
              [1, 2, 3, 4, 5, 6, 7].map((val) => {
                return (
                  <div
                    key={val}
                    className=" flex justify-between items-center justify-self-start my-1 gap-3"
                  >
                    <div className="p-1 px-2 rounded-3xl bg-[#9758DA1A] break-all h-[20px] w-full bg-slate-300 animate-pulse"></div>
                    <div className="text-black/40 cursor-pointer rounded-3xl w-[20px] h-[20px] animate-pulse bg-slate-300"></div>
                  </div>
                );
              })}
          </div>
          <div className="shrink-0 flex justify-between items-center">
            <Button className="text-sm py-2 bg-[#58126A54]">
              {emails.length} Email{emails.length > 1 && "s"}
            </Button>
            <Button className=" bg-primary" onClick={handleDownload}>
              Download CSV
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full border border-black rounded-xl p-6 my-5">
        <h2 className="font-semibold text-lg">
          What is the Email Text Extractor Tool?
        </h2>
        <p className="text-black/70 my-2">
          Introducing our cutting-edge online tool that makes it easy to extract
          email addresses from any text! Whether you're a marketer, salesperson,
          or just someone looking to quickly gather email addresses, our tool
          provides a hassle-free solution that gets the job done quickly and
          efficiently.
          <br />
          <br /> Our tool is designed to work with any type of text, from web
          pages and documents to emails and social media posts. Simply copy and
          paste your text into our tool, and our advanced algorithm will
          automatically scan the text and extract any email addresses it finds.
          <br />
          <br />
          With our email address extractor tool, you can save hours of time that
          would otherwise be spent manually searching for email addresses. Plus,
          our tool ensures that you capture every possible email address,
          without the risk of missing any important contacts. Whether you're
          building your email list, reaching out to potential customers, or just
          looking to gather information, our email address extractor tool is the
          perfect solution. Try it out today and see just how easy it can be to
          extract email addresses from any text!
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

function extractEmails(text: string) {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;

  // Extract email addresses from the text using the regex
  const extractedEmails = text.match(emailRegex) || [];

  return extractedEmails as string[];
}
