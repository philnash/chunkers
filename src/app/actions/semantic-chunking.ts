"use server";

import { chunkit, type ChunkitOptions } from "semantic-chunking";
import { addIdsToChunks } from "./utils";

export async function chunkText(text: string, params: ChunkitOptions) {
  const chunks = await chunkit(text, params);
  return addIdsToChunks(chunks);
}
