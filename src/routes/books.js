const KoaRouter = require('koa-router');
const JSONAPISerializer = require('jsonapi-serializer').Serializer; //????

const BookSerializer = new JSONAPISerializer('books', {
  attributes: ['title', 'isbn', 'author', 'genre', 'userId', 'description'],
  keyForAttribute: 'camelCase',
});

const router = new KoaRouter();

const { loadBook } = require('../middlewares/books');

router.get('api.books', '/', async (ctx) => {
    const books = await ctx.orm.book.findAll();
    ctx.body = BookSerializer.serialize(books);
});



router.post('api.books.create', '/', async (ctx) => {
    try {
      const book = ctx.orm.book.build(ctx.request.body);
      await book.save({ fields: ['title', 'isbn', 'author', 'genre', 'userId', 'description'] });
      ctx.status = 201;
      ctx.body = BookSerializer.serialize(book);
    } catch (ValidationError) {
      ctx.throw(400, 'Bad request');
    }
});

router.get('api.books', '/:id', async (ctx) => {
  const book = await ctx.orm.book.findByPk(ctx.params.id);
  if (!book) {
    ctx.throw(404, "The book you are looking for doesn't exist");
  }
  ctx.body = BookSerializer.serialize(book);
});


router.patch('api.books.patch', '/:id', loadBook, async (ctx) => {
  const { book } = ctx.state;
  try {
    const {
      title, isbn, author, genre, userId, description
    } = ctx.request.body;
    await book.update({
      title, isbn, author, genre, userId, description
    });
    ctx.status = 201;
    ctx.body = BookSerializer.serialize(book);
  }
  catch (ValidationError) {
    ctx.throw(400, 'Bad Request');
  }
})

router.get('api.books.review', '/:id/reviews', loadBook, async (ctx) =>{
  const { book } = ctx.state;
  const reviews = await book.getReviews();
  
})

module.exports = router;