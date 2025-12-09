"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Message as MessageType } from "@/types/chat";
import Message from "../Message/Message";
import ArrowButton from "../ArrowButton/ArrowButton";

interface MessageListProps {
  messages: MessageType[];
}

export default function MessageList({ messages }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const previousMessagesLengthRef = useRef(0);
  const isInitialLoadRef = useRef(true);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const isNearBottom = (n = 100): boolean => {
    if (!containerRef.current) return true;

    const container = containerRef.current;
    const scrollHeight = container.scrollHeight;
    const scrollTop = container.scrollTop;
    const clientHeight = container.clientHeight;

    return scrollHeight - scrollTop - clientHeight < n;
  };

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    setShowScrollButton(!isNearBottom(100));
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const isNewMessage = messages.length > previousMessagesLengthRef.current;
    const shouldAutoScroll =
      isInitialLoadRef.current || (isNewMessage && isNearBottom());

    if (shouldAutoScroll) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        setShowScrollButton(false);
      }, 100);
    }

    if (isInitialLoadRef.current) {
      isInitialLoadRef.current = false;
    }

    previousMessagesLengthRef.current = messages.length;
  }, [messages]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    setTimeout(() => {
      handleScroll();
    }, 0);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <>
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto px-2 py-4 min-h-0 relative"
      >
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      {showScrollButton && <ArrowButton scrollToBottom={scrollToBottom} />}
    </>
  );
}
