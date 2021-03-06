import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  Typography,
} from "@mui/material";
import { Todo } from "../../models/todo";
import { deleteTodo } from "../../services/todo";
import { useHomeContext } from "../../contexts/home";

interface TodoListItemProps {
  todo: Todo;
}

export default function TodoListItem({ todo }: TodoListItemProps) {
  const { openDialog, refreshTodos } = useHomeContext();

  async function handleDelete() {
    await deleteTodo(todo.id);
    refreshTodos();
  }

  async function handleEdit() {
    openDialog(todo);
  }

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}
        >
          {todo.title}
        </Typography>
        <Checkbox checked={todo.done} disabled />
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{todo.description}</Typography>
      </AccordionDetails>
      <AccordionActions>
        <Button variant="outlined" color="info" onClick={handleEdit}>
          Edit
        </Button>
        <Button variant="outlined" color="error" onClick={handleDelete}>
          Delete
        </Button>
      </AccordionActions>
    </Accordion>
  );
}
