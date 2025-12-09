"use client";

import { useState, FormEvent } from "react";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export default function MessageInput({
  onSendMessage,
  disabled = false,
}: MessageInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      const messageToSend = message.trim();
      setMessage("");
      await onSendMessage(messageToSend);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-blue-400 px-4 py-3 flex items-center gap-3"
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message"
        disabled={disabled}
        className="flex-1 px-4 py-2 rounded bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <button
        type="submit"
        disabled={disabled || !message.trim()}
        className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 disabled:cursor-not-allowed text-white font-medium px-6 py-2 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
      >
        {disabled ? "Sending..." : "Send"}
      </button>
    </form>
  );
}
