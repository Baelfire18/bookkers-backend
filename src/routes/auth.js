require('dotenv').config();
const KoaRouter = require('koa-router');
const jwtgenerator = require('jsonwebtoken');

const router = new KoaRouter();

function generateToken(user) {
  return new Promise((resolve, reject) => {
    jwtgenerator.sign(
      { sub: user.id },
      process.env.JWT_SECRET,
      (err, tokenResult) => (err ? reject(err) : resolve(tokenResult)),
    );
  });
}

router.post('api.auth.login', '/', async (ctx) => {
  const { email, password } = ctx.request.body;
  const user = await ctx.orm.user.findOne({ where: { email } });
  if (!user) ctx.throw(404, `No user found with ${email}`);
  const authenticated = await user.checkPassword(password);
  if (!authenticated) ctx.throw(401, 'Invalid password');
  try {
    const token = await generateToken(user);
    // follow OAuth RFC6749 response standart
    // https://datatracker.ietf.org/doc/html/rfc6749#section-5.1
    ctx.body = {
      access_token: token,
      token_type: 'Bearer',
    };
  } catch (error) {
    ctx.throw(500);
  }
});

module.exports = router;