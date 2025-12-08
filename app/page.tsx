"use client";

import { useState } from "react";
import { Message } from "@/types/chat";
import ChatLayout from "@/components/ChatLayout/ChatLayout";
import MessageList from "@/components/MessageList/MessageList";
import MessageInput from "@/components/Input/MessageInput";

const initialMessages: Message[] = [
  {
    id: "1",
    sender: "I am mister brilliant",
    content: "THANKSSSS!!!!!",
    timestamp: "2018-03-10T10:10:00",
    isOwn: false,
  },
  {
    id: "2",
    sender: "WTF57",
    content: "HAHAHAHAHA",
    timestamp: "2018-03-10T10:19:00",
    isOwn: false,
  },
];

export default function Home() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "You",
      content,
      timestamp: new Date().toISOString(),
      isOwn: true,
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <ChatLayout>
      <MessageList messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </ChatLayout>
  );
}
