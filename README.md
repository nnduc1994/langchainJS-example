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