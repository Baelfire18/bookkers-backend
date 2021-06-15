const KoaRouter = require('koa-router');
const JSONAPISerializer = require('jsonapi-serializer').Serializer; //????

// AUTHENTIFICATION CONST

const jwt = require('koa-jwt');
const { apiSetCurrentUser } = require('../middlewares/auth');

// JSONSERIALIZER

const UserSerializer = new JSONAPISerializer('users', {
  attributes: ['firstName', 'lastName', 'email'],
  keyForAttribute: 'camelCase',
});

const router = new KoaRouter();

const { loadUser } = require('../middlewares/users');

router.use(jwt({ secret: process.env.JWT_SECRET, key: 'authData' }));
router.use(apiSetCurrentUser);

// GET SPECIFIC LOGGED USER

router.get('api.users', '/me', async (ctx) => {
  const user = ctx.state.currentUser;
  console.log(user);
  if (!user) {
    ctx.throw(404, "The author you are looking for doesn't exist");
  }
  ctx.body = UserSerializer.serialize(user);
});

// GET SPECIFIC USER

router.get('api.users', '/:id', async (ctx) => {
  const user = await ctx.orm.user.findByPk(ctx.params.id);
  if (!user) {
    ctx.throw(404, "The author you are looking for doesn't exist");
  }
  ctx.body = UserSerializer.serialize(user);
});

// CREATE A NEW USER

router.post('api.users.create', '/', async (ctx) => {
  try {
    const user = ctx.orm.user.build(ctx.request.body);
    await user.save({ fields: ['firstName', 'lastName', 'email', 'password'] });
    ctx.status = 201;
    ctx.body = UserSerializer.serialize(user);
  } catch (ValidationError) {
    ctx.throw(400, 'Bad request');
  }
});

// EDIT AN EXISTENT USER

router.patch('api.users.patch', '/:id', loadUser, async (ctx) => {
  const { user } = ctx.state;
  try {
    const {
      firstName, lastName, email, password
    } = ctx.request.body;
    await user.update({
      firstName, lastName, email, password
    });
    ctx.status = 201;
    ctx.body = UserSerializer.serialize(user);
  }
  catch (ValidationError) {
    ctx.throw(400, 'Bad Request');
  }
})

module.exports = router;