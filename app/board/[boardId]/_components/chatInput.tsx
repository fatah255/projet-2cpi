"use client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus, Smile } from "lucide-react";
import { nanoid } from "nanoid";
import { useSelf, useBroadcastEvent } from "@liveblocks/react/suspense";
import { EmojiPicker } from "./EmojiPicker";
import { useRouter } from "next/navigation";
import { useOrganization } from "@clerk/nextjs";
import { Message } from "./Chat";

const formSchema = z.object({
  content: z.string().min(1),
});

const ChatInput = ({
  setMessages,
}: {
  setMessages: (messages: Message[]) => void;
}) => {
  const { membership } = useOrganization();
  const isAdmin = membership && membership?.role === "org:admin";
  const router = useRouter();
  const user = useSelf((me) => me);
  const broadcast = useBroadcastEvent();
  const sendMessage = (content: string) => {};
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = (value: z.infer<typeof formSchema>) => {
    const id = nanoid();
    const timestamp = Date.now();
    broadcast({
      type: "CHAT_MESSAGE",
      id,
      userId: user.id,
      name: user.info?.name,
      content: value.content,
      timestamp,
      isUpdated: false,
      deleted: false,
      avatar: user.info?.picture,
      isAdmin,
    });
    //@ts-ignore
    setMessages((prev) => {
      if (!prev)
        return [
          {
            id,
            userId: user.id,
            name: user.info?.name,
            content: value.content,
            timestamp,
            avatar: user.info?.picture,
            isAdmin,
          },
        ];

      return [
        ...prev,
        {
          id,
          userId: user.id,
          name: user.info?.name,
          content: value.content,
          timestamp,
          isUpdated: false,
          deleted: false,
          avatar: user.info?.picture,
          isAdmin,
        },
      ];
    });
    form.reset();
    router.refresh();
  };

  return (
    <Form {...form}>
      <form
        className="absolute bottom-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative p-4 pb-6">
                  <Input
                    disabled={isLoading}
                    className="px-14 py-6 bg-zinc-200/90 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-700"
                    {...field}
                  />
                  <div className="absolute top-7 right-8">
                    <EmojiPicker
                      onChange={(emoji: string) =>
                        field.onChange(`${field.value} ${emoji}`)
                      }
                    />
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default ChatInput;
