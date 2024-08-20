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
  setResult: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function LlamaIndex({
  text,
  setOutput,
  setResult,
}: Readonly<Props>) {
  const [chunkSize, setChunkSize] = useState(1024);
  const [overlap, setOverlap] = useState(128);
  const [window, setWindow] = useState(3);
  const [splitter, setSplitter] = useState<LlamaindexSplitter>(SPLITTERS[0]);
  const [isPending, setIsPending] = useState(false);

  async function chunk(event?: React.FormEvent) {
    if (event) {
      event.preventDefault();
    }
    let output: Chunks = [];
    let resultText: string;
    setIsPending(true);
    switch (splitter) {
      case "SentenceSplitter":
        output = await chunkWithSentenceSplitter(text, {
          chunkSize,
          chunkOverlap: overlap,
        });
        resultText = `Chunked using LlamaIndex SentenceSplitter with a chunk size of ${chunkSize} and an overlap of ${overlap}.`;
        break;
      case "MarkdownNodeParser":
        output = await chunkWithMarkdownParser(text);
        resultText = `Chunked using LlamaIndex MarkdownNodeParser.`;
        break;
      case "SentenceWindowNodeParser":
        resultText = `Chunked using LlamaIndex SentenceWindowNodeParser with a window size of ${window}.`;
        output = await chunkWithSentenceWindowParser(text, {
          windowSize: window,
        });
        break;
    }
    setOutput(output);
    setResult(resultText);
    setIsPending(false);
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
        <ChunkButton isPending={isPending} chunkText={chunk} text={text} />
      </form>
    </>
  );
}
