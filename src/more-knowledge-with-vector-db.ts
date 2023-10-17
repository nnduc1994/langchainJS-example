import 'dotenv/config';
import * as  readlineSync from 'readline-sync';
import * as colors from 'colors';

import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";
import { HumanMessage, SystemMessage } from 'langchain/schema';
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { BufferMemory } from "langchain/memory";

import { TextLoader } from 'langchain/document_loaders/fs/text';
import { ConversationalRetrievalQAChain } from "langchain/chains";

import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "langchain/vectorstores/pinecone";

const OPENAI_API_KEY = process.env.OPEN_AI_KEY;

const embedding = new OpenAIEmbeddings({
    openAIApiKey: OPENAI_API_KEY
})

const chatModel = new ChatOpenAI({
    temperature: 0.9,
    openAIApiKey: OPENAI_API_KEY
});

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_KEY || '',
  environment: process.env.PINECONE_ENVIRONMENT || 'gcp-starter'
})

const index = pinecone.Index(process.env.PINECONE_INDEX || '');

const ingestData = async () => {
    const loader = new TextLoader("/Users/ducnguyen/Coding/langchain-example/src/text/ps5-slim.txt");
    const docs = await loader.load();

    await PineconeStore.fromDocuments(docs, embedding, {
        pineconeIndex: index,
        //namespace: 'ps5-slim'
    });
}

async function chatbot() {
    console.log(colors.bold.green('Chatbot started, type exit to quit'));

    while(true) {
      const userInput = readlineSync.question(colors.yellow('You: '));

      if(userInput === 'exit') return;
        

      const vectorstores = PineconeStore.fromExistingIndex(embedding, {pineconeIndex: index});

      const chain = ConversationalRetrievalQAChain.fromLLM(
          chatModel, 
          (await vectorstores).asRetriever(),
          {
            memory: new BufferMemory({
                returnMessages: true, //optional
                memoryKey: "chat_history",
            })
          }
      )

      const response = await chain.call({question: userInput})
      console.log(colors.green(`Bot: ${response.text}`))
    }
}

chatbot()
//ingestData()
