async function loadReview(ctx, next) {
  ctx.state.book = await ctx.orm.book.findByPk(ctx.params.bookId);
  if (!ctx.state.book) return ctx.throw(404, 'This book does not exists');
  ctx.state.review = await ctx.orm.review.findOne(
    {
      where:
          {
            id: ctx.params.reviewId,
            bookId: ctx.params.bookId,
          },
    },
  );
  if (!ctx.state.review) return ctx.throw(404, 'This review for this book does not exist');
  return next();
}

module.exports = {
  loadReview,
};
