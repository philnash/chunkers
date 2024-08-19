"use server";

import {
  type Chunks,
  type LangchainSplitter,
  LANGCHAIN_SPLITTER_MAP,
} from "../types";
import { nanoid } from "nanoid";

export async function chunkText(
  splitter: LangchainSplitter,
  text: string,
  chunkSize: number,
  chunkOverlap: number
): Promise<Chunks> {
  const SplitterClass = LANGCHAIN_SPLITTER_MAP[splitter];
  const textSplitter = new SplitterClass({ chunkSize, chunkOverlap });
  const chunks = await textSplitter.splitText(text);
  return chunks.map((chunk) => ({ chunk, id: nanoid() }));
}
