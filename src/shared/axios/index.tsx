import { Axios } from "axios";
export const axios = new Axios({
  baseURL: (import.meta.env.VITE_apiUrl || "http://localhost:5000") + "/api",
  headers: {
    "Content-Type": "application/json",
  },
  transformRequest: [(data) => JSON.stringify(data)],
  transformResponse: [(data) => JSON.parse(data)],
});

export interface StandardHttpSuccess {
  success: true;
  message: string;
  data?: unknown;
  statusCode: number;
}

export interface StandardHttpError {
  success: boolean;
  message: string;
  statusCode: number;
}
