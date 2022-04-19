import { ParsedUrlQuery } from "querystring";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Todo, TodoEdge } from "../models/todo";
import { getTodos } from "../services/todo";

interface HomeContextType {
  loading: boolean;
  todos: Todo[];
  dialogOpen: boolean;
  editingTodo: Todo | undefined;
  openDialog: (todo?: Todo) => void;
  closeDialog: () => void;
  refreshTodos: () => void;
}

const HomeContext = createContext({} as HomeContextType);

export function HomeProvider({
  query,
  children,
}: {
  query: ParsedUrlQuery;
  children: ReactNode;
}) {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | undefined>(undefined);

  function openDialog(todo?: Todo) {
    setEditingTodo(todo);
    setDialogOpen(true);
  }

  function closeDialog() {
    setDialogOpen(false);
    setEditingTodo(undefined);
  }

  function getFilter(query: ParsedUrlQuery) {
    const filter: { done?: boolean } = {};
    if (query.done === "true") {
      filter.done = true;
    } else if (query.done === "false") {
      filter.done = false;
    }
    return filter;
  }

  const fetchTodos = useCallback(async () => {
    setLoading(true);
    const { data } = await getTodos({ first: 10, filter: getFilter(query) });
    setLoading(false);
    return data.todos.edges.map((edge: TodoEdge) => edge.node);
  }, [query]);

  useEffect(() => {
    async function fetchData() {
      setTodos(await fetchTodos());
    }
    fetchData();
  }, [fetchTodos]);

  async function refresh() {
    setTodos(await fetchTodos());
  }

  return (
    <HomeContext.Provider
      value={{
        loading,
        todos,
        dialogOpen,
        editingTodo,
        openDialog,
        closeDialog,
        refreshTodos: refresh,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
}

export function useHomeContext() {
  const context = useContext(HomeContext);

  if (!context) {
    throw new Error("useHomeContext must be used within a HomeProvider");
  }

  return context;
}
