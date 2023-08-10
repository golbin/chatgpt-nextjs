import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function InputArea({
  handleSend,
  scrollToBottom,
}: {
  handleSend: Function;
  scrollToBottom: Function;
}) {
  const [query, setQuery] = useState<string>("");

  const send = () => {
    handleSend(query);
    scrollToBottom();
    setQuery("");
  };

  return (
    <div className="relative block w-full items-end">
      <div className="flex w-full items-end space-x-0">
        <Input
          type="query"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              send(); // Enter 입력이 되면 클릭 이벤트 실행
            }
          }}
          placeholder="Ask any question..."
          className="rounded-none rounded-l-md focus-visible:ring-0"
        />
        <Button
          type="submit"
          className="rounded-none rounded-r-md"
          onClick={send}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
}
