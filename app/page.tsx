"use client";

import InputArea from "@/components/inputarea";
import ChatArea from "@/components/chatarea";

import { useEffect, useRef, useState } from "react";

const initialMessages = [
  {
    role: "assistant",
    content: "안녕하세요. 궁금한 내용이 있으신가요?",
  },
  // 아래는 메시지 구조 예시입니다.
  // {
  //   role: "user",
  //   content: "{사용자 입력}",
  // },
  // { // 답변 생성 대기 중 상태
  //   role: "assistant",
  //   status: "thinking",
  // },
  // {
  //   role: "assistant",
  //   content: "{답변 내용}",
  // }
];

export default function IndexPage() {
  const chatAreaRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState(initialMessages);

  const scrollToBottom = () => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  };

  const handleSend = async (message: string) => {
    let updatedMessages = [
      ...messages,
      {
        role: "user",
        content: message,
      },
      {
        role: "assistant",
        status: "thinking",
      },
    ];

    setMessages(updatedMessages);

    // Single turn 채팅
    // const response = await fetch("/api/chat", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     message: message,
    //   }),
    // });

    // Multi turn 채팅
    // const response = await fetch("/api/chat2", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     messages: updatedMessages.slice(0, -1),
    //   }),
    // });

    // 결과 메시지 렌더링
    // const result = await response.json();
    // setMessages([
    //   ...updatedMessages.slice(0, -1),
    //   {
    //     role: "assistant",
    //     content: result.content,
    //   },
    // ]);

    // Streaming, Multi turn 채팅
    const response = await fetch("/api/chat3", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: updatedMessages.slice(0, -1),
      }),
    });

    const data = response.body;
    const reader = data.getReader();
    const decoder = new TextDecoder();

    let done = false;
    let lastMessage = "";
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      lastMessage = lastMessage + chunkValue;

      setMessages([
        ...updatedMessages.slice(0, -1),
        {
          role: "assistant",
          content: lastMessage,
        },
      ]);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <>
      <div className="flex absolute bottom-0 justify-center w-full">
        <div className="md:w-1/2">
          <div
            ref={chatAreaRef}
            className="h-screen overflow-auto pl-2 pr-4 pt-40"
          >
            <ChatArea messages={messages} scrollToBottom={scrollToBottom} />
          </div>

          <div className="pb-5 pl-2 pr-4 pt-4">
            <InputArea
              handleSend={handleSend}
              scrollToBottom={scrollToBottom}
            />
          </div>
        </div>
      </div>
    </>
  );
}
