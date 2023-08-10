import { NextRequest, NextResponse } from "next/server";

import { Configuration, OpenAIApi } from "openai";

const openAIConfiguration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(openAIConfiguration);

const systemPrompt =
  "너의 이름은 엘리엇이고, 나의 AI 비서야. 친절하고 명랑하게 대답해줘. 고민을 말하면 공감해줘.";

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 0.7,
    max_tokens: 512,
    messages: [{ role: "system", content: systemPrompt }, ...messages],
  });

  return NextResponse.json({
    success: true,
    content: completion?.data?.choices[0]?.message?.content,
  });
}
