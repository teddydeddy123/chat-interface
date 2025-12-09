"use client";

import { useEffect, useRef } from "react";
import { Message as MessageType } from "@/types/chat";
import Message from "../Message/Message";

interface MessageListProps {
  messages: MessageType[];
}

export default function MessageList({ messages }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const previousMessagesLengthRef = useRef(0);
  const isInitialLoadRef = useRef(true);

  const isNearBottom = (n = 100): boolean => {
    if (!containerRef.current) return true;

    const container = containerRef.current;
    const scrollHeight = container.scrollHeight;
    const scrollTop = container.scrollTop;
    const clientHeight = container.clientHeight;

    return scrollHeight - scrollTop - clientHeight < n;
  };

  useEffect(() => {
    const isNewMessage = messages.length > previousMessagesLengthRef.current;
    const shouldAutoScroll =
      isInitialLoadRef.current || (isNewMessage && isNearBottom());

    if (shouldAutoScroll) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }

    if (isInitialLoadRef.current) {
      isInitialLoadRef.current = false;
    }

    previousMessagesLengthRef.current = messages.length;
  }, [messages]);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto px-2 py-4 min-h-0"
    >
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
