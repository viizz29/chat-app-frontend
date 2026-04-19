import api from "./client";



export interface UserRecord {
  id: string;
  name: string;
}

export const searchUsers = async (query: string): Promise<UserRecord[]> => {
  if (!query.trim()) return [];
  const res = await api.get(`/v1/users?q=${encodeURIComponent(query)}`);
  return res.data;
};

