import { Message } from "./Chat";
import { ChatItem } from "./ChatItem";

interface ChatMessagesProps {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
}

const ChatMessages = ({ messages, setMessages }: ChatMessagesProps) => {
  if (!messages || messages.length === 0) {
    return <div className="text-center text-gray-500">No messages yet.</div>;
  }
  return (
    <>
      {messages.map((message) => (
        <ChatItem
          key={message.id}
          message={message}
          setMessages={setMessages}
        />
      ))}
    </>
  );
};

export default ChatMessages;
