const KoaRouter = require('koa-router');
const JSONAPISerializer = require('jsonapi-serializer').Serializer; // ????

// AUTHENTIFICATION CONST

const jwt = require('koa-jwt');
const { apiSetCurrentUser } = require('../middlewares/auth');

// JSONSERIALIZER

const UserSerializer = new JSONAPISerializer('users', {
  attributes: ['firstName', 'lastName', 'email', 'imageUrl'],
  keyForAttribute: 'camelCase',
});

const ReviewSerializer = new JSONAPISerializer('reviews', {
  attributes: ['content', 'score', 'userId', 'bookId'],
  keyForAttribute: 'camelCase',
});

const BookSerializer = new JSONAPISerializer('books', {
  attributes: ['title', 'isbn', 'author', 'genre', 'userId', 'description', 'imageUrl'],
  keyForAttribute: 'camelCase',
});

const router = new KoaRouter();

const { loadUser } = require('../middlewares/users');

// CREATE A NEW USER

router.post('api.users.create', '/', async (ctx) => {
  const { cloudinary } = ctx.state;
  try {
    const user = ctx.orm.user.build(ctx.request.body);
    user.admin = 0;
    if (ctx.request.files) {
      const { image } = ctx.request.files;
      if (image && image.size > 0) {
        const imageUrl = await cloudinary.uploader.upload(image.path);
        user.imageUrl = imageUrl.url;
      }
    }
    await user.save({ fields: ['firstName', 'lastName', 'email', 'password', 'admin', 'imageUrl'] });
    ctx.status = 201;
    ctx.body = UserSerializer.serialize(user);
  } catch (ValidationError) {
    ctx.throw(400, 'Bad request');
  }
});

router.use(jwt({ secret: process.env.JWT_SECRET, key: 'authData' }));
router.use(apiSetCurrentUser);

// GET SPECIFIC LOGGED USER

router.get('api.users', '/me', async (ctx) => {
  const user = ctx.state.currentUser;
  if (!user) {
    ctx.throw(404, "The author you are looking for doesn't exist");
  }
  ctx.body = UserSerializer.serialize(user);
});

router.get('api.users.books', '/my_books', async (ctx) => {
  const user = ctx.state.currentUser;
  const books = await user.getBooks();
  const json = BookSerializer.serialize(books);
  if (json.data.length === 0) {
    ctx.throw(204, "This user doesn't have any books!");
  }
  ctx.body = json;
});

// GET SPECIFIC USER

router.get('api.users', '/:userId', loadUser, async (ctx) => {
  const { user } = ctx.state;
  if (!user) {
    ctx.throw(404, "The author you are looking for doesn't exist");
  }
  ctx.body = UserSerializer.serialize(user);
});

// GET REVIEWS FROM USER (NEW) (TEST REQUIRE)

router.get('api.users.reviews', '/:userId/reviews', loadUser, async (ctx) => {
  const { user } = ctx.state;
  const reviews = await user.getReviews();
  const json = ReviewSerializer.serialize(reviews);
  if (json.data.length === 0) {
    ctx.throw(204, "This user doesn't have any reviews!");
  }
  ctx.body = json;
});

router.get('api.users.index', '/', async (ctx) => {
  const users = await ctx.orm.user.findAll({
    order: [
      ['id', 'ASC'],
    ],
  });
  ctx.body = UserSerializer.serialize(users);
  ctx.status = 200;
});

// GET LIKED REVIEWS FROM USER (TEST REQUIRE)

router.get('api.users.reviews.liked', '/:userId/liked_reviews', loadUser, async (ctx) => {
  const { user } = ctx.state;
  const reviews = await user.getLiked();
  const json = ReviewSerializer.serialize(reviews);
  if (json.data.length === 0) {
    ctx.throw(404, "The user you are looking for doesn't have any liked reviews");
  }
  ctx.body = json;
});

// EDIT AN EXISTENT USER

router.patch('api.users.patch', '/:userId', loadUser, async (ctx) => {
  const { user, cloudinary } = ctx.state;
  if (ctx.state.currentUser.id !== user.id) ctx.throw(401, 'NOT AUTHORIZED');
  try {
    if (ctx.request.files) {
      const { image } = ctx.request.files;
      if (image && image.size > 0) {
        const imageUrl = await cloudinary.uploader.upload(image.path);
        ctx.request.body.imageUrl = imageUrl.url;
      }
    }
    await user.update(ctx.request.body, { fields: ['firstName', 'lastName', 'email', 'password', 'imageUrl'] });
    ctx.status = 201;
    ctx.body = UserSerializer.serialize(user);
  } catch (Error) {
    ctx.throw(400, 'Bad Request');
  }
});

module.exports = router;
