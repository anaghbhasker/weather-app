import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { createApolloProvider } from "@vue/apollo-option";

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
    cache,
    uri: "http://localhost:4000/graphql",
});
const apolloProvider = createApolloProvider({
    defaultClient: apolloClient,
});

export default apolloProvider;
