# Chunkers
An exploration of JavaScript text splitters.

## What is chunking?

When building a [Retrieval-Augmented Generation (RAG) based app](https://www.ibm.com/think/topics/retrieval-augmented-generation), one of the most important things you need to do is to get your data AI-ready. One of the steps in that process is known as "chunking" as it is used to break down large blocks of text or unstructured data into smaller chunks. Read more about [why chunking is important and what to consider here](https://www.datastax.com/blog/chunking-to-get-your-data-ai-ready?utm_medium=display&utm_source=datastax&utm_campaign=chunkers).

In the JavaScript world, there are a few libraries that can help you with chunking your data. This project is an exploration of those tools and you can see the write up in the blog post on [how to chunk text in JavaScript for your RAG application](https://philna.sh/blog/2024/09/18/how-to-chunk-text-in-javascript-for-rag-applications/).

## The project

This is a Next.js application that allows you to experiment with four JavaScript tools that provide different text chunking capabilities. The tools are:

* [llm-chunk](https://github.com/golbin/llm-chunk)
* [@langchain/textsplitters](https://js.langchain.com/v0.1/docs/modules/data_connection/document_transformers/)
* [LlamaIndex NodeParser](https://ts.llamaindex.ai/modules/node_parser)
* [semantic-chunking](https://github.com/jparkerweb/semantic-chunking)


## Running the project

First, clone this repo:

```sh
git clone https://github.com/philnash/chunkers.git
cd chunkers
```

Install the dependencies:

```sh
npm install
```

Then, run the development server:

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

