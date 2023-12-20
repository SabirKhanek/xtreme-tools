import { useState } from "react";
import {
  BacklinkCheckerResponseData,
  backlinksChecker,
} from "../../../../services/seo";
import { BacklinksCheckerDecscription } from "./details";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Input } from "../../../../components/input";
import { Button } from "../../../../components/button";
import { FaCheck, FaSearch } from "react-icons/fa";
import { ToolBody } from "../../../../components/toolBody";
import { BacklinksData } from "./component/backlinksData";
import { Tool } from "../../types/tool";
import { ToolUsage } from "../../components/toolUsage";

export interface BacklinksCheckerProps extends Tool {
  className?: string;
}
function countDoFollowAndNoFollowBacklinks(
  rootObject: BacklinkCheckerResponseData
): {
  doFollow: number;
  noFollow: number;
} {
  const counts = rootObject.counts.backlinks;
  const totalBacklinks = counts.total;

  // Counting Do Follow Backlinks
  const doFollowBacklinks = rootObject.backlinks.filter(
    (backlink) => !backlink.nofollow
  ).length;

  // Counting No Follow Backlinks
  const noFollowBacklinks = totalBacklinks - doFollowBacklinks;

  return {
    doFollow: doFollowBacklinks,
    noFollow: noFollowBacklinks,
  };
}
export function BacklinksChecker({
  className,
  toolId,
  requireLogin,
}: BacklinksCheckerProps) {
  const [usage, setUsage] = useState({ used: 0, quota: 10 });

  const [result, setResult] = useState<BacklinkCheckerResponseData | null>();
  const [resultDomain, setResultDomain] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: { url: "" },
    onSubmit: (v) => {
      const getBacklinks = async () => {
        if (usage.quota <= usage.used) {
          toast.info("Limit reached");
          return;
        }
        setIsLoading(true);
        try {
          const resp = await backlinksChecker(v.url);
          if (resp.success) {
            setResult(resp.data);
            setResultDomain(v.url);
            setUsage({ used: usage.used + 1, quota: usage.quota });
          } else {
            toast.error(`${resp.statusCode}: ${resp.message}`);
          }
        } catch (err) {
          toast.error("Something went wrong");
        }
        setIsLoading(false);
      };
      if (!isLoading) getBacklinks();
    },
    validationSchema: Yup.object({
      url: Yup.string()
        .matches(/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Enter valid domain")
        .required(),
    }),
  });
  return (
    <ToolBody
      heading="Backlinks Checker"
      subheading="Check and get detailed backlinks in second for free"
      ToolDescription={BacklinksCheckerDecscription}
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
        <Button type="submit" className="bg-primary my-4 !rounded-md">
          <span className="inline-flex gap-1 text-white items-center">
            <FaSearch />
            <span>Find</span>
          </span>
        </Button>
      </form>
      <div
        className={`flex justify-center items-center ${
          result || isLoading ? "my-10" : ""
        }`}
      >
        {isLoading && <span className="loading loading-ring w-14"></span>}
        {!isLoading && result && (
          <span className="inline-flex flex-col gap-2 justify-center items-center">
            <span className="rounded-full w-14 h-14 border-[3px] border-primary flex justify-center items-center">
              <FaCheck className="text-xl text-primary" />
            </span>
            <span className="text-primary font-semibold">Success!</span>
          </span>
        )}
      </div>
      {result && (
        <>
          <div className="bg-[#58126A1A] w-full p-4">
            <div className="justify-center flex text-black/70 mb-5 font-semibold">
              {resultDomain}
            </div>
            <div className="grid grid-cols-4 gap-y-5 justify-center content-center">
              <div className="flex flex-col gap-2 items-center">
                <span className="px-4 py-1 rounded-3xl text-primary bg-[#58126A33] font-bold">
                  {result.counts.backlinks.total}
                </span>
                <span>Backlinks</span>
              </div>

              <div className="flex flex-col gap-2 items-center">
                <span className="px-4 py-1 rounded-3xl text-primary bg-[#58126A33] font-bold">
                  {result.counts.domains.total}
                </span>
                <span>Ref Domains</span>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <span className="px-4 py-1 rounded-3xl text-primary bg-[#58126A33] font-bold">
                  {result.counts.cBlocks.total}
                </span>
                <span>Subnets</span>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <span className="px-4 py-1 rounded-3xl text-primary bg-[#58126A33] font-bold">
                  {result.counts.ips.total}
                </span>
                <span>Ips</span>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <span className="px-4 py-1 rounded-3xl text-primary bg-[#58126A33] font-bold">
                  {result.counts.anchors.total}
                </span>
                <span>Anchors</span>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <span className="px-4 py-1 rounded-3xl text-primary bg-[#58126A33] font-bold">
                  {result.counts.anchorUrls}
                </span>
                <span>Anchor Urls</span>
              </div>
              {(() => {
                const { doFollow, noFollow } =
                  countDoFollowAndNoFollowBacklinks(result);
                return (
                  <>
                    <div className="flex flex-col gap-2 items-center">
                      <span className="px-4 py-1 rounded-3xl text-primary bg-[#58126A33] font-bold">
                        {doFollow}
                      </span>
                      <span>Do Follow Backlinks</span>
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                      <span className="px-4 py-1 rounded-3xl text-primary bg-[#58126A33] font-bold">
                        {noFollow}
                      </span>
                      <span>No Follow Backlinks</span>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
          <div className="my-3 bg-white shadow-md rounded-2xl w-full p-4">
            <div className="flex justify-center">
              <h3 className="font-semibold text-lg text-black/70">
                Backlinks Data
              </h3>
            </div>
            <BacklinksData backlinks={result.backlinks}></BacklinksData>
          </div>
        </>
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
