module.exports = {
  users(parent, args, ctx, info) {
    return ctx.db.query.users(info);
  },
  stashes(parent, args, ctx, info) {
    return ctx.db.query.stashes(info);
  },
  user(parent, { id }, ctx, info) {
    return ctx.db.query.user({ where: { id: id } }, info);
  },
  stash(parent, { id }, ctx, info) {
    return ctx.db.query.stash({ where: { id } }, info);
  },
  // query the currently logged in user
  me(parent, args, ctx, info) {
    const id = getUserId(ctx);
    return ctx.db.query.user({ where: { id } }, info);
  },
};
