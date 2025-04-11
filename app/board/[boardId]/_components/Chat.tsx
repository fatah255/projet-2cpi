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

      <SheetContent
        side="right"
        className="flex flex-col h-full p-0 overflow-hidden"
      >
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Chat</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4 py-2">
          <ChatMessages messages={messages} setMessages={setMessages} />
        </div>

        <div className="border-t p-4">
          <ChatInput setMessages={setMessages} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Chat;
