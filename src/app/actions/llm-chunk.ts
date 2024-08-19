"use server";

import { chunk } from "llm-chunk";
import { type Chunks } from "../types";
import { addIdsToChunks } from "./utils";

type SplitOptions = {
  minLength?: number;
  maxLength?: number;
  overlap?: number;
  splitter?: "sentence" | "paragraph";
  delimiters?: string;
};

export async function chunkText(
  text: string,
  options: SplitOptions
): Promise<Chunks> {
  const chunks = chunk(text, options);
  return addIdsToChunks(chunks);
}
