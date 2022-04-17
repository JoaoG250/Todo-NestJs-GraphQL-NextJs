import { gql } from "@apollo/client";

export const TODOS_QUERY = gql`
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
