

import typeDefs from './schema';
import resolvers from './resolvers'
import {ApolloServer} from "apollo-server";

const server = new ApolloServer({typeDefs, resolvers});
const PORT = 5100;

server.listen(PORT).then(({url}) => {
  console.log(`Server ready at ${url}`);
});