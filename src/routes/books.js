require('dotenv').config();
const KoaRouter = require('koa-router');
const JSONAPISerializer = require('jsonapi-serializer').Serializer; // ????

// AUTHENTIFICATION CONST

const jwt = require('koa-jwt');
const { apiSetCurrentUser } = require('../middlewares/auth');

// JSONSERIALIZER

const BookSerializer = new JSONAPISerializer('books', {
  attributes: ['title', 'isbn', 'author', 'genre', 'userId', 'description'],
  keyForAttribute: 'camelCase',
});

const ReviewSerializer = new JSONAPISerializer('reviews', {
  attributes: ['content', 'score', 'userId', 'bookId'],
  keyForAttribute: 'camelCase',
});

const router = new KoaRouter();

const { loadBook } = require('../middlewares/books');

// GET ALL BOOKS

router.get('api.books.index', '/', async (ctx) => {
  const books = await ctx.orm.book.findAll();
  ctx.body = BookSerializer.serialize(books);
});

// GET SPECIFIC BOOK

router.get('api.books', '/:id', async (ctx) => {
  const book = await ctx.orm.book.findByPk(ctx.params.id);
  if (!book) {
    ctx.throw(404, "The book you are looking for doesn't exist");
  }
  ctx.body = BookSerializer.serialize(book);
});

// REVIEWS SECTION

// GET ALL REVIEWS FROM BOOK

router.get('api.books.review', '/:id/reviews', loadBook, async (ctx) => {
  const { book } = ctx.state;
  const reviews = await book.getReviews();
  const json = ReviewSerializer.serialize(reviews);
  if (json.data.length === 0) {
    ctx.throw(404, "The book you are looking for doesn't have any reviews");
  }
  ctx.body = json;
});

// GET A REVIEW FROM BOOK

router.get('api.books.review', '/:id/reviews/:id2', loadBook, async (ctx) => {
  // const book = await ctx.orm.book.findByPk(ctx.params.id1);
  const { book } = ctx.state;
  const review = await ctx.orm.review.findOne({ where: { id: ctx.params.id2, bookId: book.id } });
  if (!review) {
    ctx.throw(404, 'This review does not exists for this book');
  }
  const json = ReviewSerializer.serialize(review);
  ctx.body = json;
});

// ALL ROUTES FROM HERE ONWARDS NEED AN AUTHENTIFICATION TOKEN

router.use(jwt({ secret: process.env.JWT_SECRET, key: 'authData' }));
router.use(apiSetCurrentUser);

// BOOKS SECTION

// CREATE A BOOK

router.post('api.books.create', '/', async (ctx) => {
  const isBook = await ctx.orm.book.findOne({ where: { isbn: ctx.request.body.isbn } });
  if (isBook) ctx.throw(400, 'ISBN code alreay exist!');
  try {
    const book = ctx.orm.book.build(ctx.request.body);
    book.userId = ctx.state.currentUser.id;
    await book.save({ fields: ['title', 'isbn', 'author', 'genre', 'userId', 'description'] });
    ctx.status = 201;
    ctx.body = BookSerializer.serialize(book);
  } catch (ValidationError) {
    ctx.throw(400, 'Bad request');
  }
});

// EDIT BOOK (ONLY THE OWNER OF THE BOOK CAN MAKE THIS REQUEST)

router.patch('api.books.patch', '/:id', loadBook, async (ctx) => {
  const { book } = ctx.state;
  if (ctx.state.currentUser.id !== book.userId && !ctx.state.currentUser.admin) ctx.throw(401, 'AUTHENTIFICATION ERROR');

  const isIsbn = await ctx.orm.book.findOne({ where: { isbn: ctx.request.body.isbn } });
  if (isIsbn && book.id !== isIsbn.id) ctx.throw(400, 'ISBN code alreay exist!');

  try {
    const {
      title, isbn, author, genre, description,
    } = ctx.request.body;
    await book.update({
      title, isbn, author, genre, description,
    });
    ctx.status = 201;
    ctx.body = BookSerializer.serialize(book);
  } catch (ValidationError) {
    ctx.throw(400, 'Bad Request');
  }
});

// REVIEWS SECTION

// CREATE REVIEW FOR BOOK

router.post('api.books.review.create', '/:id/reviews', loadBook, async (ctx) => {
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

router.patch('api.books.review.edit', '/:id/reviews/:id2', loadBook, async (ctx) => {
  try {
    const { book } = ctx.state;
    const review = await ctx.orm.review.findOne({ where: { id: ctx.params.id2, bookId: book.id } });
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

module.exports = router;
