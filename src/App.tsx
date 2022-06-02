import React, {useState} from 'react';

import {ApolloClient, ApolloProvider, InMemoryCache, HttpLink, NormalizedCacheObject} from '@apollo/client';
import TechTypeList from "./management/techType/TechTypeList";

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
      <TechTypeList/>
    </ApolloProvider>
  );
}

export default App;
