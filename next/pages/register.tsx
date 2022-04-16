import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import AuthLayout from "../components/layouts/auth";
import { NextPageWithLayout } from "../types";
import { gql } from "@apollo/client";
import client from "../api/apollo-client";
import Head from "next/head";

const Register: NextPageWithLayout = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const registerMutation = gql`
      mutation register($name: String!, $email: String!, $password: String!) {
        register(name: $name, email: $email, password: $password)
      }
    `;

    await client.mutate({
      mutation: registerMutation,
      variables: { name, email, password },
    });

    await router.push("/login");
  }

  return (
    <>
      <Head>
        <title>Register - Todo App</title>
      </Head>

      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="name"
                label="User name"
                autoComplete="given-name"
                required
                fullWidth
                autoFocus
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email address"
                name="email"
                autoComplete="email"
                required
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="password"
                name="password"
                label="Password"
                autoComplete="new-password"
                required
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <NextLink href="/login" passHref>
                <Link variant="body2">Already have an account? Login</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

Register.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default Register;
