import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { createTodo } from "../../services/todo";
import { useHomeContext } from "../../contexts/home";

export default function CreateTodoDialog() {
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const { refreshTodos } = useHomeContext();

  function closeDialog() {
    setTitle("");
    setDescription("");
    setOpen(false);
  }

  function openDialog() {
    setOpen(true);
  }

  async function submit() {
    await createTodo({ title, description });

    refreshTodos();
    closeDialog();
  }

  return (
    <>
      <Button variant="contained" onClick={openDialog}>
        Create Todo
      </Button>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Create Todo</DialogTitle>
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
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  name="description"
                  required
                  fullWidth
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
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
    </>
  );
}
