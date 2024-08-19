import { useState } from "react";

import { chunkText } from "../actions/llm-chunk";

import ChunkButton from "./ChunkButton";
import { Chunks } from "../types";

type Props = {
  text: string;
  setOutput: React.Dispatch<React.SetStateAction<Chunks>>;
};

type Splitter = "paragraph" | "sentence";

export default function LLMChunk({ text, setOutput }: Readonly<Props>) {
  const [maxLength, setMaxLength] = useState(1024);
  const [minLength, setMinLength] = useState(0);
  const [overlap, setOverlap] = useState(200);
  const [splitter, setSplitter] = useState<Splitter>("paragraph");

  function isSplitter(splitter: string): splitter is Splitter {
    return ["paragraph", "sentence"].includes(splitter);
  }

  function setSplitterFromSelect(event: React.FormEvent<HTMLSelectElement>) {
    const selected = event.currentTarget.value;
    if (isSplitter(selected)) {
      setSplitter(selected);
    }
  }

  async function chunk(event?: React.FormEvent) {
    if (event) {
      event.preventDefault();
    }
    const output = await chunkText(text, {
      overlap,
      splitter,
      maxLength: maxLength,
    });
    setOutput(output);
  }

  return (
    <>
      <h2>
        Using{" "}
        <a href="https://www.npmjs.com/package/llm-chunk" target="_blank">
          llm-chunk
        </a>
      </h2>
      <form onSubmit={chunk}>
        <div>
          <label htmlFor="llmchunk-max-length">Max length:</label>
          <input
            type="number"
            inputMode="numeric"
            id="llmchunk-max-length"
            name="llmchunk-max-length"
            value={maxLength}
            onChange={(event) =>
              setMaxLength(parseInt(event.currentTarget.value, 10))
            }
          ></input>
        </div>
        <div>
          <label htmlFor="llmchunk-min-length">Min length:</label>
          <input
            type="number"
            inputMode="numeric"
            id="llmchunk-min-length"
            name="llmchunk-min-length"
            value={minLength}
            onChange={(event) =>
              setMinLength(parseInt(event.currentTarget.value, 10))
            }
          ></input>
        </div>
        <div>
          <label htmlFor="llmchunk-overlap">Overlap Size:</label>
          <input
            type="number"
            inputMode="numeric"
            id="llmchunk-overlap"
            name="llmchunk-overlap"
            value={overlap}
            onChange={(event) =>
              setOverlap(parseInt(event.currentTarget.value, 10))
            }
          ></input>
        </div>
        <div>
          <label htmlFor="llmchunk-splitter">Splitter:</label>
          <select
            id="llmchunk-splitter"
            name="llmchunk-splitter"
            value={splitter}
            onChange={setSplitterFromSelect}
          >
            <option value="paragraph">Paragraph</option>
            <option value="sentence">Sentence</option>
          </select>
        </div>
        <ChunkButton chunkText={chunk} text={text} />
      </form>
    </>
  );
}
