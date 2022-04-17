import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";
import client from "../apollo/client";
import {
  deleteAccessToken,
  deleteRefreshToken,
  getAccessToken,
  setAccessToken,
  setRefreshToken,
} from "../common/auth";
import { getUserInfo, login as authLogin } from "../services/auth";

interface LoginData {
  email: string;
  password: string;
}

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  loading: boolean;
  user: User | undefined;
  isAuthenticated: boolean;
  login: (data: LoginData) => Promise<any>;
  logout: () => Promise<void>;
}

const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | undefined>(undefined);
  const isAuthenticated = !!user;
  const router = useRouter();

  useEffect(() => {
    async function loadStorage() {
      const token = getAccessToken();

      if (token) {
        await getUser();
      }
      setLoading(false);
    }

    loadStorage();
  }, []);

  async function getUser() {
    const { data } = await getUserInfo();

    if (data && data.me) {
      setUser(data.me);
    }
  }

  async function login({ email, password }: LoginData) {
    const { data } = await authLogin(email, password);

    if (data && data.login) {
      setAccessToken(data.login.accessToken);
      setRefreshToken(data.login.refreshToken);
      await getUser();
    }
  }

  async function logout() {
    deleteAccessToken();
    deleteRefreshToken();
    setUser(undefined);
    await client.resetStore();
    await router.push("/login");
  }

  return (
    <AuthContext.Provider
      value={{ loading, user, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
