import { useState } from "react";
import {
  SupportedTextSplitterLanguage,
  SupportedTextSplitterLanguages,
} from "@langchain/textsplitters";

import ChunkButton from "./ChunkButton";

import { chunkText } from "../actions/langchain";
import { Chunks, LangchainSplitter } from "../types";

const SPLITTERS = [
  "CharacterTextSplitter",
  "RecursiveCharacterTextSplitter",
  "MarkdownTextSplitter",
] as const;

type Language = (typeof SupportedTextSplitterLanguages)[number];

type Props = {
  text: string;
  setOutput: React.Dispatch<React.SetStateAction<Chunks>>;
  setResult: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function Langchain({
  text,
  setOutput,
  setResult,
}: Readonly<Props>) {
  const [chunkSize, setChunkSize] = useState(1024);
  const [overlap, setOverlap] = useState(128);
  const [splitter, setSplitter] = useState<LangchainSplitter>(SPLITTERS[0]);
  const [language, setLanguage] = useState<Language | "">("");
  const [isPending, setIsPending] = useState(false);

  function isSplitter(splitter: string): splitter is LangchainSplitter {
    return SPLITTERS.includes(splitter as LangchainSplitter);
  }

  function setSplitterFromSelect(event: React.FormEvent<HTMLSelectElement>) {
    const selected = event.currentTarget.value;
    if (isSplitter(selected)) {
      setSplitter(selected);
    }
  }

  function isLanguage(language: string): language is Language {
    return SupportedTextSplitterLanguages.includes(
      language as SupportedTextSplitterLanguage
    );
  }

  function setLanguageFromSelect(event: React.FormEvent<HTMLSelectElement>) {
    const selected = event.currentTarget.value;
    if (isLanguage(selected)) {
      setLanguage(selected);
    } else {
      setLanguage("");
    }
  }

  async function chunk(event?: React.FormEvent) {
    if (event) {
      event.preventDefault();
    }
    setIsPending(true);
    const output = await chunkText(
      splitter,
      text,
      chunkSize,
      overlap,
      language ? language : undefined
    );
    setOutput(output);
    if (splitter === "RecursiveCharacterTextSplitter" && language) {
      setResult(
        `Chunked using the LangChain ${splitter} for ${language} with a chunkSize of ${chunkSize}, chunkOverlap of ${overlap}, and overlap of ${overlap}.`
      );
    } else {
      setResult(
        `Chunked using the LangChain ${splitter} with a chunkSize of ${chunkSize}, chunkOverlap of ${overlap}, and overlap of ${overlap}.`
      );
    }
    setIsPending(false);
  }

  return (
    <>
      <h2>
        Using{" "}
        <a
          href="https://www.npmjs.com/package/@langchain/textsplitters"
          target="_blank"
        >
          @langchain/textsplitters
        </a>
      </h2>
      <form onSubmit={chunk}>
        <div>
          <label htmlFor="lc-splitter">Splitter: </label>
          <select
            name="lc-splitter"
            id="lc-splitter"
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
        <div>
          <label htmlFor="lc-chunksize">Chunk Size:</label>
          <input
            type="number"
            inputMode="numeric"
            id="lc-chunksize"
            name="lc-chunksize"
            value={chunkSize}
            onChange={(event) =>
              setChunkSize(parseInt(event.currentTarget.value, 10))
            }
          ></input>
        </div>
        <div>
          <label htmlFor="lc-overlap">Overlap Size:</label>
          <input
            type="number"
            inputMode="numeric"
            id="lc-overlap"
            name="lc-overlap"
            value={overlap}
            onChange={(event) =>
              setOverlap(parseInt(event.currentTarget.value, 10))
            }
          ></input>
        </div>
        {splitter === "RecursiveCharacterTextSplitter" && (
          <div>
            <label htmlFor="lc-language">Language:</label>
            <select
              name="lc-language"
              id="lc-language"
              value={language}
              onChange={setLanguageFromSelect}
            >
              {" "}
              <option key="none" value=""></option>
              {SupportedTextSplitterLanguages.map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>
          </div>
        )}
        <ChunkButton isPending={isPending} chunkText={chunk} text={text} />
      </form>
    </>
  );
}
