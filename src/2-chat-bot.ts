import 'dotenv/config';
import * as  readlineSync from 'readline-sync';
import * as colors from 'colors';

import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate, ChatPromptTemplate, MessagesPlaceholder, HumanMessagePromptTemplate } from "langchain/prompts";
import { HumanMessage, SystemMessage } from 'langchain/schema';

import { LLMChain } from 'langchain/chains'
import { BufferMemory } from "langchain/memory";

const chatModel = new ChatOpenAI({
    temperature: 0.9,
  // openAIApiKey: OPENAI_API_KEY
});

const chatbot = async () => {
    console.log(colors.bold.green('Chatbot started, type exit to quit'));

    while(true) {
      const userInput = readlineSync.question(colors.yellow('You: '));

      if(userInput === 'exit') return;
    
      const prompt = PromptTemplate.fromTemplate(userInput);
      const formattedPrompt = await prompt.format({})

      // const systemMessage = 'You are from 15th centery, speak like one'

      const response = await chatModel.predictMessages([
        // new SystemMessage(systemMessage), 
        new HumanMessage(formattedPrompt)]
      );
      
      console.log(colors.green(`Bot: ${response.content}`))
    }
}

const chatbotWithMemory = async () => {
  console.log(colors.bold.green('Chatbot started, type exit to quit'));

  const memory = new BufferMemory({ returnMessages: true, memoryKey: "history" });
  const prompt = ChatPromptTemplate.fromMessages([
    new MessagesPlaceholder("history"),
    HumanMessagePromptTemplate.fromTemplate('{userInput}')
  ])

  //Could use ConversationChain for simpler set up
  const chainWithHistory = new LLMChain({ llm: chatModel, prompt, memory })

  while (true) {
    const userInput = readlineSync.question(colors.yellow('You: '));

    if (userInput === 'exit') return;
  
    const response = await chainWithHistory.invoke({ userInput })
    
    console.log(colors.green(`Bot: ${response.text}`))
  }
}

//chatbotWithMemory();
chatbot()
