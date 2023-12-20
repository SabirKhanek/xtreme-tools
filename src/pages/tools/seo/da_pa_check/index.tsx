import { useFormik } from "formik";
import { Input } from "../../../../components/input";
import { ToolBody } from "../../../../components/toolBody";
import { DAPAToolDecscription } from "./details";
import * as Yup from "yup";
import { Button } from "../../../../components/button";
import { FaCheck, FaRegCheckCircle, FaSpinner } from "react-icons/fa";
import { useState } from "react";
import {
  domainAuthorityChecker,
  domainAuthorityCheckerResponseData,
} from "../../../../services/seo";
import { toast } from "react-toastify";
import { Tool } from "../../types/tool";
import { ToolUsage } from "../../components/toolUsage";
export interface DAPACheckProps extends Tool {
  className?: string;
}
export function DAPACheck({ className, toolId, requireLogin }: DAPACheckProps) {
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
      className={`${className} flex flex-col gap-2`}
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
        <Button type="submit" className="bg-primary my-4 w-full !rounded-md">
          <span className="inline-flex gap-1 text-white items-center">
            <FaCheck />
            <span>Check</span>
          </span>
        </Button>
      </form>
      {result && (
        <div className="bg-[#58126A1A] rounded-lg w-full p-4 overflow-x-auto">
          <table className="table-auto text-left border-spacing-1 w-full">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th className="text-black/70 font-semibold w-[40%]">URL</th>
                <th className="text-black/70 font-semibold text-center">DR</th>
                <th className="text-black/70 font-semibold text-center">PR</th>
                <th className="text-black/70 font-semibold text-center">
                  Spam Score
                </th>
                <th className="text-black/70  font-semibold text-center">
                  Total Backlinks
                </th>
              </tr>
            </thead>
            <tbody className="border-t border-b border-[#90909080]">
              {/* row 1 */}
              <tr className="">
                <td className="p-2 leading-7">
                  {isLoading ? (
                    <span>
                      <FaSpinner className="animate-spin text-primary" />
                    </span>
                  ) : (
                    <span className="text-primary">
                      <FaRegCheckCircle />
                    </span>
                  )}
                </td>
                <td className="text-black/80 leading-[50px] font-bold break-keep">
                  {result.target}
                </td>
                <td className="text-black/80 text-center font-medium">
                  {result.da_score}
                </td>
                <td className="text-black/80 text-center font-medium">
                  {result.pa_score}
                </td>
                <td className="text-black/80 text-center font-medium">
                  {result.spam_score}
                </td>
                <td className="text-black/80 text-center font-medium">
                  {result.total_backlinks}
                </td>
              </tr>
            </tbody>
          </table>
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
