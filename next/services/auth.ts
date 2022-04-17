import client from "../apollo/client";
import { LOGIN_MUTATION, REGISTER_MUTATION } from "../apollo/mutations/auth";
import { ME_QUERY } from "../apollo/queries/auth";

export function getUserInfo() {
  return client.query({
    query: ME_QUERY,
  });
}

export function login(variables: { email: string; password: string }) {
  return client.mutate({
    mutation: LOGIN_MUTATION,
    variables,
  });
}

export function register(variables: {
  name: string;
  email: string;
  password: string;
}) {
  return client.mutate({
    mutation: REGISTER_MUTATION,
    variables,
  });
}
