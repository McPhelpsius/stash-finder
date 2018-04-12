function createStash(
  parent,
  { name, lat, lng, claimCode, clue1, clue2 },
  ctx,
  info,
) {
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
}
function deleteStash(parent, { id }, ctx, info) {
  return ctx.db.mutation.deleteStash({ where: { id } }, info);
}

function updateStash(
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
}

async function claimStash(parent, { id, claimCode }, ctx, info) {
  const stash = await ctx.db.query.stash({ where: { id } });
  if (stash.claimCode === claimCode) {
    return ctx.db.mutation.updateStash(
      {
        where: { id },
        data: { claimed: true },
      },
      info,
    );
  }

  return new Error('That claim code is wrong');
}

module.exports = {
  createStash,
  deleteStash,
  updateStash,
  claimStash,
};
