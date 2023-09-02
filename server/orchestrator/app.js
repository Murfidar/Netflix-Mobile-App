if (process.env.NODE_ENV !== "Production") {
  require("dotenv").config();
}

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const [movieTypeDefs, movieResolvers] = require("./schemas/movieSchema");
const [userTypeDefs, userResolvers] = require("./schemas/userSchema");

const server = new ApolloServer({
  typeDefs: [movieTypeDefs, userTypeDefs],
  resolvers: [movieResolvers, userResolvers],
  introspection: true,
});

startStandaloneServer(server, {
  listen: { port: process.env.PORT || 4000 },
})
  .then(({ url }) => {
    console.log(`Server ready at: ${url}`);
  })
  .catch((error) => console.log(error));
