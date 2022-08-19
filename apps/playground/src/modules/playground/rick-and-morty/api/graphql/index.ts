// import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GraphQLClient } from 'graphql-request';
import { GRAPHQL_URI } from '../../config';

// import typeDefs from './typedefs';
// import typeDefs from './tipeDefs';

// export const client = new ApolloClient({
//   uri: GRAPHQL_URL,
//   cache: new InMemoryCache(),
//   typeDefs,
// });

// Run GraphQL queries/mutations using a static function
// request(endpoint, query, variables).then((data) => console.log(data))

// ... or create a GraphQL client instance to send requests
export const client = new GraphQLClient(GRAPHQL_URI, { headers: {} });
// client.request(query, variables).then((data) => console.log(data));
