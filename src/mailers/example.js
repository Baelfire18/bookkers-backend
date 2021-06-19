module.exports = function sendExampleEmail(ctx, data, user, date) {
  // you can get all the additional data needed by using the provided one plus ctx
  return ctx.sendMail('login-email', { to: user.email, subject: 'New Login || Bookers' }, { data, user, date });
};
