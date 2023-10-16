import 'dotenv/config';
import * as  readlineSync from 'readline-sync';
import * as colors from 'colors';

import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";
import { HumanMessage, SystemMessage } from 'langchain/schema';

const OPENAI_API_KEY = process.env.OPEN_AI_TOKEN;

const chatModel = new ChatOpenAI({
    temperature: 0.9,
    openAIApiKey: OPENAI_API_KEY
});

async function main() {
    console.log(colors.bold.green('Chatbot started, type exit to quit'));

    while(true) {
      const userInput = readlineSync.question(colors.yellow('You: '));

      if(userInput === 'exit') return;
    
      const prompt = PromptTemplate.fromTemplate(userInput);
      const formattedPrompt = await prompt.format({})

      const systemMessage = 'You are from 15th centery, speak like one'

      const response = await chatModel.predictMessages([
        new SystemMessage(systemMessage), 
        new HumanMessage(formattedPrompt)]
      );
      
      console.log(colors.green(`Bot: ${response.content}`))
    }
}

main()
