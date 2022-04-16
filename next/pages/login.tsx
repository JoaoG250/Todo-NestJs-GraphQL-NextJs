import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import AuthLayout from "../components/layouts/auth";
import { useAuth } from "../contexts/auth";
import { NextPageWithLayout } from "../types";

const Login: NextPageWithLayout = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const { login } = useAuth();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await login({ email, password });
    await router.push("/");
  }

  return (
    <>
      <Head>
        <title>Login - Todo App</title>
      </Head>

      <Typography component="h1" variant="h5">
        Login
      </Typography>
      <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          name="email"
          label="Email address"
          margin="normal"
          autoComplete="email"
          required
          fullWidth
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          type="password"
          name="password"
          label="Password"
          margin="normal"
          autoComplete="current-password"
          fullWidth
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3, mb: 2 }}
        >
          Login
        </Button>
        <Grid container justifyContent="center">
          <Grid item>
            <NextLink href="/register" passHref>
              <Link variant="body2">{"Don't have an account? Register"}</Link>
            </NextLink>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

Login.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default Login;
