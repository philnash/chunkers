import {
  CharacterTextSplitter,
  RecursiveCharacterTextSplitter,
  MarkdownTextSplitter,
} from "@langchain/textsplitters";

export type Chunk = {
  chunk: string;
  id: string;
};

export type Chunks = Array<Chunk>;

export const LANGCHAIN_SPLITTER_MAP = {
  CharacterTextSplitter: CharacterTextSplitter,
  RecursiveCharacterTextSplitter: RecursiveCharacterTextSplitter,
  MarkdownTextSplitter: MarkdownTextSplitter,
} as const;

export type LangchainSplitter = keyof typeof LANGCHAIN_SPLITTER_MAP;
export const LANGCHAIN_SPLITTERS = Object.keys(LANGCHAIN_SPLITTER_MAP);
