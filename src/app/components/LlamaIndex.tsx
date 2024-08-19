import { useState } from "react";
import ChunkButton from "./ChunkButton";
import { chunkText } from "../actions/llamaindex";
import { Chunks } from "../types";

type Props = {
  text: string;
  setOutput: React.Dispatch<React.SetStateAction<Chunks>>;
};

export default function LlamaIndex({ text, setOutput }: Readonly<Props>) {
  const [chunkSize, setChunkSize] = useState(1000);
  const [overlap, setOverlap] = useState(200);

  async function chunk() {
    console.log({ chunkSize, overlap });
    const output = await chunkText(text, chunkSize, overlap);
    setOutput(output);
  }

  return (
    <>
      <h2>
        Using{" "}
        <a href="https://www.npmjs.com/package/llamaindex" target="_blank">
          LlamaIndex
        </a>
      </h2>
      <div>
        <label htmlFor="llamaindex-chunk-size">Chunk size:</label>
        <input
          type="number"
          inputMode="numeric"
          id="llamaindex-chunk-size"
          name="llamaindex-chunk-size"
          value={chunkSize}
          onChange={(event) =>
            setChunkSize(parseInt(event.currentTarget.value, 10))
          }
        ></input>
      </div>
      <div>
        <label htmlFor="llamaindex-overlap">Overlap Size:</label>
        <input
          type="number"
          inputMode="numeric"
          id="llamaindex-overlap"
          name="llamaindex-overlap"
          value={overlap}
          onChange={(event) =>
            setOverlap(parseInt(event.currentTarget.value, 10))
          }
        ></input>
      </div>
      <ChunkButton chunkText={chunk} text={text} />
    </>
  );
}
