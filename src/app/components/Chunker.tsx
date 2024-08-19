"use client";
import "react-tabs/style/react-tabs.css";
import styles from "./Chunker.module.css";

import { useState } from "react";

import { Chunks } from "../types";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
import Input from "./Input";
import Output from "./Output";
import LLMChunk from "./LLMChunk";
import Langchain from "./Langchain";

export default function Chunker() {
  const [text, setText] = useState("");
  const [output, setOutput] = useState<Chunks>([]);

  const handleUpdate = (event: React.FormEvent<HTMLTextAreaElement>) => {
    setText(event.currentTarget.value);
  };
  return (
    <>
      <Input text={text} handleUpdate={handleUpdate} />

      <Tabs className={styles.chunkers}>
        <TabList>
          <Tab>llm-chunk</Tab>
          <Tab>@langchain/textsplitters</Tab>
          <Tab>llamaindex</Tab>
        </TabList>
        <TabPanel>
          <LLMChunk text={text} setOutput={setOutput} />
        </TabPanel>
        <TabPanel>
          <Langchain text={text} setOutput={setOutput} />
        </TabPanel>
        {/* <TabPanel>
            <LlamaIndex text={text} setOutput={setOutput} />
          </TabPanel> */}
      </Tabs>

      <section>
        <Output chunks={output} />
      </section>
    </>
  );
}
