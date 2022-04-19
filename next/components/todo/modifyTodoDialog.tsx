import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useHomeContext } from "../../contexts/home";
import { createTodo, updateTodo } from "../../services/todo";

export default function ModifyTodoDialog() {
  const {
    dialogOpen: open,
    editingTodo: todo,
    closeDialog,
    refreshTodos,
  } = useHomeContext();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [done, setDone] = useState<boolean>(false);

  useEffect(() => {
    setTitle(todo?.title || "");
    setDescription(todo?.description || "");
    setDone(todo?.done || false);
  }, [todo, open]);

  async function submit() {
    if (todo) {
      await updateTodo(todo.id, { title, description, done });
    } else {
      await createTodo({ title, description });
    }

    refreshTodos();
    closeDialog();
  }

  const dialogTitle = todo ? "Edit Todo" : "Create Todo";

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
      <DialogContent>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="title"
                label="Title"
                required
                fullWidth
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                required
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            {todo && (
              <Grid item xs={12}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={done}
                        onChange={(e) => setDone(e.target.checked)}
                      />
                    }
                    label="Done"
                  />
                </FormGroup>
              </Grid>
            )}
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Close</Button>
        <Button variant="contained" onClick={submit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
