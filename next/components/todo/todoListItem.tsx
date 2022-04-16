import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { Todo } from "../../models/todo";

interface TodoListItemProps {
  todo: Todo;
}

export default function TodoListItem({ todo }: TodoListItemProps) {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>{todo.title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{todo.description}</Typography>
      </AccordionDetails>
    </Accordion>
  );
}
