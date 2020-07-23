const {
  Controller
} = require('egg');
const BaseController = require('./base');

class RoleResourceController extends BaseController {
  constructor (...args) {
    super(...args);
    this.entity = 'roleResource';
  }

  async getResource () {
    const {app, service, ctx} = this;
    let result = await service.role.getResource();
    this.success(result);
  }
  // 设置用户和角色的关系，把角色和用户进行关联
  async setResource (user) {
    const {app, service, ctx} = this;
    const body = ctx.request.body; // {reoleId:1, userIds:[1,3]}
    let result = await service.role.setResource(body);
    result ? this.success('setResource set success!') : this.error('setResource set failed!');
  }
}

module.exports = RoleResourceController;