import { useEffect } from "react";

export default function ChatArea({
  messages,
  scrollToBottom,
}: {
  messages: Array<{}>;
  scrollToBottom: Function;
}) {
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loading = (
    <div className="mb-4 flex justify-start last:mb-0">
      <div>
        <div className="whitespace-pre-wrap rounded-xl border border-gray-200 bg-gray-100 px-4 py-2">
          <div className="flex justify-center">
            <div className="loader-dots relative mt-3 block h-5 w-20">
              <div className="absolute h-3 w-3 rounded-full bg-gray-500"></div>
              <div className="absolute h-3 w-3 rounded-full bg-gray-500"></div>
              <div className="absolute h-3 w-3 rounded-full bg-gray-500"></div>
              <div className="absolute h-3 w-3 rounded-full bg-gray-500"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {messages.map((message, index) => {
        if (message.role === "assistant" && message.status === "thinking") {
          return loading;
        } else if (message.role === "assistant") {
          return (
            <div className="mb-4 flex justify-start" key={index}>
              <div className="whitespace-pre-wrap rounded-xl border border-gray-200 bg-gray-100 px-4 py-2 last:mb-0">
                {message.content}
              </div>
            </div>
          );
        } else if (message.role === "user") {
          return (
            <div className="mb-4 flex justify-end last:mb-0" key={index}>
              <div>
                <div className="whitespace-pre-wrap rounded-xl bg-blue-500 px-4 py-2 text-white">
                  {message.content}
                </div>
              </div>
            </div>
          );
        }
      })}
    </>
  );
}
