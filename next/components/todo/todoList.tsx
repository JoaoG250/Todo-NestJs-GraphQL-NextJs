import Empty from "../list/empty";
import TodoListItem from "./todoListItem";
import { Box } from "@mui/material";
import { Todo } from "../../models/todo";

interface TodoListProps {
  todos: Todo[];
}

export default function TodoList({ todos }: TodoListProps) {
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
