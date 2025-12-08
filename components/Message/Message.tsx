"use client";

import { Message as MessageType } from "@/types/chat";
import { useMessage } from "./useMessage";

interface MessageProps {
  message: MessageType;
}

export default function Message({ message }: MessageProps) {
  const { formattedDate } = useMessage({ timestamp: message.timestamp });

  return (
    <div
      className={`flex ${message.isOwn ? "justify-end" : "justify-start"} mb-4 px-4`}
    >
      <div
        className={`max-w-[70%] rounded-lg px-4 py-3 shadow-sm ${
          message.isOwn
            ? "bg-yellow-200 text-gray-900"
            : "bg-white text-gray-900"
        }`}
      >
        {!message.isOwn && (
          <div className="font-semibold text-sm mb-1 text-gray-700">
            {message.sender}
          </div>
        )}
        <div className="text-sm leading-relaxed mb-1 wrap-break-word">
          {message.content}
        </div>
        <div
          className={`text-xs text-gray-500 mt-1 ${
            message.isOwn ? "text-right" : "text-left"
          }`}
        >
          {formattedDate}
        </div>
      </div>
    </div>
  );
}
