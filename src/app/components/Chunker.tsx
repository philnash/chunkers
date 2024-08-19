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

  const handleUpdate = (event: React.FormEvent<HTMLTextAreaElement>) => {
    setText(event.currentTarget.value);
  };
  return (
    <>
      <Input text={text} handleUpdate={handleUpdate} />

      <section>
        <Tabs className={styles.chunkers}>
          <TabList>
            <Tab className={`react-tabs__tab ${styles.tab}`}>llm-chunk</Tab>
            <Tab className={`react-tabs__tab ${styles.tab}`}>
              @langchain/textsplitters
            </Tab>
            <Tab className={`react-tabs__tab ${styles.tab}`}>llamaindex</Tab>
            <Tab className={`react-tabs__tab ${styles.tab}`}>
              semantic-chunking
            </Tab>
          </TabList>
          <TabPanel>
            <LLMChunk text={text} setOutput={setOutput} />
          </TabPanel>
          <TabPanel>
            <Langchain text={text} setOutput={setOutput} />
          </TabPanel>
          <TabPanel>
            <LlamaIndex text={text} setOutput={setOutput} />
          </TabPanel>
          <TabPanel>
            <SemanticChunking text={text} setOutput={setOutput} />
          </TabPanel>
        </Tabs>
      </section>

      <section>
        <Output chunks={output} />
      </section>
    </>
  );
}
