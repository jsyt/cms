const {
  Controller
} = require( 'egg' );

class BaseController extends Controller {

  success (data) {
    this.ctx.body = {code: 0, data}
  }
  error (error) {
    this.ctx.body = {code: 1, error}
  }
  async index() {
    let {
      ctx,
      service
    } = this;
    let {pageNum, pageSize, ...where} = ctx.query;
    let currentPageNum = isNaN(pageNum) ? 1 : parseInt(pageNum)
    let currentPageSize = isNaN(pageSize) ? 3 : parseInt(pageSize)
    let result = await service[this.entity].select(pageNum, pageSize, where);
    this.success(result)

  }

  async create() {
    let {
      ctx,
      service
    } = this;
    let user = ctx.request.body;
    let result = await service[this.entity].create( user )
    result.affectedRows > 0 ? this.success('create success') : this.error('create failed!')
  }

  async update() {
    let {
      ctx,
      service
    } = this;
    let user = ctx.request.body;
    let id = ctx.params.id;
    user.id = id;
    let result = await service[this.entity].update( user );
    result.affectedRows > 0  ? this.success('update success') : this.error('update failed!')
  }

  async destroy() {
    let {
      ctx,
      service
    } = this;
    let id = ctx.params.id;
    let ids = ctx.body.ids;
    if (!ids) {
      ids =[id];
    }
    let result = await service[this.entity].destroy( ids );
    result.affectedRows > 0  ? this.success('destroy success') : this.error('destroy failed!')
  }
}

module.exports = BaseController;