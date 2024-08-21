import { useState, useEffect } from "react";
import { chunkText } from "../actions/llm-chunk";

import Output from "./Output";
import { useDebounce } from "../hooks/useDebounce";
import { Chunks, SplitterProps } from "../types";

type Splitter = "paragraph" | "sentence";

export default function LLMChunk({ text, selected }: Readonly<SplitterProps>) {
  const [output, setOutput] = useState<Chunks>([]);
  const [maxLength, setMaxLength] = useState(1024);
  const [minLength, setMinLength] = useState(0);
  const [overlap, setOverlap] = useState(128);
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

  async function chunk() {
    if (text.trim() === "") return;
    if (!selected) return;
    if (isNaN(maxLength) || isNaN(minLength) || isNaN(overlap)) return;
    const output = await chunkText(text, {
      overlap,
      splitter,
      maxLength,
      minLength,
    });
    setOutput(output);
  }

  const debouncedChunk = useDebounce(chunk);

  useEffect(() => {
    debouncedChunk();
  }, [text, maxLength, minLength, overlap, splitter, selected, debouncedChunk]);

  return (
    <>
      <h2>
        Using{" "}
        <a href="https://www.npmjs.com/package/llm-chunk" target="_blank">
          llm-chunk
        </a>
      </h2>
      <section className="options">
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
          <p>The maximum number of characters in a chunk</p>
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
          <p>The minimum number of characters in a chunk</p>
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
          <p>The number of overlap characters</p>
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
          <p>Split the text by paragraphs or sentences</p>
        </div>
      </section>
      <section>
        <Output chunks={output} text={text} />
      </section>
    </>
  );
}
