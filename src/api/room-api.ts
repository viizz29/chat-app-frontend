import api from "./client";

export interface Room {
  id: string;
  title: string;
}

export const getRooms = async (): Promise<Room[]> => {
  const res = await api.get("/v1/rooms");
  return res.data;
};


export const createRoom = async (secondMemberId: string) => {
  return api.post("/v1/rooms", { secondMemberId });
};
