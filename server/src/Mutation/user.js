module.exports = {
  createUser(parent, { name, email, password }, ctx, info) {
    return ctx.db.mutation.createUser(
      { data: { name, email, password, isAdmin: false } },
      info,
    );
  },
  deleteUser(parent, { id }, ctx, info) {
    return ctx.db.mutation.deleteUser({ where: { id } }, info);
  },
  updateUser(parent, { id, name, email, password }, ctx, info) {
    return ctx.db.mutation.updateUser(
      {
        where: { id },
        data: { name, email, password },
      },
      info,
    );
  },
};
