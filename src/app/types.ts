import {
  CharacterTextSplitter,
  RecursiveCharacterTextSplitter,
  MarkdownTextSplitter,
} from "@langchain/textsplitters";

import {
  SentenceSplitter,
  MarkdownNodeParser,
  SentenceWindowNodeParser,
} from "@llamaindex/core/node-parser";

export type Chunk = {
  chunk: string;
  id: string;
};

export type Chunks = Array<Chunk>;
export type SplitterProps = {
  text: string;
  selected: boolean;
};

export const LANGCHAIN_SPLITTER_MAP = {
  CharacterTextSplitter: CharacterTextSplitter,
  RecursiveCharacterTextSplitter: RecursiveCharacterTextSplitter,
  MarkdownTextSplitter: MarkdownTextSplitter,
} as const;

export type LangchainSplitter = keyof typeof LANGCHAIN_SPLITTER_MAP;

export const LLAMAINDEX_SPLITTER_MAP = {
  SentenceSplitter: SentenceSplitter,
  MarkdownNodeParser: MarkdownNodeParser,
  SentenceWindowNodeParser: SentenceWindowNodeParser,
} as const;

export type LlamaindexSplitter = keyof typeof LLAMAINDEX_SPLITTER_MAP;
