import api from "./client";


type Message = {
  id: number;
  direction: 'in' | 'out'
  content: {
    type: string;
    content:  {
      text?: string;
      fileUrl?: string;
      fileType?: string;
    }
  }
  createdAt: string;
};

type ApiResponse = {
  data: Message[];
  prevCursorId: string | null;
};

// 🔹 Fetch messages (older on scroll up)
export const fetchMessages = async ({ pageParam = null, roomId }: { pageParam: string | null, roomId: string }): Promise<ApiResponse> => {
  const res = await api.get("/v1/messages", {
    params: { cursorId: pageParam, roomId },
  });
  return res.data;
};

// 🔹 Send message
export const sendMessage = async (handleId: string, formData: FormData) => {
  const res = await api.post(`/v1/messages/${handleId}`, formData);
  return res.data;
};

// 🔹 Delete messages
export const deleteMessages = async (ids: number[]) => {
  await api.delete("/v1/messages", { data: { ids } });
};
