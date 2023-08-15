import { NextRequest, NextResponse } from "next/server";

const CHAT_SERVER_URL = "https://ddff-34-123-140-81.ngrok-free.app";

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  const response = await fetch(CHAT_SERVER_URL + "/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: message,
    }),
  });

  const completion = await response.json();
  console.log(completion);
  completion.content;

  return NextResponse.json({
    success: true,
    content: completion.content,
  });
}
