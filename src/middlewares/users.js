async function loadUser(ctx, next) {
    ctx.state.user = await ctx.orm.user.findByPk(ctx.params.id);
    if (!ctx.state.user) return ctx.throw(404, 'Este usuario no existe');
    return next();
}
  
module.exports = {
loadUser,
};