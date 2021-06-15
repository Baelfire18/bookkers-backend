require('dotenv').config();
const KoaRouter = require('koa-router');
const auth = require('./routes/auth');
const users = require('./routes/users');
const books = require('./routes/books');

const router = new KoaRouter();

/* Unprotected routes */

router.use('/auth', auth.routes());
router.use('/users', users.routes());
router.use('/books', books.routes());

module.exports = router;