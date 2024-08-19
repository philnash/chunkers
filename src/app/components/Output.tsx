import { Chunks } from "../types";
import Chunk from "./Chunk";
import "./Output.css";

type OutputProps = {
  chunks: Chunks;
};

export default function Output({ chunks }: Readonly<OutputProps>) {
  return (
    <output>
      {chunks.map((chunk, index) => {
        const previousText = chunks[index - 1]
          ? chunks[index - 1].chunk
          : undefined;
        const nextText = chunks[index + 1]
          ? chunks[index + 1].chunk
          : undefined;
        return (
          <Chunk
            key={chunk.id}
            previousText={previousText}
            text={chunk.chunk}
            nextText={nextText}
          ></Chunk>
        );
      })}
    </output>
  );
}

// A function to find the overlap between two strings
