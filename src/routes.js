require('dotenv').config();
const KoaRouter = require('koa-router');
const jwt = require('koa-jwt');

const users = require('./routes/users');
const books = require('./routes/books');
const auth = require('./routes/auth');
// const { apiSetCurrentUser } = require('../../middlewares/auth');

const router = new KoaRouter();

/* Unprotected routes */

router.use('/auth', auth.routes());

/* Protected routes */
// router.use(jwt({ secret: process.env.JWT_SECRET, key: 'authData' }));
// router.use(apiSetCurrentUser);

router.use('/users', users.routes());
router.use('/books', books.routes());

module.exports = router;