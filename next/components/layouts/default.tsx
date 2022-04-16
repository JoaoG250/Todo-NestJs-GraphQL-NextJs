import {
  AppBar,
  Button,
  Container,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";
import { useAuth } from "../../contexts/auth";

export default function DefaultLayout({ children }: { children: ReactNode }) {
  const { logout } = useAuth();

  return (
    <>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Todo App
          </Typography>
          <nav>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Todo
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Done
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              All Todos
            </Link>
          </nav>
          <Button variant="outlined" sx={{ my: 1, mx: 1.5 }} onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container component="main">{children}</Container>
    </>
  );
}
