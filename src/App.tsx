import React, {useState} from 'react';

import {ApolloClient, ApolloProvider, InMemoryCache, HttpLink, NormalizedCacheObject} from '@apollo/client';
import {AppRouter} from "./AppRouter";

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: 'http://localhost:9000/v1/graphql',
    }),
    cache: new InMemoryCache(),
  });
};

function App() {
  const [client] = useState(createApolloClient())
  return (
    <ApolloProvider client={client}>
      <AppRouter/>
    </ApolloProvider>
  );
}

export default App;
