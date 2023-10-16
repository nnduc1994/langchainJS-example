import { PromptTemplate } from "langchain/prompts";


const main = async () => {
  const template = PromptTemplate
    .fromTemplate("What the captial of {country1} and how far is it to the capital of {country2}")

    const partail1 = await template.partial({ country1: 'Finland'});
    // const formattedPromt = await template.format({ country1: 'Finland' })
}


main()