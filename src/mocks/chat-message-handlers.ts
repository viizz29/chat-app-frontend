
import { http, HttpResponse } from "msw";


type Message = {
    id: number;
    text?: string;
    fileUrl?: string;
    fileType?: string;
    createdAt: string;
};

let AUTO_ID = 1000;

// In-memory DB
let messages: Message[] = Array.from({ length: 50 }).map((_, i) => ({
    id: i + 1,
    text: `Message ${i + 1}`,
    createdAt: new Date(Date.now() - (50 - i) * 60000).toISOString(),
}));

const getNextId = () => ++AUTO_ID;

const PAGE_SIZE = 10;

export const handlers = [
  /**
   * 📥 GET /api/v1/messages
   * cursor-based pagination (load older messages)
   */
  http.get("/api/v1/messages", async ({ request }) => {
    const url = new URL(request.url);
    const cursor = url.searchParams.get("cursor");

    // simulate delay
    await new Promise((res) => setTimeout(res, 400));

    let endIndex = messages.length;

    if (cursor) {
      const cursorId = Number(cursor);
      endIndex = messages.findIndex((m) => m.id === cursorId);
      if (endIndex === -1) endIndex = messages.length;
    }

    const startIndex = Math.max(0, endIndex - PAGE_SIZE);
    const page = messages.slice(startIndex, endIndex);

    return HttpResponse.json({
      data: page,
      prevCursor: startIndex > 0 ? messages[startIndex].id : null,
    });
  }),

  /**
   * 📤 POST /api/v1/messages
   * supports text + file upload
   */
  http.post("/api/v1/messages", async ({ request }) => {
    const formData = await request.formData();

    const text = formData.get("text") as string | null;
    const file = formData.get("file") as File | null;

    let newMessage: Message = {
      id: getNextId(),
      createdAt: new Date().toISOString(),
    };

    if (text) {
      newMessage.text = text;
    }

    if (file) {
      // Fake file URL
      newMessage.fileUrl = URL.createObjectURL(file);
      newMessage.fileType = file.type || file.name;
    }

    messages.push(newMessage);

    return HttpResponse.json(newMessage);
  }),

  /**
   * ❌ DELETE /api/v1/messages
   * delete multiple messages
   */
  http.delete("/api/v1/messages", async ({ request }) => {
    const body = await request.json() as {ids: []};

    if(!body ) return HttpResponse.json({ success: false });

    const ids: number[] = body.ids || [];

    // simulate delay
    await new Promise((res) => setTimeout(res, 300));

    for (const id of ids) {
      const index = messages.findIndex((m) => m.id === id);
      if (index !== -1) {
        messages.splice(index, 1);
      }
    }

    return HttpResponse.json({ success: true });
  }),
];