import { StandardHttpResponse, axios } from "../shared/axios";

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

export interface EmailCheckData {
  valid: boolean;
  block: boolean;
  disposable: boolean;
  domain: string;
  text: string;
  risk?: number;
  reason: string;
  mx_host: string;
  possible_typo: string[];
  mx_info: string;
  mx_ip: string;
}
export async function validateEmail(email: string) {
  const resp = await axios.post<StandardHttpResponse<EmailCheckData>>(
    "/email-marketing/email-check",
    { email }
  );
  return resp.data;
}
