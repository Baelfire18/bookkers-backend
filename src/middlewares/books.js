async function loadBook(ctx, next) {
    ctx.state.book = await ctx.orm.book.findByPk(ctx.params.id);
    if (!ctx.state.book) return ctx.throw(404, 'Este libro no existe');
    return next();
}

module.exports = {
loadBook,
};