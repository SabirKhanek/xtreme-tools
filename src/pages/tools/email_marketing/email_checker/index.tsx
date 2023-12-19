import { useEffect, useState } from "react";
import { ToolBody } from "../../../../components/toolBody";
import { toast } from "react-toastify";
import { Tool } from "../../types/tool";
import { Button } from "../../../../components/button";
import {
  EmailCheckData,
  validateEmail,
} from "../../../../services/email_marketing";
import { FaRegCheckCircle, FaSpinner } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { MdOutlinePendingActions } from "react-icons/md";
import { Accordion } from "../../../../components/accordion";
const isValidEmail = (email: string): boolean => {
  // Use a simple email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
export interface EmailCheckerProps extends Tool {
  className?: string;
  singleMode?: boolean;
  maxEmails?: number;
}
export function EmailChecker({
  singleMode,
  maxEmails,
  requireLogin,
}: EmailCheckerProps) {
  const [input, setInput] = useState("");
  const allowedEmails = maxEmails || 10;
  const [requests, setRequests] = useState<
    {
      status: "pending" | "success" | "failed" | "loading";
      email: string;
      data?: EmailCheckData;
    }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setRequests([]);
    setInput("");
  }, [singleMode]);
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let val = e.target.value;

    if (singleMode) {
      const index = val.lastIndexOf("\n");
      if (index !== -1) {
        val = val.slice(0, index);
        toast.info(
          `Max ${singleMode ? 1 : allowedEmails} email inputs allowed`
        );
      }
    } else {
      const newLineCount = val.match(/\n/g)?.length || 0;
      if (newLineCount > allowedEmails - 1) {
        const index = val.lastIndexOf("\n");
        val = val.slice(0, index);
        toast.info(
          `Max ${singleMode ? 1 : allowedEmails} email inputs allowed`
        );
      }
    }
    if (val[val.length - 1] === "\n") {
      const lastIndex = val.lastIndexOf("\n");
      const startIndex = val.slice(0, lastIndex).lastIndexOf("\n");
      const newEmail = val.slice(
        startIndex === -1 ? 0 : startIndex + 1,
        lastIndex
      );
      if (!isValidEmail(newEmail)) {
        toast.info("Email should be valid.");
        val = val.slice(0, lastIndex);
      }
    }
    setInput(val);
  };

  const processEmailChecks = async () => {
    setIsLoading(true);
    for (let i = 0; i < requests.length; i++) {
      const req = requests[i];
      if (req.status !== "pending") {
        continue;
      }

      req.status = "loading";
      setRequests((prevRequests) => {
        const updatedRequests = [...prevRequests];
        updatedRequests[i] = { ...req };
        return updatedRequests;
      });

      try {
        const resp = await validateEmail(req.email);
        if (resp.success) {
          req.data = resp.data;
          req.status = "success";
        } else {
          toast.error(resp.message);
          req.status = "failed";
        }
      } catch (err) {
        toast.error("An error occurred while validating email.");
        req.status = "failed";
      }

      setRequests((prevRequests) => {
        const updatedRequests = [...prevRequests];
        updatedRequests[i] = { ...req };
        return updatedRequests;
      });
    }
    setIsLoading(false);
  };
  const handleSubmit = async () => {
    if (isLoading) {
      return;
    }
    const emails = input.split("\n");
    const newRequests: {
      status: "pending" | "success" | "failed" | "loading";
      email: string;
      data?: EmailCheckData;
    }[] = emails
      .filter((email) => email.length > 0)
      .map((email) => ({
        status: "pending",
        email,
      }));
    const isValid = newRequests.every((request) => isValidEmail(request.email));

    if (!isValid) {
      toast.info("All emails should be valid.");
      return;
    }
    setInput("");
    setRequests([...newRequests]);
  };
  useEffect(() => {
    if (!isLoading) processEmailChecks();
  }, [requests]);
  const getStatusNode = (
    status: "pending" | "success" | "failed" | "loading"
  ) => {
    switch (status) {
      case "pending":
        return (
          <span className="p-1 rounded-full border border-black flex justify-center items-center">
            <MdOutlinePendingActions className="text-black" />
          </span>
        );
      case "success":
        return <FaRegCheckCircle className="text-green-500" />;
      case "failed":
        return <MdOutlineCancel className="text-red-500" />;
      case "loading":
        return (
          <span className="animate-spin">
            <FaSpinner className="text-primary" />
          </span>
        );
    }
  };
  return (
    <ToolBody
      heading={singleMode ? "Email Checker" : "Bulk email checker"}
      subheading={"Check email validity to prevent email bounces"}
      requireLogin={requireLogin}
    >
      <div>
        <label className="font-semibold">
          Enter emails (each in one line) max = {singleMode ? 1 : allowedEmails}
        </label>
        <div className="grid grid-cols-1 grow w-full border border-[#dadada] rounded-lg overflow-hidden">
          <textarea
            onChange={handleInputChange}
            value={input}
            rows={10}
            className=" p-1 outline-none text-black/70 font-medium no-scrollbar resize-none"
            placeholder="Start entering the text"
          ></textarea>
        </div>
      </div>
      <Button
        disabled={isLoading}
        onClick={handleSubmit}
        className={`bg-primary rounded-md my-4 w-full ${
          isLoading && "cursor-not-allowed"
        }`}
      >
        Submit
      </Button>
      {requests.length > 0 && (
        <div className="my-3 bg-white shadow-md rounded-2xl w-full p-4">
          <div className="flex justify-center">
            <h3 className="font-semibold text-lg text-black/70">Results</h3>
          </div>
          <div className={`overflow-y-auto max-h-96`}>
            {requests.map((req) => {
              return (
                <Accordion
                  title={req.email}
                  titleStatus={getStatusNode(req.status)}
                >
                  {req.data && (
                    <div className="max-w-md">
                      <div className="p-2 border-b border-[#DADADA]">
                        <div className="flex justify-between">
                          <h3 className="text-black/70 font-semibold">Valid</h3>
                          <span className="rounded-badge px-3 py-1 font-semibold text-primary bg-[#58126A33]">
                            {`${req.data?.valid}`}
                          </span>
                        </div>
                      </div>
                      <div className="p-2 border-b border-[#DADADA]">
                        <div className="flex justify-between items-center">
                          <h3 className="text-black/70 font-semibold">
                            Disposable
                          </h3>
                          <span className="rounded-badge px-3 py-1 font-semibold text-primary bg-[#58126A33]">
                            {`${req.data?.disposable}`}
                          </span>
                        </div>
                      </div>
                      <div className="p-2 border-b border-[#DADADA]">
                        <div className="flex justify-between items-center">
                          <h3 className="text-black/70 font-semibold">Block</h3>
                          <span className="rounded-badge px-3 py-1 font-semibold text-primary bg-[#58126A33]">
                            {`${req.data?.block}`}
                          </span>
                        </div>
                      </div>
                      <div className="p-2 border-b border-[#DADADA]">
                        <div className="flex justify-between items-center">
                          <h3 className="text-black/70 font-semibold">
                            Domain
                          </h3>
                          <span className="">{req.data?.domain}</span>
                        </div>
                      </div>
                      <div className="p-2 border-b border-[#DADADA]">
                        <div className="flex justify-between items-center">
                          <h3 className="text-black/70 font-semibold">Text</h3>
                          <span className="basis-1/2 text-right">
                            {req.data?.text}
                          </span>
                        </div>
                      </div>
                      <div className="p-2 border-b border-[#DADADA]">
                        <div className="flex justify-between items-center">
                          <h3 className="text-black/70 font-semibold">
                            Reason
                          </h3>
                          <span className="basis-1/2 text-right">
                            {req.data?.reason}
                          </span>
                        </div>
                      </div>
                      {req.data?.risk && (
                        <div className="p-2 border-b border-[#DADADA]">
                          <div className="flex justify-between items-center">
                            <h3 className="text-black/70 font-semibold">
                              Risk
                            </h3>
                            <span className="rounded-badge px-3 py-1 font-semibold text-red-400 bg-red-200/60 ">
                              {`${req.data?.risk}`}
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="p-2 border-b border-[#DADADA]">
                        <div className="flex justify-between items-center">
                          <h3 className="text-black/70 font-semibold">
                            MX Host
                          </h3>
                          <span className="">{req.data?.mx_host}</span>
                        </div>
                      </div>
                      <div className="p-2 border-b border-[#DADADA]">
                        <div className="flex justify-between items-center">
                          <h3 className="text-black/70 font-semibold">
                            MX Info
                          </h3>
                          <span className="basis-1/2 text-right">
                            {req.data?.mx_info}
                          </span>
                        </div>
                      </div>
                      <div className="p-2 border-b border-[#DADADA]">
                        <div className="flex justify-between items-center">
                          <h3 className="text-black/70 font-semibold">MX IP</h3>
                          <span className="">{req.data?.mx_ip}</span>
                        </div>
                      </div>
                    </div>
                  )}
                  {!req.data && req.status === "loading" && (
                    <div className="flex justify-center items-center my-5">
                      <span className="loading loading-ring w-14"></span>
                    </div>
                  )}
                  {!req.data && req.status === "pending" && (
                    <div className="flex flex-col gap-2 justify-center items-center my-5">
                      <span className="text-lg flex justify-center items-center p-2 rounded-full border-2 border-primary">
                        <span className="flex flex-col justify-center">
                          <MdOutlinePendingActions className="text-primary text-4xl" />
                        </span>
                      </span>
                      <p className="text-primary font-semibold">In Queue</p>
                    </div>
                  )}
                  {!req.data && req.status === "failed" && (
                    <div className="flex flex-col gap-2 justify-center items-center my-5">
                      <span className="text-lg flex justify-center items-center p-2 rounded-full border-2 border-primary">
                        <span className="flex flex-col justify-center">
                          <MdOutlineCancel className="text-red-500 text-4xl" />
                        </span>
                      </span>
                      <p className="text-red-500 font-semibold">Failed</p>
                    </div>
                  )}
                </Accordion>
              );
            })}
          </div>
        </div>
      )}
    </ToolBody>
  );
}
