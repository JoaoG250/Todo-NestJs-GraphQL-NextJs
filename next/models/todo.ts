export interface Todo {
  id: number;
  title: string;
  description: string;
  done: boolean;
}

export interface TodoEdge {
  cursor: string;
  node: Todo;
}
