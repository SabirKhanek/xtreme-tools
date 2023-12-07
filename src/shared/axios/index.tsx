import { Axios } from "axios";
export const axios = new Axios({
  baseURL: import.meta.env.VITE_apiUrl || "/api",
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
