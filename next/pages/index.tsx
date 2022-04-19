import Head from "next/head";
import { GetServerSideProps } from "next";
import { ReactElement } from "react";
import { getAccessToken } from "../common/auth";
import DefaultLayout from "../components/layouts/default";
import CreateTodoButton from "../components/todo/createTodoButton";
import ModifyTodoDialog from "../components/todo/modifyTodoDialog";
import TodoList from "../components/todo/todoList";
import { HomeProvider } from "../contexts/home";
import { NextPageWithLayout } from "../types";
import { useRouter } from "next/router";

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
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Home - Todo App</title>
      </Head>

      <HomeProvider query={router.query}>
        <ModifyTodoDialog />
        <CreateTodoButton />
        <TodoList />
      </HomeProvider>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Home;
