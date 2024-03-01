import axios from "axios";

const OPENAI_API_KEY = "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";
const API_URL = "https://api.openai.com/v1/chat/completions";

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${OPENAI_API_KEY}`,
};
let data = {
  model: "gpt-3.5-turbo",
  messages: [
    {
      role: "system",
      content: "",
    },
    { role: "user", content: "" },
  ],
};

export default async function getQuestion(
  language,
  questionType,
  topic,
  hasAnswers
) {
  let systemContent = `You are a question generator. Your message.content property should be an array of objects. {question, answer} Please try to be unique with the questions, they should be different each time you're called. You need to return a JSON Array on 10 questions (objects), based on the questionType, topic, and language you receive, each object should have a question property${
    hasAnswers ? " and an answer property thats" : " and no answer property"
  }. If and only if when the questionType==Yes/No Questions, then the answer must be in English!. Also, add a "backgroundColor" property to each object. The colors should be pastel and pleasing, useable for inline css.`;

  let userContent = `questionType=${questionType}  topic=${topic} language=${language}`

  data.messages[0].content = systemContent;
  data.messages[1].content = userContent;
  try {
    console.log("before request");
    const response = await axios.post(API_URL, data, { headers });
    console.log(response.data.choices)
    let result = JSON.parse(response.data.choices[0].message.content);
    return result;
  } catch (error) {
    console.error(error);
  }
}
