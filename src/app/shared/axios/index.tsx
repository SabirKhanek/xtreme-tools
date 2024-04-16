import { Axios } from "axios";
export const axios = new Axios({
  baseURL: process.env.NEXT_PUBLIC_API_BASE || "/api",
  headers: {
    "Content-Type": "application/json",
  },
  transformRequest: [(data) => JSON.stringify(data)],
  transformResponse: [(data) => JSON.parse(data)],
});

export interface StandardHttpResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  statusCode: number;
}
axios.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `${localStorage.getItem("jwt") || ""}`;
    return config;
  },
  (err) => Promise.reject(err)
);
