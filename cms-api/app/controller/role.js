const {
  Controller
} = require('egg');
const BaseController = require('./base');

class RoleController extends BaseController {
  constructor (...args) {
    super(...args);
    this.entity = 'role';
  }

  async getUser () {
    const {app, service, ctx} = this;
    let result = await service.role.getUser();
    this.success(result);
  }
  // 设置用户和角色的关系，把角色和用户进行关联
  async setUser (user) {
    const {app, service, ctx} = this;
    const body = ctx.request.body; // {reoleId:1, userIds:[1,3]}
    let result = await service.role.setUser(body);
    result ? this.success('为用户分配角色成功') : this.error('为用户分配角色失败');
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
    result ? this.success('为角色分配资源成功') : this.error('为角色分配资源失败');
  }
}

module.exports = RoleController;