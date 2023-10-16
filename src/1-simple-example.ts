const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

import { OpenAI } from "langchain/llms/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";

import { PromptTemplate } from "langchain/prompts";
import { HumanMessage } from "langchain/schema";

const main = async () => {
    const llm = new OpenAI({
        temperature: 0.9,
        openAIApiKey: OPENAI_API_KEY,
    });
      
    const chatModel = new ChatOpenAI({
        temperature: 0.9,
        openAIApiKey: OPENAI_API_KEY
    });
      
    const text = "What would be a good company name for a company that makes colorful socks?";
    const llmResult = await llm.predict(text);

    const prompt = PromptTemplate.fromTemplate("What would be a good company name for company that makes {product}?")
    const formattedPrompt = await prompt.format({
        product: "board game connection app"
    })
    
    const messages = [new HumanMessage(formattedPrompt)]
    const chatModelResult = await chatModel.predictMessages(messages);

    console.log("llm", llmResult)
    console.log("chat model result", chatModelResult)
}

main()

