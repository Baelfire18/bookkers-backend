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
    if (review.userId !== ctx.state.currentUser.id) ctx.throw(401, 'AUTHENTIFICATION ERROR');
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

router.delete('api.books.review.delete', '/:reviewId', loadReview, async (ctx) => {
  try {
    const { review } = ctx.state;
    if (review.userId !== ctx.state.currentUser.id && !ctx.state.currentUser.admin) ctx.throw(401, 'AUTHENTIFICATION ERROR');
    await review.destroy();
    ctx.status = 200;
  } catch (ValidationError) {
    ctx.throw(400, 'Bad Request');
  }
});


// ERROR SI YA LE DISTE LIKE FALTA
router.post('api.books.review.like.create', '/:reviewId/likes', loadReview, async (ctx) => {
  try {
    const { review } = ctx.state;
    // const like = await ctx.state.currentUser.getLiked();
    // console.log(like);
    await review.addUser(ctx.state.currentUser);
    ctx.status = 200;
  } catch (ValidationError) {
    ctx.throw(400, 'Bad Request');
  }
});

router.delete('api.books.review.like.delete', '/:reviewId/likes', loadReview, async (ctx) => {
  try {
    const { review } = ctx.state;
    await review.removeUser(ctx.state.currentUser);
    ctx.status = 200;
  } catch (ValidationError) {
    ctx.throw(400, 'Bad Request');
  }
});


module.exports = router;
