import api from "./client";

export interface ChatHandle {
  id: string;
  title: string;
}

export const getChatHandles = async (): Promise<ChatHandle[]> => {
  const res = await api.get("/v1/chat-handles");
  return res.data;
};

