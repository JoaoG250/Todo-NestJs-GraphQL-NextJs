import { GetServerSideProps } from "next";
import Head from "next/head";
import { ReactElement } from "react";
import { getAccessToken } from "../common/auth";
import DefaultLayout from "../components/layouts/default";
import CreateTodoDialog from "../components/todo/createTodoDialog";
import TodoList from "../components/todo/todoList";
import { HomeProvider } from "../contexts/home";
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
  return (
    <>
      <Head>
        <title>Home - Todo App</title>
      </Head>

      <HomeProvider>
        <CreateTodoDialog />
        <TodoList />
      </HomeProvider>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Home;
