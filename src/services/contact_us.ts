import { axios } from "../shared/axios";

export async function sendContactUsMessage(obj: {
  name: string;
  email: string;
  message: string;
  phone: string;
}) {
  const response = await axios.post("/send_contact_message", obj);
  return response.data;
}
