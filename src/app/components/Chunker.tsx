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
  const [currentTab, setCurrentTab] = useState(0);

  const handleUpdate = (event: React.FormEvent<HTMLTextAreaElement>) => {
    setText(event.currentTarget.value);
  };

  const handleTabChanged = (index: number) => {
    setCurrentTab(index);
  };
  return (
    <>
      <Input text={text} handleUpdate={handleUpdate} />

      <section>
        <Tabs
          className={styles.tabs}
          forceRenderTabPanel={true}
          onSelect={handleTabChanged}
        >
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
            <LLMChunk text={text} selected={currentTab === 0} />
          </TabPanel>
          <TabPanel>
            <Langchain text={text} selected={currentTab === 1} />
          </TabPanel>
          <TabPanel>
            <LlamaIndex text={text} selected={currentTab === 2} />
          </TabPanel>
          <TabPanel>
            <SemanticChunking text={text} selected={currentTab === 3} />
          </TabPanel>
        </Tabs>
      </section>
    </>
  );
}
