import { gql } from "@apollo/client";

export const CREATE_TODO_MUTATION = gql`
  mutation createTodo($data: CreateTodoInput!) {
    createTodo(data: $data) {
      id
      title
      description
      done
    }
  }
`;
