import { nanoid } from "nanoid";
import { type Chunks } from "../types";

export function addIdsToChunks(chunks: string[]): Chunks {
  return chunks.map((chunk) => ({ chunk, id: nanoid() }));
}
