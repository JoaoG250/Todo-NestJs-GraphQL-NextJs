import { Todo, TodoEdge } from "../../models/todo";
import TodoListItem from "./todoListItem";
import Empty from "../list/empty";
import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import client from "../../api/apollo-client";
import { gql } from "@apollo/client";

async function fetchTodos(): Promise<Todo[]> {
  const todosQuery = gql`
    query todos($first: Int, $after: String, $filter: FilterTodoInput) {
      todos(first: $first, after: $after, filter: $filter) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        edges {
          cursor
          node {
            id
            title
            description
            done
          }
        }
      }
    }
  `;
  const { data } = await client.query({
    query: todosQuery,
    variables: { first: 10 },
    fetchPolicy: "network-only",
  });

  return data.todos.edges.map((edge: TodoEdge) => edge.node);
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    async function fetchData() {
      setTodos(await fetchTodos());
    }

    fetchData();
  }, []);

  async function refresh() {
    setTodos(await fetchTodos());
  }

  return (
    <>
      <Box sx={{ my: 4 }}>
        {todos.map((todo) => (
          <TodoListItem key={todo.id} todo={todo} />
        ))}
        {todos.length === 0 && (
          <Empty message="No todos found. Add a new one!" />
        )}
      </Box>
    </>
  );
}
