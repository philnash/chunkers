import { useState, useEffect } from "react";
import {
  SupportedTextSplitterLanguage,
  SupportedTextSplitterLanguages,
} from "@langchain/textsplitters";

import { useDebounce } from "../hooks/useDebounce";
import { chunkText } from "../actions/langchain";
import Output from "./Output";
import { Chunks, LangchainSplitter, SplitterProps } from "../types";

const SPLITTERS = [
  "CharacterTextSplitter",
  "RecursiveCharacterTextSplitter",
  "MarkdownTextSplitter",
] as const;

type Language = (typeof SupportedTextSplitterLanguages)[number];

export default function Langchain({ text, selected }: Readonly<SplitterProps>) {
  const [output, setOutput] = useState<Chunks>([]);
  const [chunkSize, setChunkSize] = useState(1024);
  const [overlap, setOverlap] = useState(128);
  const [splitter, setSplitter] = useState<LangchainSplitter>(SPLITTERS[0]);
  const [language, setLanguage] = useState<Language | "">("");

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

  async function chunk() {
    if (text.trim() === "") return;
    if (!selected) return;
    if (isNaN(chunkSize) || isNaN(overlap)) return;
    const output = await chunkText(
      splitter,
      text,
      chunkSize,
      overlap,
      language ? language : undefined
    );
    setOutput(output);
  }

  const debouncedChunk = useDebounce(chunk);

  useEffect(() => {
    debouncedChunk();
  }, [text, chunkSize, overlap, splitter, language, selected, debouncedChunk]);

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
      <section className="options">
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
          <p>The LangChain text splitter to use</p>
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
          <p>The number of characters per chunk</p>
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
          <p>The number of characters in the overlap between chunks</p>
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
            <p>
              The RecursiveCharacterTextSplitter can intelligently split code as
              well as just text. Pick the language you are trying to split
            </p>
          </div>
        )}
      </section>
      <section>
        <Output chunks={output} text={text} />
      </section>
    </>
  );
}
