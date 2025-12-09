"use client";

import ChatLayout from "@/components/ChatLayout/ChatLayout";
import MessageList from "@/components/MessageList/MessageList";
import MessageInput from "@/components/Input/MessageInput";
import { useMessages } from "@/hooks/useMessages";

export default function Home() {
  const { messages, loading, error, sending, sendMessage } = useMessages({
    currentUser: "You",
    limit: 50,
    autoRefresh: true,
  });

  const handleSendMessage = async (content: string) => {
    try {
      await sendMessage(content);
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  if (loading && messages.length === 0) {
    return (
      <ChatLayout>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-gray-600">Loading messages...</div>
        </div>
        <MessageInput onSendMessage={handleSendMessage} disabled={true} />
      </ChatLayout>
    );
  }

  if (error && messages.length === 0) {
    return (
      <ChatLayout>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-red-600">
            Error loading messages: {error.message}
          </div>
        </div>
        <MessageInput onSendMessage={handleSendMessage} disabled={true} />
      </ChatLayout>
    );
  }

  return (
    <ChatLayout>
      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 text-sm">
          {error.message}
        </div>
      )}
      <MessageList messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} disabled={sending} />
    </ChatLayout>
  );
}
