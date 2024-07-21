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

export async function compressImage(
  image: File,
  width?: number,
  height?: number,
  quality?: number
) {
  const formData = new FormData();
  formData.append("image_file", image);
  const axios = new Axios({
    baseURL: process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000",
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  const response = await axios.post(
    `/web/image-compressor?${width ? `width=${width}&` : ""}${
      height ? `width=${height}&` : ""
    }${quality ? `quality=${quality}` : ""}`,
    formData
  );
  return response.data;
}

export async function convertPdf(file: File) {
  const formData = new FormData();
  formData.append("inputFile", file);
  const axios = new Axios({
    baseURL: process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `${localStorage.getItem("jwt") || ""}`,
    },
  });
  const response = await axios.post(`/web/pdf-converter`, formData);
  return response.data;
}
