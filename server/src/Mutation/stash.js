module.exports = {
  createStash(parent, { name, email, password }, ctx, info) {
    return ctx.db.mutation.createStash(
      {
        data: {
          name,
          lat,
          long,
          claimCode,
          clue1,
          clue2,
          claimed: false,
        },
      },
      info,
    );
  },
  deleteStash(parent, { id }, ctx, info) {
    return ctx.db.mutation.deleteStash({ where: { id } }, info);
  },
  updateStash(
    parent,
    { id, name, lat, long, claimCode, clue1, clue2, claimed },
    ctx,
    info,
  ) {
    return ctx.db.mutation.updateStash(
      {
        where: { id },
        data: {
          name,
          lat,
          long,
          claimCode,
          clue1,
          clue2,
          claimed,
        },
      },
      info,
    );
  },
};
