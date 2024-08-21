import { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";

import { chunkText } from "../actions/semantic-chunking";

import Output from "./Output";
import { Chunks, SplitterProps } from "../types";

export default function SemanticChunking({
  text,
  selected,
}: Readonly<SplitterProps>) {
  const [output, setOutput] = useState<Chunks>([]);
  const [maxTokenSize, setMaxTokenSize] = useState(1024);
  const [similarityThreshold, setSimilarityThreshold] = useState(0.456);

  async function chunk(event?: React.FormEvent) {
    if (text.trim() === "") return;
    if (!selected) return;
    if (isNaN(maxTokenSize) || isNaN(similarityThreshold)) return;
    const output = await chunkText(text, {
      maxTokenSize,
      similarityThreshold,
    });
    setOutput(output);
  }

  const debouncedChunk = useDebounce(chunk);

  useEffect(() => {
    debouncedChunk();
  }, [text, maxTokenSize, similarityThreshold, selected]);

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
      <section className="options">
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
      </section>
      <section>
        <Output chunks={output} />
      </section>
    </>
  );
}
