const KoaRouter = require('koa-router');

// AUTHENTIFICATION CONST

const jwt = require('koa-jwt');
const { apiSetCurrentUser } = require('../middlewares/auth');

const router = new KoaRouter();

const { loadUser } = require('../middlewares/users');
const { loadBook } = require('../middlewares/books');

router.use(jwt({ secret: process.env.JWT_SECRET, key: 'authData' }));
router.use(apiSetCurrentUser);

router.delete('api.admin.books.delete', '/books/:bookId', loadBook, async (ctx) => {
  try {
    const { book } = ctx.state;
    if (!ctx.state.currentUser.admin) ctx.throw(403, 'YOU REQUIRE ADMIN PRIVILEGES');
    await book.destroy();
    ctx.status = 200;
  } catch (ValidationError) {
    ctx.throw(400, 'Bad Request');
  }
});

router.delete('api.admin.users.delete', '/users/:userId', loadUser, async (ctx) => {
  const { user } = ctx.state;
  if (!ctx.state.currentUser.admin) ctx.throw(403, 'YOU REQUIRE ADMIN PRIVILEGES');
  if (user.id === ctx.state.currentUser.id) ctx.throw(403, 'YOU CANNOT DELETE YOUR OWN ADMIN ACCOUNT');
  try {
    await user.destroy();
    ctx.status = 200;
  } catch (ValidationError) {
    ctx.throw(400, 'Bad Request');
  }
});

module.exports = router;
