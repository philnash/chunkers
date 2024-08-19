import { useState } from "react";

import { chunkText } from "../actions/semantic-chunking";

import ChunkButton from "./ChunkButton";
import { Chunks } from "../types";

type Props = {
  text: string;
  setOutput: React.Dispatch<React.SetStateAction<Chunks>>;
};

export default function SemanticChunking({ text, setOutput }: Readonly<Props>) {
  const [maxTokenSize, setMaxTokenSize] = useState(500);
  const [similarityThreshold, setSimilarityThreshold] = useState(0.456);

  async function chunk(event?: React.FormEvent) {
    if (event) {
      event.preventDefault();
    }
    const output = await chunkText(text, {
      maxTokenSize,
      similarityThreshold,
    });
    setOutput(output);
  }

  return (
    <>
      <h2>
        Using{" "}
        <a
          href="https://www.npmjs.com/package/semantic-chunking"
          target="_blank"
        >
          semantic-chunking
        </a>
      </h2>
      <form onSubmit={chunk}>
        <div>
          <label htmlFor="semchunk-max-token-size">Max length:</label>
          <input
            type="number"
            inputMode="numeric"
            id="semchunk-max-token-size"
            name="semchunk-max-token-size"
            value={maxTokenSize}
            onChange={(event) =>
              setMaxTokenSize(parseInt(event.currentTarget.value, 10))
            }
          ></input>
          <p>The maximum number of tokens in a chunk</p>
        </div>
        <div>
          <label htmlFor="semchunk-sim-threshold">Similarity threshold:</label>
          <input
            type="number"
            inputMode="decimal"
            id="semchunk-sim-threshold"
            name="semchunk-sim-threshold"
            max="1.0"
            min="0"
            step="0.01"
            value={similarityThreshold}
            onChange={(event) =>
              setSimilarityThreshold(parseFloat(event.currentTarget.value))
            }
          ></input>
          <p>
            The minimum cosine similarity required for two sentences to be
            included in the same chunk.
          </p>
        </div>
        <ChunkButton chunkText={chunk} text={text} />
      </form>
    </>
  );
}
