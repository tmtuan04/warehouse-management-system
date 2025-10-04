import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import fetch from "cross-fetch";
import dotenv from "dotenv";

dotenv.config();

const HASURA_GRAPHQL_ENDPOINT = process.env.HASURA_GRAPHQL_ENDPOINT;
const HASURA_ADMIN_SECRET = process.env.HASURA_GRAPHQL_ADMIN_SECRET;

const client = new ApolloClient({
  link: new HttpLink({
    uri: HASURA_GRAPHQL_ENDPOINT,
    fetch,
    headers: {
      "x-hasura-admin-secret": HASURA_ADMIN_SECRET,
    },
  }),
  cache: new InMemoryCache(),
});

export default client;