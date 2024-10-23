import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs, resolvers } from "./dogs/index.js";

//AppoloServer constructor will need two parameters
//schema and set of resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

//Pass appoloserver instance to startStandaloneserver
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`server ready at url:${url}`)