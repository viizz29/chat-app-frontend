import api from "./client";

export const loginApi = async (email: string, password: string) => {
  const response = await api.post("/v1/auth/login", {
    email,
    password,
  });

  return response.data; 
  // expected: { token: "...", user: {...} }
};