const KoaRouter = require('koa-router');
const JSONAPISerializer = require('jsonapi-serializer').Serializer; //????

const BookSerializer = new JSONAPISerializer('books', {
  attributes: ['title', 'isbn', 'author', 'genre', 'userId', 'description'],
  keyForAttribute: 'camelCase',
});

const ReviewSerializer = new JSONAPISerializer('reviews', {
  attributes: ['content', 'score', 'userId', 'bookId'],
  keyForAttribute: 'camelCase',
});

const BookReviewSerializer = new JSONAPISerializer('reviews', {
  attributes: ['title', 'isbn', 'author', 'genre', 'userId', 'description'],
  reviews: {
    ref: function(book, review) {
      return review.id;
    },
    attributes: ['content', 'score', 'userId', 'bookId']
  },
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
});

router.get('api.books.review.one', '/:id_book/reviews/:id_review', async (ctx) => {
  const { id_book , id_review } = ctx.params;
  ctx.body = ctx.params;
})


router.get('api.books.review', '/:id/reviews', loadBook, async (ctx) => {
  const { book } = ctx.state;
  const reviews = await book.getReviews();
  const json = ReviewSerializer.serialize(reviews);
  if (json['data'].length === 0) {
    ctx.throw(404, "The book you are looking for doesn't have any reviews");
  }
  ctx.body = json;
});

router.post('api.books.review.create', '/:id/reviews', loadBook, async (ctx) => {
  try {
    const { book } = ctx.state;
    const review = ctx.orm.review.build(ctx.request.body);
    await review.save( { fields: ['content', 'score', 'userId', 'bookId'] } );
    ctx.status = 201;
    ctx.body = ReviewSerializer.serialize(review);
  }
  catch { 
    ctx.throw(404, "FAILED");
  }
})

<<<<<<< HEAD
<<<<<<< HEAD
=======
router.get('api.books', '/:id1/reviews/:id2', async (ctx) => {
=======
router.get('api.books.review', '/:id1/reviews/:id2', async (ctx) => {
>>>>>>> da309e5ed1523c292632b193580eceb10f30e642
  console.log(ctx.params);
  const book = await ctx.orm.book.findByPk(ctx.params.id1);
  const review = await ctx.orm.review.findOne({ where: { id: ctx.params.id2 } });
  console.log(review);
  if (!review) {
    ctx.throw(404, "This review does not exists for this book");
  }
  const json = ReviewSerializer.serialize(review);
  ctx.body = json;
});

<<<<<<< HEAD
>>>>>>> 9243bee370159cebfed291390a2efdbb6d1a42ac
=======
router.patch('api.booksreviewedit', '/:id1/reviews/:id2', loadBook, async (ctx) => {
  try {
    const { book } = ctx.state;
    const review = ctx.orm.review.build(ctx.request.body);
    const {
      content, score, userId, bookId
    } = review;
    await review.update({
      content, score, userId, bookId
    });
    ctx.status = 201;
    ctx.body = ReviewSerializer.serialize(review);
  }
  catch { 
    ctx.throw(404, "FAILED");
  }
})


>>>>>>> da309e5ed1523c292632b193580eceb10f30e642

module.exports = router;