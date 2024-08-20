"use server";

import {
  RecursiveCharacterTextSplitter,
  SupportedTextSplitterLanguage,
} from "@langchain/textsplitters";
import {
  type Chunks,
  type LangchainSplitter,
  LANGCHAIN_SPLITTER_MAP,
} from "../types";
import { addIdsToChunks } from "./utils";

export async function chunkText(
  splitter: LangchainSplitter,
  text: string,
  chunkSize: number,
  chunkOverlap: number,
  language?: SupportedTextSplitterLanguage
): Promise<Chunks> {
  const SplitterClass = LANGCHAIN_SPLITTER_MAP[splitter];
  if (SplitterClass === RecursiveCharacterTextSplitter && language) {
    const codeSplitter = SplitterClass.fromLanguage(language, {
      chunkSize,
      chunkOverlap,
    });
    const chunks = await codeSplitter.splitText(text);
    return addIdsToChunks(chunks);
  } else {
    const textSplitter = new SplitterClass({ chunkSize, chunkOverlap });
    const chunks = await textSplitter.splitText(text);
    return addIdsToChunks(chunks);
  }
}
