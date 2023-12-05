import { axios } from "../shared/axios";

export async function generateContent(input: string) {
  const resp = await axios.get(`/ai/write?userInput=${input}`);
  return resp.data;
}

export async function generateOutilne(input: string) {
  const resp = await axios.get(`/ai/generate_outline?userInput=${input}`);
  return resp.data;
}

export async function paraphraseText(input: string) {
  const resp = await axios.post("/ai/rewrite", {
    userInput: input,
  });
  return resp.data;
}
