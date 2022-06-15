import React, {useState} from 'react';

import {ApolloClient, ApolloProvider, InMemoryCache, HttpLink, NormalizedCacheObject} from '@apollo/client';
import {AppRouter} from "./AppRouter";
import {Box, createTheme, CssBaseline, ThemeProvider} from "@mui/material";

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: 'http://localhost:9000/v1/graphql',
    }),
    cache: new InMemoryCache(),
  });
};

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [client] = useState(createApolloClient())
  return (
    <ApolloProvider client={client}>
      <CssBaseline />
      <ThemeProvider theme={darkTheme}>
        <Box sx={{
          backgroundColor: "background.default",
          height: "100vh"
        }}>
          <AppRouter/>
        </Box>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
