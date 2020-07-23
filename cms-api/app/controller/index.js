const {
  Controller
} = require( 'egg' );
const svgCaptcha = require('svg-captcha');

class IndexController extends Controller {
  async captcha () {
    console.log('captcha')
    let {ctx} = this;
    let captcha = svgCaptcha.create({});
    ctx.session.captcha = captcha.text;
    ctx.set('Content-Type', 'image/svg+xml');
    ctx.body = captcha.data;
  }


  async checkCaptcha () {
    console.log('captcha')
    let {ctx} = this;
    let {captcha} = ctx.request.body;
    if (ctx.session.captcha == captcha) {
      ctx.body = {code: 0, data: '验证码验证成功！'}
    } else {
      ctx.body = {code: 1, data: '验证码验证失败！'}
    }
  }
}

module.exports = IndexController;