
let {verify} = require('jsonwebtoken');

function verifyToken (token, secret) {
  return new Promise((resolve, reject) => {
    verify(token, secret, (err, user) => {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    })
  })
}

module.exports = function (options, app) {
  return async (ctx, next) => {
    let token = ctx.get('authorization');
    if (token) {
      try {
        let user = await verifyToken(token, this.config.JWT_SECRET);
        ctx.session.user = user;
        await next();
      } catch (error) {
        ctx.status = 403;
        ctx.body = {code: 1, error: 'token 不合法'}
      }
    } else {
      ctx.status = 403;
      ctx.body = {code: 1, error: 'token 不存在'}
    }

  }
}