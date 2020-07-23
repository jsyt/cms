const {
  Service
} = require('egg');

const BaseService = require('./base');

class UserResourceService extends BaseService {
  constructor (...args) {
    super(...args);
    this.entity = 'user_resource';
  }

  async getResource () {
    const {app, service, ctx} = this;
    let result = await app.mysql.select('user')
    return result;
  }

  async setResource (body) {
    const {app, service, ctx} = this;
    const {roleId, userIds} = body;
    const conn = await app.mysql.beginTransaction();
    let success = true;
    try {
      await conn.query(`DELETE FROM role_user WHERE role_id = ?`, [roleId]);
      for (let i = 0; i < userIds.length; i++) {
        await conn.insert('role_user', {'role_id': roleId, 'user_id': userIds[i]});
      }
      await conn.commit();
    } catch (error) {
      success = false;
      await conn.rollback();
    }
    return success;
  }
}

module.exports = UserResourceService;