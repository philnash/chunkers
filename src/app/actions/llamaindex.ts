"use server";

import z from "zod";
import {
  sentenceSplitterSchema,
  sentenceWindowNodeParserSchema,
  Document,
} from "@llamaindex/core/schema";
import {
  SentenceSplitter,
  MarkdownNodeParser,
  SentenceWindowNodeParser,
} from "@llamaindex/core/node-parser";
import { addIdsToChunks } from "./utils";

export async function chunkWithSentenceSplitter(
  text: string,
  params: Partial<z.infer<typeof sentenceSplitterSchema>>
) {
  const splitter = new SentenceSplitter(params);
  const chunks = splitter.splitText(text);
  return addIdsToChunks(chunks);
}

export async function chunkWithMarkdownParser(text: string) {
  const splitter = new MarkdownNodeParser();
  const nodes = splitter.getNodesFromDocuments([new Document({ text })]);
  return nodes.map((node) => ({ chunk: node.text, id: node.id_ }));
}

export async function chunkWithSentenceWindowParser(
  text: string,
  params: Partial<z.infer<typeof sentenceWindowNodeParserSchema>>
) {
  const splitter = new SentenceWindowNodeParser(params);
  console.log(splitter);
  const nodes = splitter.getNodesFromDocuments([new Document({ text })]);
  console.log(nodes);
  return nodes.map((node) => ({ chunk: node.metadata.window, id: node.id_ }));
}
