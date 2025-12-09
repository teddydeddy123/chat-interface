const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
const API_TOKEN =
  process.env.NEXT_PUBLIC_API_TOKEN || "super-secret-doodle-token";

export interface ApiMessage {
  _id: string;
  message: string;
  author: string;
  createdAt: string;
}

export interface CreateMessageRequest {
  message: string;
  author: string;
}

export interface GetMessagesParams {
  after?: string;
  limit?: number;
}

async function fetchWithAuth(
  endpoint: string,
  options: RequestInit = {},
): Promise<Response> {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    Authorization: `Bearer ${API_TOKEN}`,
    "Content-Type": "application/json",
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response;
}

export async function getMessages(
  params?: GetMessagesParams,
): Promise<ApiMessage[]> {
  const queryParams = new URLSearchParams();
  if (params?.after) {
    queryParams.append("after", params.after);
  }
  if (params?.limit) {
    queryParams.append("limit", params.limit.toString());
  }

  const queryString = queryParams.toString();
  const endpoint = `/api/v1/messages${queryString ? `?${queryString}` : ""}`;

  const response = await fetchWithAuth(endpoint);
  const data = await response.json();

  if (Array.isArray(data)) {
    return data;
  }

  throw new Error("Invalid API response format");
}

export async function createMessage(
  request: CreateMessageRequest,
): Promise<ApiMessage> {
  const response = await fetchWithAuth("/api/v1/messages", {
    method: "POST",
    body: JSON.stringify(request),
  });

  const data = await response.json();
  return data;
}
