import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import App from './Components/App';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://fmt-gql-server.herokuapp.com/' }),
  cache: new InMemoryCache({dataIdFromObject: o => o.id})
});


ReactDOM.render( 
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>, document.getElementById('root'));