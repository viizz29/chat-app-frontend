import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../../api/todo-api";
import { Formik } from "formik";

import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  CircularProgress,
  Stack,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

export default function TodoPage() {
  const queryClient = useQueryClient();

  // 📄 fetch todos
  const { data: todos = [], isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  // ➕ create
  const createMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // ✏️ update
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: any) => updateTodo(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // ❌ delete
  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box maxWidth={600} mx="auto" p={2}>
      <Stack spacing={2}>
        <Typography variant="h5" fontWeight="bold">
          Todo List
        </Typography>

        {/* ➕ Create */}
        <Formik
          initialValues={{ title: "" }}
          onSubmit={(values, { resetForm }) => {
            createMutation.mutate(values.title);
            resetForm();
          }}
        >
          {({ handleSubmit, handleChange, values }) => (
            <Box
              component="form"
              onSubmit={handleSubmit}
              display="flex"
              gap={1}
            >
              <TextField
                name="title"
                value={values.title}
                onChange={handleChange}
                placeholder="New todo..."
                fullWidth
                size="small"
              />

              <Button
                type="submit"
                variant="contained"
              >
                Add
              </Button>
            </Box>
          )}
        </Formik>

        {/* 📄 List */}
        <Paper>
          <List>
            {todos.map((todo: any) => (
              <ListItem
                key={todo.id}
                divider
                secondaryAction={
                  <IconButton
                    aria-label="delete"
                    edge="end"
                    color="error"
                    onClick={() => deleteMutation.mutate(todo.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={todo.title}
                  onClick={() =>
                    updateMutation.mutate({
                      id: todo.id,
                      data: { completed: !todo.completed },
                    })
                  }
                  sx={{
                    cursor: "pointer",
                    textDecoration: todo.completed
                      ? "line-through"
                      : "none",
                    color: todo.completed
                      ? "text.secondary"
                      : "text.primary",
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Stack>
    </Box>
  );
}