import 'dotenv/config';
import * as fs from 'fs';
import * as path from 'path'

import {
    PromptTemplate} from "langchain/prompts";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage, SystemMessage } from 'langchain/schema';

const chatModel = new ChatOpenAI({ temperature: 0});

const systemMessage =
    new SystemMessage(`You are an expert automation tester with vast experience with Robot Framwork. 
    Your task is to generate working Robot framework code to cover the input user story. 
    Take your time to make sure the syntax is correct.
    Anything that is wrapped around { } will be treated as the text to look for in the test. Write code in the way, 
    when using xpath contains function, use dot as a first parameter instead of text()`)

const main = async () => {
    const prompt = PromptTemplate.fromTemplate("{userStory}")
    const formattedPrompt = await prompt.format({
        userStory: `As a user I want to go to https://nnduc1994.github.io/simple-frontend/ and able
                to see (might take a while) and click on the button with the text {count is 0},
                after click on the button with the text {count is 0}
                I should see a button with text {count is 1}. 
                I will need to click the button few time until I see the button {count is 6}`
    })

    const messages = [systemMessage , new HumanMessage(formattedPrompt)]
    const chatModelResult = await chatModel.predictMessages(messages);
    
    console.log(chatModelResult.content)
    fs.writeFileSync(path.join(__dirname, 'text/first_test.robot'), chatModelResult.content)
}


const main2 = async () => {
    const prompt = PromptTemplate.fromTemplate("{userStory}")
    const formattedPrompt = await prompt.format({
        userStory: `As a user I want to go to https://nnduc1994.github.io/simple-frontend/ and able
                to see and click on the button with the text {Open to check population},
                after click on the button with the text {Open to check population} a Dialog pop up
                I should be able to see a text input and able to enter a city name (for example: Helsinki).
                After input the city name, I should be able to click on the button with the text {Check} (this will take a while)
                I should be able to see the text {Latest info is from year} and {Population}`
    })

    const messages = [systemMessage , new HumanMessage(formattedPrompt)]
    const chatModelResult = await chatModel.predictMessages(messages);
    
    console.log(chatModelResult.content)
    fs.writeFileSync(path.join(__dirname, 'text/first_test_2.robot'), chatModelResult.content)
}

main2()
