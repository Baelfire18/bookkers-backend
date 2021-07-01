require('dotenv').config();
const KoaRouter = require('koa-router');
const JSONAPISerializer = require('jsonapi-serializer').Serializer; // ????

// AUTHENTIFICATION CONST

const jwt = require('koa-jwt');
const { apiSetCurrentUser } = require('../middlewares/auth');

// JSONSERIALIZER

const ReviewSerializer = new JSONAPISerializer('reviews', {
  attributes: ['content', 'score', 'userId', 'bookId'],
  keyForAttribute: 'camelCase',
});

const ReportSerializer = new JSONAPISerializer('reports', {
  attributes: ['content', 'userId', 'reviewId'],
  keyForAttribute: 'camelCase',
});

const router = new KoaRouter();

const { loadBook } = require('../middlewares/books');
const { loadReview } = require('../middlewares/reviews');

// GET ALL REVIEWS FROM BOOK

router.get('api.books.review', '/', loadBook, async (ctx) => {
  const { book } = ctx.state;
  const reviews = await book.getReviews();
  const json = ReviewSerializer.serialize(reviews);
  if (json.data.length === 0) {
    ctx.throw(404, "The book you are looking for doesn't have any reviews");
  }
  ctx.body = json;
});

// GET A REVIEW FROM BOOK

router.get('api.books.review', '/:reviewId', loadReview, async (ctx) => {
  // const book = await ctx.orm.book.findByPk(ctx.params.id1);
  const { review } = ctx.state;
  if (!review) {
    ctx.throw(404, 'This review does not exists for this book');
  }
  const json = ReviewSerializer.serialize(review);
  ctx.body = json;
});

// ALL ROUTES FROM HERE ONWARDS NEED AN AUTHENTIFICATION TOKEN

router.use(jwt({ secret: process.env.JWT_SECRET, key: 'authData' }));
router.use(apiSetCurrentUser);

// CREATE REVIEW FOR BOOK

router.post('api.books.review.create', '/', loadBook, async (ctx) => {
  try {
    const { book } = ctx.state;
    const review = ctx.orm.review.build(ctx.request.body);
    review.userId = ctx.state.currentUser.id;
    review.bookId = book.id;
    await review.save({ fields: ['content', 'score', 'userId', 'bookId'] });
    ctx.status = 201;
    ctx.body = ReviewSerializer.serialize(review);
  } catch (ValidationError) {
    ctx.throw(400, 'Bad Request');
  }
});

// PATCH REVIEW FROM BOOK

router.patch('api.books.review.edit', '/:reviewId', loadReview, async (ctx) => {
  try {
    const { review } = ctx.state;
    if (review.userId !== ctx.state.currentUser.id) ctx.throw(403, 'METHOD NOT ALLOWED');
    const {
      content, score,
    } = ctx.request.body;
    await review.update({
      content, score,
    });
    ctx.status = 201;
    ctx.body = ReviewSerializer.serialize(review);
  } catch (ValidationError) {
    ctx.throw(400, 'Bad Request');
  }
});

// DELETE REVIEW OF A BOOK

router.delete('api.books.review.delete', '/:reviewId', loadReview, async (ctx) => {
  try {
    const { review } = ctx.state;
    if (review.userId !== ctx.state.currentUser.id && !ctx.state.currentUser.admin) ctx.throw(403, 'METHOD NOT ALLOWED');
    await review.destroy();
    ctx.status = 200;
  } catch (ValidationError) {
    ctx.throw(400, 'Bad Request');
  }
});

// LIKE A REVIEW OF A BOOK

router.post('api.books.review.like.create', '/:reviewId/likes', loadReview, async (ctx) => {
  try {
    const { review } = ctx.state;
    await review.addUser(ctx.state.currentUser);
    ctx.status = 201;
  } catch (ValidationError) {
    ctx.throw(400, 'Bad Request');
  }
});

// DELETE LIKE FROM REVIEW OF A BOOK

router.delete('api.books.review.like.delete', '/:reviewId/likes', loadReview, async (ctx) => {
  try {
    const { review } = ctx.state;
    await review.removeUser(ctx.state.currentUser);
    ctx.status = 200;
  } catch (ValidationError) {
    ctx.throw(400, 'Bad Request');
  }
});

// POST REPORT

router.post('api.books.review.report.create', '/:reviewId/reports', loadReview, loadBook, async (ctx) => {
  try {
    const { review } = ctx.state;
    const report = ctx.orm.report.build(ctx.request.body);
    report.userId = ctx.state.currentUser.id;
    report.reviewId = review.id;
    await report.save({ fields: ['content', 'userId', 'reviewId'] });
    ctx.status = 201;
    ctx.body = ReportSerializer.serialize(report);
  } catch (ValidationError) {
    ctx.throw(400, 'Bad Request');
  }
});

// GET REPORTS

router.get('api.books.review.reports', '/:reviewId/reports', loadReview, async (ctx) => {
  const { review } = ctx.state;
  if (!ctx.state.currentUser.admin) ctx.throw(403, 'YOU REQUIERE ADMIN PRIVILEGES');
  const reports = await review.getReports();
  const json = ReportSerializer.serialize(reports);
  if (json.data.length === 0) {
    ctx.throw(404, "The review you are looking for doesn't have any reports");
  }
  ctx.body = json;
});

module.exports = router;
