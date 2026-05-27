import { getChatUserId } from "./chatUser";

const CHAT_API_BASE =
  import.meta.env.VITE_CHAT_API_URL ?? "https://legum-website-chat.elevatics.site";

export type ChatStreamEvent =
  | { type: "chunk"; content: string }
  | { type: "tool_start"; name: string; input: Record<string, unknown> }
  | { type: "tool_end"; name: string; output: string }
  | { type: "full_response"; content: string }
  | { type: "error"; content: string }
  | { type: "thread_id"; thread_id: string };

export type Thread = {
  id: string;
  user_id: string;
  title?: string;
  created_at: string;
  updated_at: string;
};

export type ThreadMessage = {
  id: string;
  thread_id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
};

type ChatRequest = {
  query: string;
  user_id?: string;
  thread_id?: string | null;
  model_id?: string;
  signal?: AbortSignal;
  onEvent: (event: ChatStreamEvent) => void;
};

function parseStreamLine(line: string): ChatStreamEvent | null {
  const trimmed = line.trim();
  if (!trimmed || trimmed === "data: [DONE]") return null;

  const payload = trimmed.startsWith("data:") ? trimmed.slice(5).trim() : trimmed;
  if (!payload) return null;

  try {
    return JSON.parse(payload) as ChatStreamEvent;
  } catch {
    return null;
  }
}

async function parseError(response: Response) {
  let detail = `Request failed (${response.status})`;
  try {
    const errorBody = (await response.json()) as { detail?: string };
    if (errorBody.detail) detail = errorBody.detail;
  } catch {
    // ignore parse errors
  }
  return detail;
}

export async function streamChat({
  query,
  user_id = getChatUserId(),
  thread_id,
  model_id,
  signal,
  onEvent,
}: ChatRequest): Promise<{ threadId: string | null }> {
  const response = await fetch(`${CHAT_API_BASE}/api/v1/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query,
      user_id,
      ...(thread_id ? { thread_id } : {}),
      ...(model_id ? { model_id } : {}),
    }),
    signal,
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  if (!response.body) {
    throw new Error("Chat response did not include a stream.");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let resolvedThreadId = thread_id ?? null;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      const event = parseStreamLine(line);
      if (!event) continue;

      if (event.type === "thread_id") {
        resolvedThreadId = event.thread_id;
      }

      onEvent(event);
    }
  }

  const trailing = parseStreamLine(buffer);
  if (trailing) {
    if (trailing.type === "thread_id") {
      resolvedThreadId = trailing.thread_id;
    }
    onEvent(trailing);
  }

  if (!resolvedThreadId) {
    const threads = await listThreads(1);
    resolvedThreadId = threads[0]?.id ?? null;
  }

  return { threadId: resolvedThreadId };
}

export async function listThreads(limit = 20) {
  const userId = getChatUserId();
  const params = new URLSearchParams({
    user_id: userId,
    limit: String(limit),
    order: "desc",
  });

  const response = await fetch(`${CHAT_API_BASE}/api/v1/threads?${params.toString()}`);
  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  const data = (await response.json()) as { threads: Thread[] };
  return data.threads;
}

export async function getThreadMessages(threadId: string, limit = 50) {
  const userId = getChatUserId();
  const params = new URLSearchParams({
    user_id: userId,
    limit: String(limit),
    order: "asc",
  });

  const response = await fetch(
    `${CHAT_API_BASE}/api/v1/threads/${threadId}/messages?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  const data = (await response.json()) as { messages: ThreadMessage[] };
  return data.messages;
}

export async function deleteThread(threadId: string) {
  const userId = getChatUserId();
  const params = new URLSearchParams({ user_id: userId });

  const response = await fetch(
    `${CHAT_API_BASE}/api/v1/threads/${threadId}?${params.toString()}`,
    { method: "DELETE" },
  );

  if (!response.ok) {
    throw new Error(await parseError(response));
  }
}

export async function resolveLatestThreadId() {
  const threads = await listThreads(1);
  return threads[0]?.id ?? null;
}
