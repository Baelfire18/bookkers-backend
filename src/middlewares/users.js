async function loadUser(ctx, next) {
  ctx.state.user = await ctx.orm.user.findByPk(ctx.params.userId);
  if (!ctx.state.user) return ctx.throw(404, 'This user does not exists');
  return next();
}

module.exports = {
  loadUser,
};
