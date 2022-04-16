import { GetServerSideProps } from "next";
import Head from "next/head";
import { parseCookies } from "nookies";
import { ReactElement } from "react";
import DefaultLayout from "../components/layouts/default";
import { NextPageWithLayout } from "../types";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ["nextauth.token"]: token } = parseCookies(ctx);

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
        <title>Todo App</title>
      </Head>

      <h1>Todo App</h1>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Home;
