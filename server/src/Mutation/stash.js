module.exports = {
  createStash(parent, { name, lat, lng, claimCode, clue1, clue2 }, ctx, info) {
    return ctx.db.mutation.createStash(
      {
        data: {
          name,
          lat,
          lng,
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
    { id, name, lat, lng, claimCode, clue1, clue2, claimed },
    ctx,
    info,
  ) {
    return ctx.db.mutation.updateStash(
      {
        where: { id },
        data: {
          name,
          lat,
          lng,
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
