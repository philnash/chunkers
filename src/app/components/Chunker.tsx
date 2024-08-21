"use client";
import "react-tabs/style/react-tabs.css";
import "./Form.css";
import styles from "./Chunker.module.css";
import { useState } from "react";

import { Chunks } from "../types";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
import Input from "./Input";
import Output from "./Output";
import LLMChunk from "./LLMChunk";
import Langchain from "./Langchain";
import LlamaIndex from "./LlamaIndex";
import SemanticChunking from "./SemanticChunking";

export default function Chunker() {
  const [text, setText] = useState("");
  const [output, setOutput] = useState<Chunks>([]);
  const [result, setResult] = useState<null | string>(null);

  const handleUpdate = (event: React.FormEvent<HTMLTextAreaElement>) => {
    setText(event.currentTarget.value);
  };
  return (
    <>
      <Input text={text} handleUpdate={handleUpdate} />

      <section>
        <Tabs className={styles.tabs}>
          <TabList>
            <Tab
              className={`react-tabs__tab ${styles.tab}`}
              selectedClassName={`react-tabs__tab--selected ${styles.selected}`}
            >
              llm-chunk
            </Tab>
            <Tab
              className={`react-tabs__tab ${styles.tab}`}
              selectedClassName={`react-tabs__tab--selected ${styles.selected}`}
            >
              @langchain/textsplitters
            </Tab>
            <Tab
              className={`react-tabs__tab ${styles.tab}`}
              selectedClassName={`react-tabs__tab--selected ${styles.selected}`}
            >
              llamaindex
            </Tab>
            <Tab
              className={`react-tabs__tab ${styles.tab}`}
              selectedClassName={`react-tabs__tab--selected ${styles.selected}`}
            >
              semantic-chunking
            </Tab>
          </TabList>
          <TabPanel>
            <LLMChunk text={text} setOutput={setOutput} setResult={setResult} />
          </TabPanel>
          <TabPanel>
            <Langchain
              text={text}
              setOutput={setOutput}
              setResult={setResult}
            />
          </TabPanel>
          <TabPanel>
            <LlamaIndex
              text={text}
              setOutput={setOutput}
              setResult={setResult}
            />
          </TabPanel>
          <TabPanel>
            <SemanticChunking
              text={text}
              setOutput={setOutput}
              setResult={setResult}
            />
          </TabPanel>
        </Tabs>
      </section>

      <section>
        {result && <p>{result}</p>}
        <Output chunks={output} />
      </section>
    </>
  );
}
