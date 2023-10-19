<a href="https://www.buymeacoffee.com/nnduc1994h" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

# langchainJS examples:
This repository includes some examples that cover different usages of langchainJS (and open AI's LLM):
 * **1-simple-example.ts** A quick and simple tutorial on how to get started with Langchain JS, an example of 2 different model: Open AI LLM and Open AI ChatModel

 * **2-chat-bot.ts** How to build a chatbot with nodeJS and langchain. Introducing the concept of `chain` and adding (buffer) memory to the chatbot

 * **3-more-knowledge-with-vector-db.ts** How to "load" a text file (in the example, a transcript from youtube video), embedding it saving it to Pinecone vector database and building a QAchatbot with extra knowledge (from the processed file). Try to ask question about "PS5 slim" (which info only available from the .txt and not the base LLM model) - Remember to run ingest function before asking question about PS5 slim
 
 * **4-agent.ts** How to enable LLM to do more with agents and tools. This example give the LLM a simple tool call "getEmployeeTool" which allows the LLM to get more information about (sample info) of Nordcloud employee. Try to ask question like "does anyone in Nordcloud know Typescript ?"
 

## How to run an example:
* Run `npm i`
* Run `npm i -g ts-node` --> remove the `-g` if you don't want to install ts-node in global level
* Create `.env` file, check out Environment variables section below
* Run `ts-node src/<example_file_name.ts>`

## Environment variables
The example use dotenv to load environment variable. Remember to create a .env in the root and add a following keys
**NOTE**: Only use either Open AI or Azure setup

To use Open AI hosted in Azure
````
AZURE_OPENAI_API_VERSION=2023-07-01-preview
AZURE_OPENAI_BASE_PATH=https://oai-int-azg-we-001.openai.azure.com/openai/deployments
AZURE_OPENAI_API_KEY=<fill-in>
AZURE_OPENAI_API_DEPLOYMENT_NAME=dep-gpt-35-turbo
AZURE_OPENAI_API_EMBEDDINGS_DEPLOYMENT_NAME=text-embedding-ada-002
````

To use Open AI hosted in Open AI
```
OPENAI_API_KEY=<fill-in>
```

For Pinecone Vector DB
``````
PINECONE_KEY=<fill in>
PINECONE_ENVIRONMENT=gcp-starter
PINECONE_INDEX=internal-demo
```````