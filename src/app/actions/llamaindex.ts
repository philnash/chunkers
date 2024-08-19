"use server";

import { SentenceSplitter } from "@llamaindex/core/node-parser";
import { addIdsToChunks } from "./utils";

export async function chunkText(
  text: string,
  chunkSize: number,
  overlap: number
) {
  const splitter = new SentenceSplitter({ chunkSize, chunkOverlap: overlap });
  console.log(splitter.tokenSize(text));
  const chunks = splitter.splitText(text);
  return addIdsToChunks(chunks);
}
