import {
  createContext,
  ReactNode,
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

export function HomeProvider({ children }: { children: ReactNode }) {
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

  useEffect(() => {
    async function fetchData() {
      setTodos(await fetchTodos());
    }
    fetchData();
  }, []);

  async function fetchTodos(): Promise<Todo[]> {
    setLoading(true);
    const { data } = await getTodos(10);
    setLoading(false);
    return data.todos.edges.map((edge: TodoEdge) => edge.node);
  }

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
