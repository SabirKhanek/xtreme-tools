import { toast } from "react-toastify";
import { StandardHttpResponse, axios } from "../shared/axios";

export async function getToolUsage(toolId: string) {
  const resp = await axios.get<
    StandardHttpResponse<{
      uid: number;
      usage: number;
      quota: number;
      exceeded: boolean;
    }>
  >(`/tool_usage?toolId=${toolId}`);
  if (resp.data.success) {
    return resp.data;
  } else {
    toast.error(resp.data.message);
  }
}
