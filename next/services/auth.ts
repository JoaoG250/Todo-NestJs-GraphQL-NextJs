import client from "../apollo/client";
import { LOGIN_MUTATION, REGISTER_MUTATION } from "../apollo/mutations/auth";
import { ME_QUERY } from "../apollo/queries/auth";

export function getUserInfo() {
  return client.query({
    query: ME_QUERY,
  });
}

export function login(email: string, password: string) {
  return client.mutate({
    mutation: LOGIN_MUTATION,
    variables: { email, password },
  });
}

export function register(name: string, email: string, password: string) {
  return client.mutate({
    mutation: REGISTER_MUTATION,
    variables: { name, email, password },
  });
}
