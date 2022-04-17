import Empty from "../list/empty";
import TodoListItem from "./todoListItem";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Todo, TodoEdge } from "../../models/todo";
import { getTodos } from "../../services/todo";

async function fetchTodos(): Promise<Todo[]> {
  const { data } = await getTodos({ first: 10 });
  return data.todos.edges.map((edge: TodoEdge) => edge.node);
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    async function fetchData() {
      setTodos(await fetchTodos());
    }

    fetchData();
  }, []);

  async function refresh() {
    setTodos(await fetchTodos());
  }

  return (
    <>
      <Box sx={{ my: 4 }}>
        {todos.map((todo) => (
          <TodoListItem key={todo.id} todo={todo} />
        ))}
        {todos.length === 0 && (
          <Empty message="No todos found. Add a new one!" />
        )}
      </Box>
    </>
  );
}
