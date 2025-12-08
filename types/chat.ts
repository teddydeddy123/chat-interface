export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

export interface ChatLayoutProps {
  children: React.ReactNode;
}
