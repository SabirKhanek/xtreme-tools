"use client";
const ReactQuill = dynamic(
  () => {
    return import("react-quill");
  },
  { ssr: false }
);

import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { Input } from "@/app/components/input";
import { Button } from "@/app/components/button";
import { FaEdit } from "react-icons/fa";
import { getPrivacyContent } from "@/app/shared/utils/getPrivacy";
import Nossr from "@/app/components/nossr";
import dynamic from "next/dynamic";

export default function PrivacyPolicyGenerator() {
  const [webName, setWebName] = useState("");
  const [webUrl, setWebUrl] = useState("");
  const [show, setShow] = useState(false);
  const [content, setContent] = useState("");
  useEffect(() => {
    if (!show) return;
    if (webName === "" || webUrl === "") return;
    else setContent(getPrivacyContent(webName, webUrl));
  }, [webName, webUrl]);
  return (
    <div className={``}>
      <div>
        <h1 className="text-primary text-4xl font-semibold">
          Privacy Policy Generator
        </h1>
        <p className="text-sm text-black/70 my-2">
          Online Tool for generating Privacy Policy document in Seconds
        </p>
      </div>
      <div className="w-full border border-black rounded-xl h-[69.5vh] p-6 flex flex-col">
        <div className=" flex justify-between items-center gap-5 mb-5">
          <Input
            containerClass="basis-1/2"
            placeholder="Enter website's name"
            label="Website Name"
            value={webName}
            onChange={(e) => setWebName(e.target.value)}
          />
          <Input
            containerClass="basis-1/2"
            placeholder="Enter website's URL"
            label="Website URL"
            value={webUrl}
            onChange={(e) => setWebUrl(e.target.value)}
          />
        </div>
        <div className="grow grid grid-rows-1 mt-3">
          {content !== "" && (
            <Nossr>
              <ReactQuill
                theme="snow"
                value={content}
                className="h-[330px]"
                onChange={(e) => setContent(e)}
              />
            </Nossr>
          )}
          {content === "" && (
            <div className="grid grid-rows-1 rounded-3xl bg-[#9758DA0A] relative shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] p-3 ">
              <div>
                <div className="w-full animate-pulse rounded-3xl bg-slate-400 h-5 mb-1"></div>
                <div className="w-full animate-pulse rounded-3xl bg-slate-400 h-5 mb-1"></div>
                <div className="w-full animate-pulse rounded-3xl bg-slate-400 h-5 mb-1"></div>
                <div className="w-1/2 animate-pulse rounded-3xl bg-slate-400 h-5 mb-1"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  className={`border border-primary bg-transparent ${
                    (webName === "" || webUrl === "") && "cursor-not-allowed"
                  }`}
                  onClick={() => {
                    if (webName === "" || webUrl === "") return;
                    else {
                      setShow(true);
                      setContent(getPrivacyContent(webName, webUrl));
                    }
                  }}
                >
                  <span className="flex justify-center items-center text-primary gap-2">
                    <FaEdit />
                    <span className="font-semibold">Generate</span>
                  </span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="w-full border border-black rounded-xl p-6 my-5">
        <div>
          <h2 className="font-semibold text-lg">What is a privacy policy?</h2>
          <p className="text-black/70 my-2">
            A privacy policy is a legal document where you disclose what data
            you collect from users, how you manage the collected data, and how
            you use that data. The important objective of a privacy policy is to
            inform users how you collect, use and manage the collection.
          </p>
        </div>
        <div className="my-2">
          <h2 className="font-semibold text-lg">
            Can I copy someone else's privacy policy?
          </h2>
          <p className="text-black/70 my-2">
            We do not recommend copying someone else's privacy policy. First of
            all, privacy policies are copyright-protected legal documents. But
            most importantly, a privacy policy must be generated based on the
            exact data you collect. Our privacy policy generator can help you
            with this.
            <br />
            <br /> Not everyone knows how to make a{" "}
            <strong>Privacy Policy agreement</strong>, especially with{" "}
            <strong>
              CCPA, GDPR, CalOPPA, PIPEDA, or Australia's Privacy Act provisions
            </strong>
            . You will be clueless if you are not a lawyer or someone familiar
            with Privacy Policies. Some people might even take advantage of you
            because of this. Some people may even extort money from you. These
            are some examples that we want to stop from happening to you. We
            will help you protect yourself by generating a Privacy Policy.
            <br />{" "}
            <strong>
              Our Privacy Policy Generator can help ensure your business
              complies with the law.
            </strong>{" "}
            <br />
            We are here to help you protect your business, yourself, and
            customers. Fill in the blank spaces below, and we will create a
            personalized website Privacy Policy for your business. No account
            registration is required. Simply generate & download a Privacy
            Policy in seconds! <br />
            <br />
            Small remark when filling in this Privacy Policy generator: Not all
            parts of this Privacy Policy might apply to your website. When there
            are parts that are not applicable, these can be removed. Optional
            elements can be selected in step 2. The accuracy of the generated
            Privacy Policy on this website is not legally binding. Use at your
            own risk.
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
