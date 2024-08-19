declare module "semantic-chunking" {
  export type ChunkitOptions = {
    maxTokenSize: number;
    similarityThreshold: number;
  };
  export async function chunkit(
    text: string,
    chunkitOptions: ChunkitOptions
  ): string[];
}
