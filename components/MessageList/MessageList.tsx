"use client";

import { Message as MessageType } from "@/types/chat";
import Message from "../Message/Message";

interface MessageListProps {
  messages: MessageType[];
}

export default function MessageList({ messages }: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto px-2 py-4 min-h-0">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
}
