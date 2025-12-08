"use client";

import { ChatLayoutProps } from "@/types/chat";
import DoodleBackground from "../background/DoodleBackground";

export default function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <div className="relative min-h-screen w-full">
      <DoodleBackground />
      <div className="relative z-10 flex flex-col h-screen">{children}</div>
    </div>
  );
}
