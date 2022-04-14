/**
 * A type alias for cursors in this implementation.
 */
export declare type ConnectionCursor = string;
/**
 * A type describing the arguments a connection field receives in GraphQL.
 */
export interface ConnectionArguments {
  before?: ConnectionCursor | null;
  after?: ConnectionCursor | null;
  first?: number | null;
  last?: number | null;
}
/**
 * A type designed to be exposed as a `Connection` over GraphQL.
 */
export interface Connection<T> {
  edges: Array<Edge<T>>;
  pageInfo: PageInfo;
}
/**
 * A type designed to be exposed as a `Edge` over GraphQL.
 */
export interface Edge<T> {
  node: T;
  cursor: ConnectionCursor;
}
/**
 * A type designed to be exposed as `PageInfo` over GraphQL.
 */
export interface PageInfo {
  startCursor: ConnectionCursor | null;
  endCursor: ConnectionCursor | null;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
