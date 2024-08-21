import { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";
import Output from "./Output";
import {
  chunkWithMarkdownParser,
  chunkWithSentenceSplitter,
  chunkWithSentenceWindowParser,
} from "../actions/llamaindex";
import { Chunks, LlamaindexSplitter, SplitterProps } from "../types";

const SPLITTERS = [
  "SentenceSplitter",
  "MarkdownNodeParser",
  "SentenceWindowNodeParser",
] as const;

export default function LlamaIndex({
  text,
  selected,
}: Readonly<SplitterProps>) {
  const [output, setOutput] = useState<Chunks>([]);
  const [chunkSize, setChunkSize] = useState(1024);
  const [overlap, setOverlap] = useState(128);
  const [window, setWindow] = useState(3);
  const [splitter, setSplitter] = useState<LlamaindexSplitter>(SPLITTERS[0]);

  async function chunk() {
    if (text.trim() === "") return;
    if (!selected) return;
    if (isNaN(chunkSize) || isNaN(window) || isNaN(overlap)) return;
    let output: Chunks = [];
    switch (splitter) {
      case "SentenceSplitter":
        output = await chunkWithSentenceSplitter(text, {
          chunkSize,
          chunkOverlap: overlap,
        });
        break;
      case "MarkdownNodeParser":
        output = await chunkWithMarkdownParser(text);
        break;
      case "SentenceWindowNodeParser":
        output = await chunkWithSentenceWindowParser(text, {
          windowSize: window,
        });
        break;
    }
    setOutput(output);
  }

  const debouncedChunk = useDebounce(chunk);

  useEffect(() => {
    debouncedChunk();
  }, [text, chunkSize, overlap, splitter, window, selected]);

  function isSplitter(splitter: string): splitter is LlamaindexSplitter {
    return SPLITTERS.includes(splitter as LlamaindexSplitter);
  }
  function setSplitterFromSelect(event: React.FormEvent<HTMLSelectElement>) {
    const splitter = event.currentTarget.value;
    if (isSplitter(splitter)) {
      setSplitter(splitter);
    }
  }

  return (
    <>
      <h2>
        Using{" "}
        <a href="https://www.npmjs.com/package/llamaindex" target="_blank">
          LlamaIndex
        </a>
      </h2>
      <section className="options">
        <div>
          <label htmlFor="llamaindex-splitter">Splitter: </label>
          <select
            name="llamaindex-splitter"
            id="llamaindex-splitter"
            value={splitter}
            onChange={setSplitterFromSelect}
          >
            {SPLITTERS.map((splitter) => (
              <option key={splitter} value={splitter}>
                {splitter}
              </option>
            ))}
          </select>
        </div>
        {splitter === "SentenceSplitter" && (
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
        )}
        {splitter === "SentenceSplitter" && (
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
        )}
        {splitter === "SentenceWindowNodeParser" && (
          <div>
            <label htmlFor="llamaindex-window">Window size:</label>
            <input
              type="number"
              inputMode="numeric"
              id="llamaindex-window"
              name="llamaindex-window"
              value={window}
              onChange={(event) =>
                setWindow(parseInt(event.currentTarget.value, 10))
              }
            ></input>
          </div>
        )}
      </section>
      <section>
        <Output chunks={output} />
      </section>
    </>
  );
}
