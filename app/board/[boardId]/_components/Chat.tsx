import { Button } from "@/components/ui/Button";
import { MessageCircle } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ChatInput from "./chatInput";
import { useState } from "react";
import { useEventListener } from "@liveblocks/react";
import { toast } from "sonner";
import ChatMessages from "./ChatMessages";

export type Message = {
  id: string;
  userId: string;
  name: string;
  content: string;
  timestamp: number;
  isUpdated: boolean;
  deleted: boolean;
  fileUrl: string | null;
  isPDF: boolean;
  avatar: string | undefined;
  isAdmin: boolean;
};

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  useEventListener(({ event }) => {
    //@ts-ignore
    if (event.type === "CHAT_MESSAGE") {
      //@ts-ignore
      setMessages((prev) => [...prev, event]);
      //@ts-ignore
      toast.message(`${event.name}: ${event.content}`);
    }
  });

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="outline" className="absolute mt-10 right-2 w-12 h-12">
          <MessageCircle width={50} height={50} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Chat</SheetTitle>
          <SheetDescription>
            <ChatMessages setMessages={setMessages} messages={messages} />
            <ChatInput setMessages={setMessages} />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default Chat;
