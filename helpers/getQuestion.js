import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY ?? "",
  dangerouslyAllowBrowser: true,
});

const CARD_COLORS = [
  "#FFF3E0", "#E8F5E9", "#E3F2FD", "#FCE4EC",
  "#F3E5F5", "#E0F2F1", "#FFF8E1", "#EDE7F6",
  "#E1F5FE", "#F9FBE7",
];

export default async function getQuestion(language, questionType, topic, hasAnswers) {
  const isYesNo = questionType === "Yes/No Questions";

  const answerRule = !hasAnswers
    ? 'Set "answer" to ""'
    : isYesNo
    ? '"answer" MUST be exactly "Yes" or "No" (no other value)'
    : '"answer" should be a clear, concise 1-2 sentence response';

  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 2048,
    messages: [
      {
        role: "user",
        content: `Generate exactly 10 "${questionType}" questions about "${topic}" in ${language} language.

Return ONLY a valid JSON array, no markdown or explanation. Each object:
{"question": "...", "answer": "...", "backgroundColor": "#hexcolor"}

Requirements:
- ${answerRule}
- Assign these background colors in order: ${CARD_COLORS.join(", ")}
- Questions must be varied, engaging and appropriate for students
- No duplicate questions`,
      },
    ],
  });

  const raw = message.content[0].text.trim();
  const json = raw.startsWith("```")
    ? raw.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "")
    : raw;
  return JSON.parse(json);
}
