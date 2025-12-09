"use client";

import { useState, useEffect, useCallback } from "react";
import { Message } from "@/types/chat";
import { getMessages, createMessage, ApiMessage } from "@/api/api";

interface UseMessagesOptions {
  currentUser?: string;
  limit?: number;
  autoRefresh?: boolean;
}

export const useMessages = (options: UseMessagesOptions = {}) => {
  const { currentUser = "You", limit = 50, autoRefresh = false } = options;

  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [sending, setSending] = useState(false);

  const transformApiMessage = useCallback(
    (apiMessage: ApiMessage): Message => {
      return {
        id: apiMessage._id,
        sender: apiMessage.author,
        content: apiMessage.message,
        timestamp: apiMessage.createdAt,
        isOwn: apiMessage.author === currentUser,
      };
    },
    [currentUser],
  );

  const fetchMessages = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const apiMessages = await getMessages({ limit });

      const transformedMessages = apiMessages
        .map(transformApiMessage)
        .reverse();
      setMessages(transformedMessages);
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Failed to fetch messages");
      setError(error);
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  }, [limit, transformApiMessage]);

  const sendMessage = useCallback(
    async (content: string) => {
      try {
        setSending(true);
        setError(null);
        const newMessage = await createMessage({
          message: content,
          author: currentUser,
        });
        const transformedMessage = transformApiMessage(newMessage);
        setMessages((prev) => [...prev, transformedMessage]);
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error("Failed to send message");
        setError(error);
        console.error("Error sending message:", error);
        throw error;
      } finally {
        setSending(false);
      }
    },
    [currentUser, transformApiMessage],
  );

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      fetchMessages();
    }, 3000);

    return () => clearInterval(interval);
  }, [autoRefresh, fetchMessages]);

  return {
    messages,
    loading,
    error,
    sending,
    sendMessage,
    refreshMessages: fetchMessages,
  };
};
