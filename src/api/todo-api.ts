import api from "./client";

export const getTodos = async () => {
  const res = await api.get("/v1/todos");
  return res.data;
};

export const createTodo = async (title: string) => {
  const res = await api.post("/v1/todos", { title });
  return res.data;
};

export const updateTodo = async (id: number, data: any) => {
  const res = await api.put(`/v1/todos/${id}`, data);
  return res.data;
};

export const deleteTodo = async (id: number) => {
  const res = await api.delete(`/v1/todos/${id}`);
  return res.data;
};