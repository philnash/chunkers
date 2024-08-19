import { useState } from "react";
import ChunkButton from "./ChunkButton";
import {
  chunkWithMarkdownParser,
  chunkWithSentenceSplitter,
  chunkWithSentenceWindowParser,
} from "../actions/llamaindex";
import { Chunks, LlamaindexSplitter } from "../types";

const SPLITTERS = [
  "SentenceSplitter",
  "MarkdownNodeParser",
  "SentenceWindowNodeParser",
] as const;

type Props = {
  text: string;
  setOutput: React.Dispatch<React.SetStateAction<Chunks>>;
};

export default function LlamaIndex({ text, setOutput }: Readonly<Props>) {
  const [chunkSize, setChunkSize] = useState(1000);
  const [overlap, setOverlap] = useState(200);
  const [window, setWindow] = useState(3);
  const [splitter, setSplitter] = useState<LlamaindexSplitter>(SPLITTERS[0]);

  async function chunk(event?: React.FormEvent) {
    if (event) {
      event.preventDefault();
    }
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
      <form onSubmit={chunk}>
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
        <ChunkButton chunkText={chunk} text={text} />
      </form>
    </>
  );
}
