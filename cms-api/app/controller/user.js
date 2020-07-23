const {
  Controller
} = require('egg');
const BaseController = require('./base');

const { sign } = require('jsonwebtoken');

class UserController extends BaseController {
  constructor (...args) {
    super(...args);
    this.entity = 'user';
  }

  async signup () {

    let {app, ctx} = this;
    let body = ctx.request.body;
    let {repassword, address, agreement, prefix, captcha, ...user} = body;
    console.log(JSON.stringify(body));
    if (user.password != repassword) {
      return this.error('密码与确认密码不一致');

    }
    if (!agreement) {
      return this.error('请同意协议！')
    }
    if (!captcha || !ctx.session.captcha || captcha != ctx.session.captcha) {
      return this.error('验证码不正确');
    }
    // address = address.join('-');
    // user.address = address;
    user.phone = prefix + user.phone;
    let result = await app.mysql.insert('user', user);
    console.log('result:  ' + JSON.stringify(result))
    if (result.affectedRows > 0) {
      this.success('注册成功');
    } else {
      this.error('注册失败');
    }
  }
  async signin () {
    let {app, ctx} = this;
    let body = ctx.request.body;
    let {repassword, address, agreement, prefix, captcha, ...user} = body;
    if (!captcha || !ctx.session.captcha || captcha != ctx.session.captcha) {
      return this.error('验证码不正确');
    }
    let result = await app.mysql.get('user', user);
    if (result) {
      let data = JSON.parse(JSON.stringify(result));
      delete data.password;
      let resources = await app.mysql.query(`SELECT resource.* FROM role_user INNER JOIN role_resource ON role_user.role_id = role_resource.role_id INNER JOIN resource ON role_resource.resource_id = resource.id
      WHERE role_user.user_id = ?`, [data.id]);
      console.log('data.id: ', data.id)
      console.log('resources: ', resources)
      resources = JSON.parse(JSON.stringify(resources));
      console.log('resources: ', resources)
      let menus = [];
      let map = {};
      resources.forEach(resource => {
        resource.children = [];
        map[resource.id] = resource;
        if (resource.parent_id == 0) {
          menus.push(resource);
        } else {
          map[resource.parent_id] && map[resource.parent_id].children.push(resource)
        }
      })
      console.log('resources: ', resources)
      data.menus = menus;
      console.log(data);
      let token = sign(data, this.config.JWT_SECRET);
      this.success(token);
    } else {
      this.error('登录失败');
    }
  }
}

module.exports = UserController;