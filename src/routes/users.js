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

const router = new KoaRouter();

const { loadUser } = require('../middlewares/users');

// CREATE A NEW USER

router.post('api.users.create', '/', async (ctx) => {
  try {
    const user = ctx.orm.user.build(ctx.request.body);
    user.admin = 0;
    await user.save({ fields: ['firstName', 'lastName', 'email', 'password', 'admin'] });
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

// GET SPECIFIC USER

router.get('api.users', '/:id', async (ctx) => {
  const user = await ctx.orm.user.findByPk(ctx.params.id);
  if (!user) {
    ctx.throw(404, "The author you are looking for doesn't exist");
  }
  ctx.body = UserSerializer.serialize(user);
});

// EDIT AN EXISTENT USER

router.patch('api.users.patch', '/:id', loadUser, async (ctx) => {
  const { user } = ctx.state;
  const { cloudinary } = ctx.state;
  if (ctx.state.currentUser.id !== user.id) ctx.throw(401, 'NOT AUTHORIZED');
  try {
    const { image } = ctx.request.files;
    if (image.size > 0) {
      const imageUrl = await cloudinary.uploader.upload(image.path);
      ctx.request.body.imageUrl = imageUrl.url;
    }
    console.log(ctx.request.body.imageUrl);
    await user.update(ctx.request.body, { fields: ['firstName', 'lastName', 'email', 'password', 'imageUrl'] });
    ctx.status = 201;
    ctx.body = UserSerializer.serialize(user);
  } catch (Error) {
    console.log(Error);
    ctx.throw(400, 'Bad Request');
  }
});

module.exports = router;
