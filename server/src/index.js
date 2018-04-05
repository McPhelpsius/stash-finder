const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');
const Query = require('./Query');
const { user, stash, auth } = require('./Mutation');
const { signup, login, AuthPayload } = auth;

const resolvers = {
  Query,
  Mutation: {
    ...user,
    ...stash,
    signup,
    login,
  },
  AuthPayload,
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'http://localhost:4466/my-react-basic/dev',
      secret: 'mysecret123',
      debug: true,
    }),
  }),
});

server.start(() => console.log('Server is running on http://localhost:4000'));
