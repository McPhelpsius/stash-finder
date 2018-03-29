const { GraphQLServer } = require("graphql-yoga");
const { Prisma } = require("prisma-binding");

const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      return ctx.db.query.users(info);
    },
    caches(parent, args, ctx, info) {
      return ctx.db.query.caches({ where: { isPublished: false } }, info);
    },
    user(parent, { id }, ctx, info) {
      return ctx.db.query.user({ where: { id: id } }, info);
    },
    cache(parent, { id }, ctx, info) {
      return ctx.db.query.cache({ where: { id } }, info);
    }
  },
  Mutation: {
    createUser(parent, { name, email, password }, ctx, info) {
      return ctx.db.mutation.createUser(
        { data: { name, email, password, isAdmin: false } },
        info
      );
    },
    deleteUser(parent, { id }, ctx, info) {
      return ctx.db.mutation.deleteUser({ where: { id } }, info);
    },
    updateUser(parent, { id, name, email, password }, ctx, info) {
      return ctx.db.mutation.updateUser(
        {
          where: { id },
          data: { name, email, password }
        },
        info
      );
    },
    createCache(parent, { name, email, password }, ctx, info) {
      return ctx.db.mutation.createCache(
        {
          data: {
            name,
            lat,
            long,
            claimCode,
            clue1,
            clue2,
            claimed: false
          }
        },
        info
      );
    },
    deleteCache(parent, { id }, ctx, info) {
      return ctx.db.mutation.deleteCache({ where: { id } }, info);
    },
    updateCache(
      parent,
      { id, name, lat, long, claimCode, clue1, clue2, claimed },
      ctx,
      info
    ) {
      return ctx.db.mutation.updateCache(
        {
          where: { id },
          data: {
            name,
            lat,
            long,
            claimCode,
            clue1,
            clue2,
            claimed
          }
        },
        info
      );
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: "src/generated/prisma.graphql",
      endpoint: "http://localhost:4466/my-react-basic/dev",
      secret: "mysecret123",
      debug: true
    })
  })
});

server.start(() => console.log("Server is running on http://localhost:4000"));
