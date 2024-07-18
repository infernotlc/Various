import { Configuration, OpenAIApi } from "openai";
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API anahtari ayarlanamadi , lütfen talimatlari takip ediniz",
      },
    });
    return;
  }

  const { name, age, gender, aim } = req.body;
  const prompt_var = generatePrompt(name, age , gender, aim);
  console.log(prompt_var);
  

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt_var,
      temperature: 0.6,
      max_tokens: 2048,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    //
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`OpenAPI Api Istegiyle Alakali Hata: ${error.message}`);
      res.status(500).json({
        error: {
          message: "Isteginiz Sirasinda Bir Hata Olustu.",
        },
      });
    }
  }
}

function generatePrompt(age, gender, aim) {
  return `create a plan for ${age} age ${gender} who aims ${aim}`;
}
