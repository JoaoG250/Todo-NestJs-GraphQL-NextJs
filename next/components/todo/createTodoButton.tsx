import { Button } from "@mui/material";

import { useHomeContext } from "../../contexts/home";

export default function CreateTodoButton() {
  const { openDialog } = useHomeContext();

  function onClick() {
    openDialog();
  }

  return (
    <Button variant="contained" onClick={onClick}>
      Create Todo
    </Button>
  );
}
