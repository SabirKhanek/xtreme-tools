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
  email: string;
  code: number;
  role: boolean;
  free_email: boolean;
  result: string;
  reason: string;
  send_transactional: number;
  did_you_mean: string;
}
export async function validateEmail(email: string) {
  const resp = await axios.post<StandardHttpResponse<EmailCheckData>>(
    "/email-marketing/email-check",
    { email }
  );
  return resp.data;
}
