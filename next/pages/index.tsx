import { GetServerSideProps } from "next";
import Head from "next/head";
import { ReactElement, useEffect, useState } from "react";
import { getAccessToken } from "../common/auth";
import DefaultLayout from "../components/layouts/default";
import CreateTodoDialog from "../components/todo/createTodoDialog";
import TodoList from "../components/todo/todoList";
import { Todo, TodoEdge } from "../models/todo";
import { getTodos } from "../services/todo";
import { NextPageWithLayout } from "../types";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = getAccessToken(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const Home: NextPageWithLayout = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    async function fetchData() {
      setTodos(await fetchTodos());
    }
    fetchData();
  }, []);

  async function fetchTodos(): Promise<Todo[]> {
    const { data } = await getTodos({ first: 10 });
    return data.todos.edges.map((edge: TodoEdge) => edge.node);
  }

  async function refresh() {
    setTodos(await fetchTodos());
  }

  return (
    <>
      <Head>
        <title>Home - Todo App</title>
      </Head>

      <CreateTodoDialog onCreated={refresh} />
      <TodoList todos={todos} />
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Home;
