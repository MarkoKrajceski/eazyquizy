import axios from "axios";

export default async function getQuestion(
  language,
  questionType,
  topic,
  hasAnswers
) {
  try {
    console.log("before request");
    const data = {
      language,
      questionType,
      topic,
      hasAnswers,
    };
    const response = await axios.post(
      "https://ic2q5izq6xb2ymkuhxljcg3yt40wtmyl.lambda-url.eu-west-1.on.aws/",
      data
    );
    console.log(response.data.choices);
    let result = JSON.parse(response.data.choices[0].message.content);
    return result;
  } catch (error) {
    console.error(error);
  }
}
