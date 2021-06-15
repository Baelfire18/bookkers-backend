const KoaRouter = require('koa-router');
const JSONAPISerializer = require('jsonapi-serializer').Serializer; //????

const UserSerializer = new JSONAPISerializer('users', {
  attributes: ['firstName', 'lastName', 'email'],
  keyForAttribute: 'camelCase',
});

const router = new KoaRouter();

router.get('api.users', '/:id', async (ctx) => {
  const user = await ctx.orm.user.findByPk(ctx.params.id);
  if (!user) {
    ctx.throw(404, "The author you are looking for doesn't exist");
  }
  ctx.body = UserSerializer.serialize(user);
});

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

module.exports = router;