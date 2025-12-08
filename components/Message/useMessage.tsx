"use client";

import { useMemo } from "react";

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleDateString("en-GB", { month: "short" });
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${day} ${month} ${year} ${hours}:${minutes}`;
};

interface UseMessageProps {
  timestamp: string;
}

export const useMessage = ({ timestamp }: UseMessageProps) => {
  const formattedDate = useMemo(() => formatDate(timestamp), [timestamp]);

  return {
    formattedDate,
  };
};
