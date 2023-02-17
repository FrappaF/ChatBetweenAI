import { Configuration, OpenAIApi } from "openai";
import { getEngText, getItaText, getLanguagesVersion } from "../languages/lanuages";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const AStarterConversation = getLanguagesVersion("A: ???\nContinue this conversation adding what A would say.", "A: ???\nContinua questa conversazione aggiungendo cosa direbbe A");
const BStarterConversation = getLanguagesVersion("B: ???\nContinue this conversation adding what B would say.", "B: ???\nContinua questa conversazione aggiungendo cosa direbbe B");

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const conversation = req.body.conversation || [];
  const context = req.body.context || [];
  const useEngLang = req.body.lang || true;


  // Conversation empty error
  if (conversation.length < 1 || conversation[0].trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid conversation",
      }
    });
    return;
  }


  // Context not specified
  if (context.length < 1 || context[0].trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid context",
      }
    });
    return;
  }


  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(conversation, context, useEngLang),
      temperature: 1.0, 
      frequency_penalty: 1.0,
      presence_penalty: 1.0,
      max_tokens: 1200,
      stop:["stop"],
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

// Used to generate a pretty txt prompt
export function generatePrettyPrompt(conversation, context, useEngLang) {
  return generatePrompt(conversation, context, useEngLang).split('\n').slice(0, -2).join('\n');
}


function generatePrompt(conversation, context, useEngLang) {
  if(conversation == null || conversation.length < 1) return "";
  let res = `${context}\n`;
  const convLength = conversation.length;
  let i = Math.min(convLength - 1, 8);
  for(; i >= 0 && i < convLength; i--){
    let currIndex = convLength - 1 - i;
    res += `${i % 2 == 0 ? "A: " : "B: "}`;
    res += `${conversation[currIndex]}\n\n`;
  }

    let aStart = useEngLang ? getEngText(AStarterConversation) : getItaText(AStarterConversation);
    let bStart = useEngLang ? getEngText(BStarterConversation) : getItaText(BStarterConversation);

    res += `${i % 2 == 0 ? aStart : bStart }`;  

    return res;
}


