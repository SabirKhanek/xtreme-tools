import { FaLink } from "react-icons/fa";
import { Accordion } from "../../../../../components/accordion";
import { BacklinkCheckerResponseData } from "../../../../../services/seo";

export interface BacklinksDataProps {
  className?: string;
  backlinks: BacklinkCheckerResponseData["backlinks"];
}
export function BacklinksData({ className, backlinks }: BacklinksDataProps) {
  return (
    <div>
      <div className={`overflow-y-auto max-h-96 ${className}`}>
        {backlinks.map((backlink, index) => {
          return (
            <Accordion key={index} title={backlink.url_from}>
              <div className="max-w-md">
                <div className="p-2 border-b border-[#DADADA]">
                  <div className="flex justify-between">
                    <h3 className="text-black/70 font-semibold">To</h3>
                    <span className="hover:underline basis-1/2 text-right grow-0 break-words">
                      <a href={backlink.url_to}>{backlink.url_to}</a>
                    </span>
                  </div>
                </div>
                <div className="p-2 border-b border-[#DADADA]">
                  <div className="flex justify-between items-center">
                    <h3 className="text-black/70 font-semibold">Page Rank</h3>
                    <span className="rounded-badge px-3 py-1 font-semibold text-primary bg-[#58126A33]">
                      {backlink.inlink_rank}
                    </span>
                  </div>
                </div>
                <div className="p-2 border-b border-[#DADADA]">
                  <div className="flex justify-between items-center">
                    <h3 className="text-black/70 font-semibold">Domain Rank</h3>
                    <span className="rounded-badge px-3 py-1 font-semibold text-primary bg-[#58126A33]">
                      {backlink.domain_inlink_rank}
                    </span>
                  </div>
                </div>
                <div className="p-2 border-b border-[#DADADA]">
                  <div className="flex justify-between items-center">
                    <h3 className="text-black/70 font-semibold">Anchor</h3>
                    <span className="">{backlink.anchor}</span>
                  </div>
                </div>
                <div className="p-2 border-b border-[#DADADA]">
                  <div className="flex justify-between items-center">
                    <h3 className="text-black/70 font-semibold">First Seen</h3>
                    <span className="">{backlink.first_seen}</span>
                  </div>
                </div>
                <div className="p-2 border-b border-[#DADADA]">
                  <div className="flex justify-between items-center">
                    <h3 className="text-black/70 font-semibold">Link</h3>
                    <a
                      href={backlink.url_from}
                      className="flex items-center gap-2 px-2 py-1 rounded-badge border border-primary"
                    >
                      <FaLink className="text-primary" />
                      <span className="text-primary">Link</span>
                    </a>
                  </div>
                </div>
              </div>
            </Accordion>
          );
        })}
      </div>
      <div className="mt-2">Showing {backlinks.length} backlinks</div>
    </div>
  );
}
