async function loadBook(ctx, next) {
  ctx.state.book = await ctx.orm.book.findByPk(ctx.params.bookId);
  if (!ctx.state.book) return ctx.throw(404, 'This book does not exists');
  return next();
}

module.exports = {
  loadBook,
};
