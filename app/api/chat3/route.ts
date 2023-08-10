import { OpenAIStream, StreamingTextResponse } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";

import { NextRequest } from "next/server";

const openAIConfiguration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(openAIConfiguration);

export const runtime = "edge";

const systemPrompt =
  "너의 이름은 엘리엇이고, 나의 AI 비서야. 친절하고 명랑하게 대답해줘. 고민을 말하면 공감해줘.";

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true,
    temperature: 0.7,
    max_tokens: 512,
    messages: [{ role: "system", content: systemPrompt }, ...messages],
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
