import {
  AppBar,
  Button,
  Container,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
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
          <NextLink href="/" passHref>
            <Link underline="none" sx={{ flexGrow: 1 }}>
              <Typography variant="h6" color="inherit" noWrap>
                Todo App
              </Typography>
            </Link>
          </NextLink>

          <nav>
            <NextLink href={{ pathname: "/", query: { done: false } }} passHref>
              <Link
                variant="button"
                color="text.primary"
                sx={{ my: 1, mx: 1.5 }}
              >
                Todo
              </Link>
            </NextLink>
            <NextLink href={{ pathname: "/", query: { done: true } }} passHref>
              <Link
                variant="button"
                color="text.primary"
                sx={{ my: 1, mx: 1.5 }}
              >
                Done
              </Link>
            </NextLink>
            <NextLink href="/" passHref>
              <Link
                variant="button"
                color="text.primary"
                sx={{ my: 1, mx: 1.5 }}
              >
                All Todos
              </Link>
            </NextLink>
          </nav>
          <Button variant="outlined" sx={{ my: 1, mx: 1.5 }} onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ pt: 4 }} component="main">
        {children}
      </Container>
    </>
  );
}
