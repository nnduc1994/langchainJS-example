import 'dotenv/config';
import * as  readlineSync from 'readline-sync';
import * as colors from 'colors';

import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { DynamicTool } from "langchain/tools";
import { PromptTemplate } from "langchain/prompts";

// import { SerpAPI } from "langchain/tools";
import { Calculator } from "langchain/tools/calculator";


const chatModel = new ChatOpenAI({ temperature: 0 });

const getEmmployeeDataFunction = async () => {
    console.log("getEmployeeData tool triggered")
    //faking some api call
    return Promise.resolve(JSON.stringify({
        name: 'Duc',
        skills: ['Typescript', 'Javascript', 'AWS', 'Complaining'],
        location: 'Finland',
        hasDog: true,
    },
    ))
}

const getEmployeeTool = new DynamicTool({
    name: 'Get_employee_data',
    description: 'Call this function when user asking people who work in Nordcloud',
    func: async () => await getEmmployeeDataFunction()
})

const tools = [getEmployeeTool];


const main = async () => {
    const prompt = PromptTemplate.fromTemplate('{userInput}');

    const executor = await initializeAgentExecutorWithOptions(tools, chatModel ,{
        agentType: "openai-functions",
        //verbose: true,
      });
    
      console.log(colors.bold.green('Chatbot started, type exit to quit'));

      while(true) {
        const userInput = readlineSync.question(colors.yellow('You: '));
  
        if(userInput === 'exit') return;
      
        const response = await executor.run(userInput);
        
        console.log(colors.green(`Bot: ${response}`))
      }

}


main()
