import { StandardHttpResponse, axios } from "../shared/axios";

export async function subscribeToNewsletter(email: string) {
  const resp = await axios.post<
    StandardHttpResponse<{ email: string; subscribed: boolean }>
  >("/newsletter/subscribe", { email });
  return resp.data;
}
