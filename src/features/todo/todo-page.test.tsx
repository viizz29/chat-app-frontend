import { screen, fireEvent, waitFor } from "@testing-library/react";
import TodoPage from "./todo-page";
import { renderWithClient } from "@/test-utils";
import userEvent from "@testing-library/user-event";

describe("TodoPage", () => {
  test("shows loading state", () => {
    renderWithClient(<TodoPage />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("renders todos after fetch", async () => {
    renderWithClient(<TodoPage />);

    const todo = await screen.findByText("Learn React");
    expect(todo).toBeInTheDocument();
  });

  test("creates a new todo", async () => {
    renderWithClient(<TodoPage />);

    const input = await screen.findByPlaceholderText("New todo...");
    const button = screen.getByRole("button", { name: /add/i });

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("New Task")).toBeInTheDocument();
    });
  });

  test("toggles todo completion", async () => {
    renderWithClient(<TodoPage />);

    const todo = await screen.findByText("Learn React");

    await userEvent.click(todo);

    await waitFor(async () => {
      const parent = todo.parentElement;
      expect(parent).toHaveStyle({
        textDecoration: "line-through",
      });
    });
  });

  

  test("deletes a todo", async () => {
    renderWithClient(<TodoPage />);

    const todo = await screen.findByText("Learn React");

    const deleteButtons = await screen.findAllByRole("button", {
      name: /delete/i,
    });

    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(todo).not.toBeInTheDocument();
    });
  });
});