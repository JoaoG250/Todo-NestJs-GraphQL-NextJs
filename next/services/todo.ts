import client from "../apollo/client";
import { CREATE_TODO_MUTATION } from "../apollo/mutations/todo";
import { TODOS_QUERY } from "../apollo/queries/todo";

export function getTodos(variables: {
  first?: number;
  after?: string;
  last?: number;
  before?: string;
}) {
  return client.query({
    query: TODOS_QUERY,
    variables,
    fetchPolicy: "network-only",
  });
}

export function createTodo(data: { title: string; description: string }) {
  return client.mutate({
    mutation: CREATE_TODO_MUTATION,
    variables: { data },
  });
}
