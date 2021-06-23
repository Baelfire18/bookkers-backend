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

const router = new KoaRouter();

const { loadBook } = require('../middlewares/books');

// GET ALL BOOKS

router.get('api.books.index', '/', async (ctx) => {
  const books = await ctx.orm.book.findAll();
  ctx.body = BookSerializer.serialize(books);
});

// GET SPECIFIC BOOK

router.get('api.books', '/:bookId', loadBook, async (ctx) => {
  const { book } = ctx.state;
  if (!book) {
    ctx.throw(404, "The book you are looking for doesn't exist");
  }
  ctx.body = BookSerializer.serialize(book);
});

// ALL ROUTES FROM HERE ONWARDS NEED AN AUTHENTIFICATION TOKEN

router.use(jwt({ secret: process.env.JWT_SECRET, key: 'authData' }));
router.use(apiSetCurrentUser);

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

router.patch('api.books.patch', '/:bookId', loadBook, async (ctx) => {
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

module.exports = router;
