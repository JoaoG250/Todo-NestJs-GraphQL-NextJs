import Empty from "../list/empty";
import TodoListItem from "./todoListItem";
import { Box } from "@mui/material";
import { useHomeContext } from "../../contexts/home";

export default function TodoList() {
  const { todos } = useHomeContext();

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
