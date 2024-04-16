import { Axios } from "axios";

export async function generateFavicon(image: File, is16x16: boolean) {
  const formData = new FormData();
  formData.append("inputImg", image);
  const axios = new Axios({
    baseURL: process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000",
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  const response = await axios.post(
    `/web/favicon_generator${is16x16 ? "?only16=true" : ""}`,
    formData
  );
  return response.data;
}
