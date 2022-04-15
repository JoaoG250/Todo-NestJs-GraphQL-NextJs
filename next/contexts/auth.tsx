import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { gql } from "@apollo/client";
import client from "../api/apollo-client";
import { useRouter } from "next/router";

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
      const { "nextauth.token": token } = parseCookies();

      if (token) {
        await getUser();
      }
      setLoading(false);
    }

    loadStorage();
  }, []);

  async function getUser() {
    const meQuery = gql`
      query me {
        me {
          id
          name
        }
      }
    `;

    const { data } = await client.query({
      query: meQuery,
    });

    if (data && data.me) {
      setUser(data.me);
    }
  }

  async function login({ email, password }: LoginData) {
    const loginMutation = gql`
      mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          accessToken
          refreshToken
        }
      }
    `;

    const { data } = await client.mutate({
      mutation: loginMutation,
      variables: { email, password },
    });

    if (data && data.login) {
      setCookie({}, "nextauth.token", data.login.accessToken, {
        maxAge: 60 * 2,
        path: "/",
      });
      setCookie({}, "nextauth.refreshToken", data.login.refreshToken, {
        maxAge: 60 * 60 * 24 * 1,
        path: "/",
      });

      await getUser();
    }
  }

  async function logout() {
    destroyCookie({}, "nextauth.token");
    destroyCookie({}, "nextauth.refreshToken");
    setUser(undefined);
    await router.push("/");
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
