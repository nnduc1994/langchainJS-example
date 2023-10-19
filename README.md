<a href="https://www.buymeacoffee.com/nnduc1994h" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

# langchain-example
The example use dotenv to load environment variable. Remember to create a .env in the root and add a following keys

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