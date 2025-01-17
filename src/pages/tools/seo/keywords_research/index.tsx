import { useFormik } from "formik";
import { ToolBody } from "../../../../components/toolBody";
import { KeywordsResearchDecscription } from "./details";
import { Input } from "../../../../components/input";
import * as Yup from "yup";
import { Button } from "../../../../components/button";
import { useState } from "react";
import {
  KeywordCheckerResponseData,
  keywordChecker,
} from "../../../../services/seo";
import { FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";
import { Tool } from "../../types/tool";
import { ToolUsage } from "../../components/toolUsage";
import { Accordion } from "../../../../components/accordion";
export interface KeywordsResearchProps extends Tool {
  className?: string;
}
export function KeywordsResearch({
  className,
  toolId,
  requireLogin,
}: KeywordsResearchProps) {
  const [usage, setUsage] = useState({ used: 0, quota: 10 });

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<KeywordCheckerResponseData[]>([]);
  const [filter, setFilter] = useState("");
  const formik = useFormik({
    initialValues: {
      keyword: "",
      country: "us",
      sortBy: "none" as unknown as string | undefined,
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
          const resp = await keywordChecker(v.keyword, v.country);

          if (resp.success) {
            setUsage({ used: usage.used + 1, quota: usage.quota });

            if (resp.data) {
              setResult(resp.data);
              if (resp.data.length === 0)
                toast("No result matching your criteria");
            }
            if (v.sortBy !== "none") {
              const sortedData = resp.data?.sort(
                (a: any, b: any) => b[v.sortBy as any] - a[v.sortBy as any]
              );
              if (sortedData?.length && sortedData.length > 0)
                setResult(sortedData);
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
      keyword: Yup.string().min(3).required(),
      country: Yup.string().oneOf(
        ["global", ...countries.map((country) => country.code.toLowerCase())],
        "invalid country"
      ),
      sortBy: Yup.string().oneOf(["cpc", "score", "vol", "none"]).optional(),
    }),
  });
  const filterResult = () => {
    return result.filter((r) =>
      r.text.toLowerCase().includes(filter.toLowerCase())
    );
  };
  return (
    <ToolBody
      heading="Keywords Research"
      subheading="perform keyword research in seconds"
      ToolDescription={KeywordsResearchDecscription}
      className={`${className} flex flex-col gap-2`}
      requireLogin={requireLogin}
    >
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col 960:flex-row justify-between gap-2">
          <Input
            containerClass="basis-3/5"
            label="Keyword"
            name="keyword"
            error={formik.errors.keyword}
            formikTouched={formik.setFieldTouched}
            isTouched={formik.touched.keyword}
            placeholder="Enter keyword"
            required
            onChange={formik.handleChange}
          />
          <div className="basis-1/5">
            <label className="text-black/70 font-semibold text-sm">
              Sort by
            </label>
            <select
              className="bg-[#E6B0D92E]/20 h-9 rounded-lg text-black/70 w-full p-1 outline-[#E6B0D92E]/50 text-lg"
              name="sortBy"
              value={formik.values.sortBy}
              onChange={formik.handleChange}
            >
              <option value={"none"} selected>
                None
              </option>
              <option value="cpc">CPC</option>
              <option value="score">Score</option>
              <option value="vol">Volume</option>
            </select>
          </div>
          <div className="basis-1/5">
            <label className="text-black/70 font-semibold text-sm">
              Enter Country
            </label>
            <select
              className="bg-[#E6B0D92E]/20 h-9 rounded-lg text-black/70 w-full p-1 outline-[#E6B0D92E]/50 text-lg"
              name="country"
              value={formik.values.country}
              onChange={formik.handleChange}
            >
              <option value="global">Global</option>
              {countries.map((country) => {
                return (
                  <option
                    key={country.code.toLowerCase()}
                    value={country.code.toLowerCase()}
                  >
                    {country.country}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <Button
          type="submit"
          className="w-full bg-primary rounded-sm my-4"
          onClick={() => console.log(formik.errors, formik.values)}
        >
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
            {filterResult().map((req, index) => {
              return (
                <Accordion key={index} title={req.text}>
                  <div className="max-w-md">
                    <div className="p-2 border-b border-[#DADADA]">
                      <div className="flex justify-between">
                        <h3 className="text-black/70 font-semibold">CPC</h3>
                        <span className="rounded-badge px-3 py-1 font-semibold text-primary bg-[#58126A33]">
                          {`${req.cpc}`}
                        </span>
                      </div>
                    </div>
                    <div className="p-2 border-b border-[#DADADA]">
                      <div className="flex justify-between items-center">
                        <h3 className="text-black/70 font-semibold">
                          Competition
                        </h3>
                        <span className="rounded-badge px-3 py-1 font-semibold text-primary bg-[#58126A33]">
                          {`${req.competition}`}
                        </span>
                      </div>
                    </div>
                    <div className="p-2 border-b border-[#DADADA]">
                      <div className="flex justify-between items-center">
                        <h3 className="text-black/70 font-semibold">Volume</h3>
                        <span className="rounded-badge px-3 py-1 font-semibold text-primary bg-[#58126A33]">
                          {`${req.vol}`}
                        </span>
                      </div>
                    </div>
                    <div className="p-2 border-b border-[#DADADA]">
                      <div className="flex justify-between items-center">
                        <h3 className="text-black/70 font-semibold">Score</h3>
                        <span className="">{req.score}</span>
                      </div>
                    </div>
                  </div>
                </Accordion>
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
const countries = [
  { code: "AR", country: "Argentina" },
  { code: "AU", country: "Australia" },
  { code: "BR", country: "Brazil" },
  { code: "CA", country: "Canada" },
  { code: "FI", country: "Finland" },
  { code: "FR", country: "France" },
  { code: "GE", country: "Georgia" },
  { code: "DE", country: "Germany" },
  { code: "HK", country: "Hong Kong" },
  { code: "HU", country: "Hungary" },
  { code: "IS", country: "Iceland" },
  { code: "IN", country: "India" },
  { code: "ID", country: "Indonesia" },
  { code: "IE", country: "Ireland" },
  { code: "IL", country: "Israel" },
  { code: "IT", country: "Italy" },
  { code: "JP", country: "Japan" },
  { code: "JE", country: "Jersey" },
  { code: "JO", country: "Jordan" },
  { code: "KW", country: "Kuwait" },
  { code: "LV", country: "Latvia" },
  { code: "MG", country: "Madagascar" },
  { code: "MW", country: "Malawi" },
  { code: "MY", country: "Malaysia" },
  { code: "MV", country: "Maldives" },
  { code: "MT", country: "Malta" },
  { code: "MU", country: "Mauritius" },
  { code: "YT", country: "Mayotte" },
  { code: "MX", country: "Mexico" },
  { code: "NP", country: "Nepal" },
  { code: "NL", country: "Netherlands" },
  { code: "NZ", country: "New Zealand" },
  { code: "NG", country: "Nigeria" },
  { code: "NF", country: "Norfolk Island" },
  { code: "NO", country: "Norway" },
  { code: "OM", country: "Oman" },
  { code: "PK", country: "Pakistan" },
  { code: "PW", country: "Palau" },
  { code: "PY", country: "Paraguay" },
  { code: "PE", country: "Peru" },
  { code: "PH", country: "Philippines" },
  { code: "PN", country: "Pitcairn" },
  { code: "PL", country: "Poland" },
  { code: "PT", country: "Portugal" },
  { code: "QA", country: "Qatar" },
  { code: "RO", country: "Romania" },
  { code: "RU", country: "Russian Federation" },
  { code: "SA", country: "Saudi Arabia" },
  { code: "SG", country: "Singapore" },
  { code: "ZA", country: "South Africa" },
  { code: "KR", country: "South Korea" },
  { code: "SS", country: "South Sudan" },
  { code: "ES", country: "Spain" },
  { code: "LK", country: "Sri Lanka" },
  { code: "SE", country: "Sweden" },
  { code: "CH", country: "Switzerland" },
  { code: "TH", country: "Thailand" },
  { code: "TR", country: "Turkey" },
  { code: "UG", country: "Uganda" },
  { code: "UA", country: "Ukraine" },
  { code: "GB", country: "United Kingdom" },
  { code: "UM", country: "United States Minor Outlying Islands" },
  { code: "US", country: "United States of America" },
  { code: "UY", country: "Uruguay" },
  { code: "UZ", country: "Uzbekistan" },
  { code: "VU", country: "Vanuatu" },
  { code: "VN", country: "Vietnam" },
  { code: "VG", country: "Virgin Islands, British" },
  { code: "VI", country: "Virgin Islands, U.S." },
];
