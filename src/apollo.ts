import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { LOCAL_STORAGE_TOKEN } from "./constants";
import { setContext } from "@apollo/client/link/context";

export const isLoggedInVar = makeVar(
  Boolean(localStorage.getItem(LOCAL_STORAGE_TOKEN))
);
export const jwtTokenVar = makeVar(localStorage.getItem(LOCAL_STORAGE_TOKEN));

const httpLink = createHttpLink({
  uri: "http://54.180.223.40:3000/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "x-jwt": jwtTokenVar() || "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              return isLoggedInVar();
            },
          },
          token: {
            read() {
              return jwtTokenVar();
            },
          },
        },
      },
    },
  }),
});

export default client;
