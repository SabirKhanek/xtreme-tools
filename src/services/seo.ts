import { StandardHttpResponse, axios } from "../shared/axios";
export interface domainAuthorityCheckerResponseData {
  target: string;
  da_score: number;
  pa_score: number;
  spam_score: number;
  total_backlinks: number;
}
export async function domainAuthorityChecker(url: string) {
  const response = await axios.post<
    StandardHttpResponse<domainAuthorityCheckerResponseData>
  >("/seo/da_pa", {
    target: url,
  });
  return response.data;
}

interface Backlink {
  url_from: string;
  url_to: string;
  title: string;
  anchor: string;
  alt: string;
  nofollow: boolean;
  image: boolean;
  image_source: string;
  inlink_rank: number;
  domain_inlink_rank: number;
  first_seen: string;
  last_visited: string;
}

interface TopTLD {
  line: { label: string; count: number }[];
}

interface TopCountry {
  line: { code: string; label: string; count: number }[];
}

interface TopAnchorsByBacklinks {
  line: { anchor: string; text: boolean; count: number }[];
}

interface TopAnchorsByDomains {
  line: { anchor: string | null; text: boolean; count: number }[];
}

interface TopAnchorUrlsByBacklinks {
  line: { label: string; count: number }[];
}

interface TopAnchorUrlsByDomains {
  line: { label: string; count: number }[];
}

interface Counts {
  backlinks: {
    total: number;
    doFollow: number;
    fromHomePage: number;
    doFollowFromHomePage: number;
    text: number;
    toHomePage: number;
  };
  domains: {
    total: number;
    doFollow: number;
    fromHomePage: number;
    toHomePage: number;
  };
  ips: {
    total: number;
    doFollow: number;
  };
  cBlocks: {
    total: number;
    doFollow: number;
  };
  anchors: {
    total: number;
    doFollow: number;
  };
  anchorUrls: number;
  topTLD: TopTLD;
  topCountry: TopCountry;
  topAnchorsByBacklinks: TopAnchorsByBacklinks;
  topAnchorsByDomains: TopAnchorsByDomains;
  topAnchorUrlsByBacklinks: TopAnchorUrlsByBacklinks;
  topAnchorUrlsByDomains: TopAnchorUrlsByDomains;
}

export interface BacklinkCheckerResponseData {
  counts: Counts;
  backlinks: Backlink[];
}

export async function backlinksChecker(url: string) {
  const response = await axios.post<
    StandardHttpResponse<BacklinkCheckerResponseData>
  >("/seo/backlinks", {
    domain: url,
  });
  return response.data;
}

export interface KeywordCheckerResponseData {
  text: string;
  cpc: string;
  vol: number;
  v: number;
  competition: "low" | "medium" | "high";
  score: number;
}
export async function keywordChecker(keyword: string, country: string) {
  const response = await axios.post<
    StandardHttpResponse<KeywordCheckerResponseData[]>
  >("/seo/keywords", {
    keyword,
    country: country === "global" ? undefined : country,
  });
  return response.data;
}
