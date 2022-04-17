import client from "../apollo/client";
import {
  CREATE_TODO_MUTATION,
  DELETE_TODO_MUTATION,
  UPDATE_TODO_MUTATION,
} from "../apollo/mutations/todo";
import { TODOS_QUERY } from "../apollo/queries/todo";

export function getTodos(
  first?: number,
  after?: string,
  filter?: {
    done?: boolean;
  }
) {
  return client.query({
    query: TODOS_QUERY,
    variables: { first, after, filter },
    fetchPolicy: "network-only",
  });
}

export function createTodo(data: { title: string; description: string }) {
  return client.mutate({
    mutation: CREATE_TODO_MUTATION,
    variables: { data },
  });
}

export function updateTodo(
  id: string,
  data: { title: string; description: string; done: boolean }
) {
  return client.mutate({
    mutation: UPDATE_TODO_MUTATION,
    variables: { id, data },
  });
}

export function deleteTodo(id: string) {
  return client.mutate({
    mutation: DELETE_TODO_MUTATION,
    variables: { id },
  });
}
