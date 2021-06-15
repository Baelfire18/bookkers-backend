async function apiSetCurrentUser(ctx, next) {
    const { authData } = ctx.state;
    if (authData) {
        ctx.state.currentUser = await ctx.orm.user.findByPk(authData.sub);
    }
    return next();
}

module.exports = {
    apiSetCurrentUser,
};