import { axios } from "../shared/axios";

export interface TestSMTPRequest {
  host: string;
  port: number;
  secure: "none" | "auto";
  from: string;
  to: string;
  username?: string;
  password?: string;
}
export async function testSMTP(obj: TestSMTPRequest) {
  const res = await axios.post("/email-marketing/test-smtp", obj);
  return res.data;
}
