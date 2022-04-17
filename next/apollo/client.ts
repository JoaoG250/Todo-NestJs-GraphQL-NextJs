import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import refreshLink from "./links/refreshLink";
import authLink from "./links/authLink";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const client = new ApolloClient({
  link: refreshLink.concat(authLink).concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
