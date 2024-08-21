import styles from "./Chunk.module.css";
import { Chunks } from "../types";
import Chunk from "./Chunk";
import "./Output.css";

type OutputProps = {
  chunks: Chunks;
  text: string;
};

export default function Output({ chunks, text }: Readonly<OutputProps>) {
  if (chunks.length === 0) return;
  return (
    <>
      <div className="card">
        <p>
          {chunks.length} chunks from {text.length} characters.
        </p>
        <p>
          Overlapping content is highlighted{" "}
          <span className={styles["overlap-after"]}>
            like this if it overlaps with the next chunk
          </span>{" "}
          or{" "}
          <span className={styles["overlap-before"]}>
            like this if it overlaps with the previous chunk
          </span>
          .
        </p>
      </div>
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
              chunkNumber={index + 1}
            ></Chunk>
          );
        })}
      </output>
    </>
  );
}
