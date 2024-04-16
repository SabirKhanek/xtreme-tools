"use client";
import { useFormik } from "formik";
import { Input } from "@/app/components/input";
import { ToolBody } from "@/app/components/toolBody";
import { DAPAToolDecscription } from "./details";
import * as Yup from "yup";
import { Button } from "@/app/components/button";
import { FaCheck } from "react-icons/fa";
import { useState } from "react";
import {
  domainAuthorityChecker,
  domainAuthorityCheckerResponseData,
} from "@/app/services/seo";
import { toast } from "react-toastify";
import { Tool } from "../../types/tool";
import { ToolUsage } from "../../components/toolUsage";

const toolId = "domain_authority_checker";
const requireLogin = true;
export default function DAPACheck() {
  const [usage, setUsage] = useState({ used: 0, quota: 10 });
  const [result, setResult] =
    useState<domainAuthorityCheckerResponseData | null>();
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: { url: "" },
    onSubmit: (v) => {
      const getDRPR = async () => {
        if (usage.quota <= usage.used) {
          toast.info("Limit reached");
          return;
        }
        setResult({
          target: v.url,
          spam_score: 0,
          da_score: 0,
          pa_score: 0,
          total_backlinks: 0,
        });
        setIsLoading(true);
        try {
          const resp = await domainAuthorityChecker(v.url);

          if (resp.success) {
            setResult(resp.data);
            setUsage({ used: usage.used + 1, quota: usage.quota });
          } else {
            toast.error(`${resp.statusCode}: ${resp.message}`);
          }
        } catch (err) {
          toast.error("Something went wrong");
        }
        setIsLoading(false);
      };
      if (!isLoading) getDRPR();
    },
    validationSchema: Yup.object({
      url: Yup.string()
        .matches(/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Enter valid domain")
        .required(),
    }),
  });
  return (
    <ToolBody
      heading="Domain Authority Checker"
      subheading="Get DA/PA score for any domain"
      ToolDescription={DAPAToolDecscription}
      className={`flex flex-col gap-2`}
      requireLogin={requireLogin}
    >
      <form onSubmit={formik.handleSubmit}>
        <Input
          required
          containerClass="flex flex-col gap-2"
          name="url"
          error={formik.errors.url}
          value={formik.values.url}
          isTouched={formik.touched.url}
          formikTouched={formik.setFieldTouched}
          onChange={formik.handleChange}
          label="Please Enter website URL"
        />
        <Button
          isLoading={isLoading}
          type="submit"
          className="bg-primary my-4 w-full !rounded-md"
        >
          <span className="inline-flex gap-1 text-white items-center">
            <FaCheck />
            <span>Check</span>
          </span>
        </Button>
      </form>

      {result && (
        <div className="bg-[#58126A1A] w-full p-4">
          <div className="justify-center flex text-black/70 mb-5 font-semibold">
            {result.target}
          </div>
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-5 justify-center content-center">
            <div className="flex flex-col gap-2 items-center">
              <span className="px-4 py-1 rounded-3xl text-primary bg-[#58126A33] font-bold">
                {result.da_score}
              </span>
              <span>DA Score</span>
            </div>

            <div className="flex flex-col gap-2 items-center">
              <span className="px-4 py-1 rounded-3xl text-primary bg-[#58126A33] font-bold">
                {result.pa_score}
              </span>
              <span>PA Score</span>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <span className="px-4 py-1 rounded-3xl text-primary bg-[#58126A33] font-bold">
                {result.spam_score}
              </span>
              <span>Spam Score</span>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <span className="px-4 py-1 rounded-3xl text-primary bg-[#58126A33] font-bold">
                {result.total_backlinks}
              </span>
              <span>Total Backlinks</span>
            </div>
          </div>
        </div>
      )}
      <ToolUsage
        className="p-2 my-3"
        toolId={toolId}
        usage={usage}
        setUsage={(v) => setUsage(v)}
      />
    </ToolBody>
  );
}
