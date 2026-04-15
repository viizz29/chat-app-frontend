import { http, HttpResponse } from "msw";

interface TodoItem {
  id: number,
  title: string,
  completed: boolean,
}

let todos: TodoItem[] = [
  { id: 1, title: "Learn React", completed: false },
  { id: 2, title: "Setup project", completed: true },
];

// 📄 GET todos
const getTodos = http.get("/api/v1/todos", () => {
  return HttpResponse.json(todos);
});

// ➕ CREATE todo
const createTodo = http.post("/api/v1/todos", async ({ request }) => {
  const body = await request.json() as { title: string };

  const newTodo = {
    id: Date.now(),
    title: body.title,
    completed: false,
  };

  todos.push(newTodo);

  return HttpResponse.json(newTodo);
});

// ✏️ UPDATE todo
const updateTodo = http.put("/api/v1/todos/:id", async ({ params, request }) => {
  const id = Number(params.id);
  const body = await request.json() as TodoItem;

  todos = todos.map((t) =>
    t.id === id ? { ...t, ...body } : t
  );

  return HttpResponse.json({ success: true });
});

// ❌ DELETE todo
const deleteTodo = http.delete("/api/v1/todos/:id", ({ params }) => {
  const id = Number(params.id);

  todos = todos.filter((t) => t.id !== id);

  return HttpResponse.json({ success: true });
});

export const handlers = [
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
];