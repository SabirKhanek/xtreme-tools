"use client";
import { useFormik } from "formik";
import { ToolBody } from "@/app/components/toolBody";
import { PeopleAlsoAskDetails } from "./details";
import * as Yup from "yup";
import { Button } from "@/app/components/button";
import { Input } from "@/app/components/input";
import { useState } from "react";
import { PeopleAskResponse, peopleAlsoAsk } from "@/app/services/seo";
import { FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";
import { Tool } from "../../types/tool";
import { ToolUsage } from "../../components/toolUsage";

const toolId = "people_also_ask_tool";
const requireLogin = true;
export default function PeopleAlsoAsk() {
  const [usage, setUsage] = useState({ used: 0, quota: 10 });

  const formik = useFormik({
    initialValues: { keyword: "" },
    onSubmit: (v) => {
      const getQuestions = async () => {
        if (usage.quota <= usage.used) {
          toast.info("Limit reached");
          return;
        }
        setIsLoading(true);
        setResult([]);
        try {
          const resp = await peopleAlsoAsk(v.keyword);

          if (resp.success) {
            if (resp.data) setResult(resp.data.result.questions);
            setUsage({ used: usage.used + 1, quota: usage.quota });
          } else {
            toast.error(`${resp.statusCode}: ${resp.message}`);
          }
        } catch (err) {
          toast.error("Something went wrong");
        }
        setIsLoading(false);
      };
      if (!isLoading) getQuestions();
    },
    validationSchema: Yup.object({ keyword: Yup.string().min(3).required() }),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PeopleAskResponse["questions"]>([]);
  return (
    <ToolBody
      heading="People also ask"
      subheading="Questions asked by people"
      ToolDescription={PeopleAlsoAskDetails}
      className={`flex flex-col gap-2`}
      requireLogin={requireLogin}
    >
      <form onSubmit={formik.handleSubmit}>
        <div className="flex justify-between gap-2">
          <Input
            containerClass="basis-3/5"
            label="Enter Keyword"
            name="keyword"
            error={formik.errors.keyword}
            formikTouched={formik.setFieldTouched}
            isTouched={formik.touched.keyword}
            placeholder="Enter Keyword"
            required
            onChange={formik.handleChange}
          />
        </div>
        <Button type="submit" className="w-full bg-primary rounded-sm my-4">
          Submit
        </Button>
      </form>
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
      {result.length > 0 && (
        <div className="my-3 bg-white shadow-md rounded-2xl w-full p-4">
          <div className="flex justify-center">
            <h3 className="font-semibold text-lg text-black/70">
              Questions asked by people
            </h3>
          </div>
          <div className="bg-[#58126A1A] rounded-md p-2 max-h-96 overflow-y-auto">
            {result.map((r, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center gap gap-2 my-3 border-b border-[#dadada]"
                >
                  <span className="font-semibold">{index + 1}</span>
                  <a
                    href={`https://google.com/search?q=${encodeURI(
                      r.question
                    )}`}
                    className="hover:underline hover:text-blue-500 font-medium"
                  >
                    {r.question}
                  </a>
                </div>
              );
            })}
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
