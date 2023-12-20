import { useState } from "react";
import { Button } from "../../../../components/button";
import { Input } from "../../../../components/input";
import { ToolBody } from "../../../../components/toolBody";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { FaCheck, FaLink } from "react-icons/fa";
import {
  KeywordByWebURLResponseData,
  keywordsByWebURL,
} from "../../../../services/seo";
import { CompetitorsKeywordResearchDecscription } from "./details";
import { Tool } from "../../types/tool";
import { ToolUsage } from "../../components/toolUsage";
export interface CompetitorsKeywordResearchProps extends Tool {
  className?: string;
}
export function CompetitorsKeywordResearch({
  className,
  toolId,
  requireLogin
}: CompetitorsKeywordResearchProps) {
  const [usage, setUsage] = useState({ used: 0, quota: 10 });

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<KeywordByWebURLResponseData[]>([]);
  const [filter, setFilter] = useState("");
  const formik = useFormik({
    initialValues: {
      url: "",
    },
    onSubmit: (v) => {
      const getKeywords = async () => {
        if (usage.quota <= usage.used) {
          toast.info("Limit reached");
          return;
        }
        setIsLoading(true);
        setResult([]);
        try {
          const resp = await keywordsByWebURL(v.url);
          if (resp.success) {
            if (resp.data) {
              setResult(resp.data.result.keywords);
              setUsage({ used: usage.used + 1, quota: usage.quota });
            }
          } else {
            toast.error(`${resp.statusCode}: ${resp.message}`);
          }
        } catch (err) {
          toast.error("Something went wrong");
        }
        setIsLoading(false);
      };
      if (!isLoading) getKeywords();
    },
    validationSchema: Yup.object({
      url: Yup.string()
        .matches(/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Enter valid domain")
        .required(),
    }),
  });
  const filterResult = () => {
    if (result.length <= 0) return [];
    return result.filter((r) =>
      r.keyword.toLowerCase().includes(filter.toLowerCase())
    );
  };
  return (
    <ToolBody
      heading="Competitors Keyword Reasearch"
      subheading="Extract keywords based on competitors website content"
      ToolDescription={CompetitorsKeywordResearchDecscription}
      className={`${className} flex flex-col gap-2`}
      requireLogin={requireLogin}
    >
      <form onSubmit={formik.handleSubmit}>
        <div className="flex justify-between gap-2">
          <Input
            containerClass="basis-3/5"
            label="Enter URL"
            name="url"
            error={formik.errors.url}
            formikTouched={formik.setFieldTouched}
            isTouched={formik.touched.url}
            placeholder="Enter URL"
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
        <div className="bg-[#58126A1A] rounded-lg w-full p-4 ">
          <Input
            value={filter}
            className="w-full max-w-sm bg-white"
            containerClass="my-3"
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search keywords"
          />
          <div className="overflow-x-auto p-2 border border-[#90909080] rounded-md max-h-96 overflow-y-auto">
            <table className="table-auto text-left border-spacing-1 w-full  ">
              {/* head */}
              <thead>
                <tr>
                  <th className="text-black/70 font-semibold w-[40%]">
                    Keyword
                  </th>
                  <th className="text-black/70 font-semibold text-center">
                    Top URL
                  </th>
                  <th className="text-black/70 font-semibold text-center">
                    Rank
                  </th>
                  <th className="text-black/70 font-semibold text-center">
                    Rank Change
                  </th>
                  <th className="text-black/70  font-semibold text-center">
                    Search Volume
                  </th>
                  <th className="text-black/70  font-semibold text-center">
                    Ranking Home Pages
                  </th>
                  <th className="text-black/70  font-semibold text-center">
                    Paid Competitors
                  </th>
                </tr>
              </thead>
              <tbody className="border-t border-b border-[#90909080]">
                {filterResult().map((r, index) => {
                  return (
                    <tr key={index} className="border-b border-[#90909080]">
                      <td className="p-2 leading-7">{r.keyword}</td>
                      <td className="text-black/80  text-center break-keep">
                        <a
                          href={r.topRankedUrl}
                          className="flex items-center gap-2 px-2 py-1 rounded-badge border border-primary"
                        >
                          <FaLink className="text-primary" />
                          <span className="text-primary">Link</span>
                        </a>
                      </td>
                      <td className="text-black/80 text-center font-medium">
                        {r.rank}
                      </td>
                      <td className="text-black/80 text-center font-medium">
                        {r.rankChange}
                      </td>
                      <td className="text-black/80 text-center font-medium">
                        {r.searchVolume}
                      </td>
                      <td className="text-black/80 text-center font-medium">
                        {r.rankingHomepages}
                      </td>
                      <td className="text-black/80 text-center font-medium">
                        {r.paidCompetitors}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
