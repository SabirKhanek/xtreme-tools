import { axios } from "../shared/axios";

export async function generateContent(input: string) {
  if (input.length <= 5) return;
  const resp = await axios.get(`/ai/write?userInput=${input}`);
  return resp.data;
}

export async function generateOutilne(input: string) {
  const resp = await axios.get(`/ai/generate_outline?userInput=${input}`);
  return resp.data;
}