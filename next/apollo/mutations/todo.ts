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

export const UPDATE_TODO_MUTATION = gql`
  mutation updateTodo($id: ID!, $data: UpdateTodoInput!) {
    updateTodo(id: $id, data: $data) {
      id
      title
      description
      done
    }
  }
`;

export const DELETE_TODO_MUTATION = gql`
  mutation deleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
      title
      description
      done
    }
  }
`;
