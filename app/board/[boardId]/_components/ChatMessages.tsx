import { Message } from "./Chat";
import { ChatItem } from "./ChatItem";
import { useEffect, useRef } from "react";

interface ChatMessagesProps {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
}

const ChatMessages = ({ messages, setMessages }: ChatMessagesProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  if (!messages || messages.length === 0) {
    return <div className="text-center text-gray-500">No messages yet.</div>;
  }
  return (
    <div className="flex flex-col gap-2 pb-20">
      {messages.map((message) => (
        <ChatItem
          key={message.id}
          message={message}
          setMessages={setMessages}
        />
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatMessages;
