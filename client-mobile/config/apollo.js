import {
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://18.141.137.159/",
  cache: new InMemoryCache(),
});

export default client