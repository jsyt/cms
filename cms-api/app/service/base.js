const {
  Service
} = require( 'egg' );

class BaseService extends Service {
  async select(pageNum, pageSize, where) {
    let list = await this.app.mysql.select(this.entity, {
      where,
      orders: [['id', 'DESC']],
      offset: (pageNum - 1) * pageSize,
      limit: pageSize
    });
    let total = await this.app.mysql.count(this.entity, where);
    return {list, total};
  }

  async create( entity ) {
    return await this.app.mysql.insert(this.entity, entity);
  }

  async update( entity ) {
    return await this.app.mysql.update(this.entity, entity);
  }
  async destroy( id ) {
    return await this.app.mysql.delete( this.entity, {
      id
    });
  }
}

module.exports = BaseService;