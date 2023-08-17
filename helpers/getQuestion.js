import axios from "axios";

const OPENAI_API_KEY = "";
const API_URL = "https://api.openai.com/v1/chat/completions";

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${OPENAI_API_KEY}`,
};
let data = {
  model: "gpt-3.5-turbo",
  messages: [{ role: "user", content: "" }],
};
export default async function getQuestion(
  language,
  questionType,
  topic,
  hasAnswers
) {
  let content = `Hello, please generate 10 ${questionType} about ${topic} in ${language}. Your reply needs to be ONLY a JSON Array, each object should have a question property${
    hasAnswers ? " and an answer property" : " and no answer property"
  }`;

  data.messages[0].content = content;
  try {
    const response = await axios.post(API_URL, data, { headers });
    let result = JSON.parse(response.data.choices[0].message.content);
    return result;
  } catch (error) {
    console.error(error);
  }
}
