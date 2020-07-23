import { message } from "antd";
import * as service from "../services/user";
import {PAGE_SIZE} from "../constants";
import qs from 'qs';
import {routerRedux} from 'dva/router';

export default {
  namespaced: 'user',
  state: {
    list: [],
    pageNum: 1,
    total: 0,
    isCreate: true,
    editVisible: false,
    record: {},
    selectedRowKeys: [],
    where: {}
  },
  reducers: {
    save (state, {payload}) {
      let result = {...state, ...payload};
      // debugger;
      return result;
    }
  },
  effects: {
    *fetch ({payload}, {put, call, select}) {
      let pageNum = payload.pageNum;
      let where = payload.where;
      if (!pageNum) {
        pageNum = yield select(state => state.user.pageNum);
      }
      pageNum = Number(pageNum);
      if (!where) {
        where = yield select(state => state.user.where);
      }
      let result = yield call(service.fetch, pageNum, where);
      if (result.code == 0) {
        yield put({type: 'save', payload: {...result.data, pageNum, where}});
        // debugger;
      } else {
        message.error(result.error);
      }
    },
    *create ({payload}, {put, call}) {
      let result = yield call(service.create, payload);
      if (result.code == 0) {
        yield put({type: 'fetch',  payload: {pageNum: 1}});
        yield put({type: 'save', payload: {editVisible: false}});
      } else {
        message.error(result.error);
      }
    },
    *update ({payload}, {put, call, select}) {
      let result = yield call(service.update, payload);
      if (result.code == 0) {
        let pageNum = yield select(state => state.user.pageNum);
        yield put({type: 'fetch', payload: {pageNum}});
        yield put({type: 'save', payload: {editVisible: false}});
      } else {
        message.error(result.error);
      }
    },
    *delete ({payload}, {put, call, select}) {
      let result = yield call(service.del, payload);
      if (result.code == 0) {
        let pageNum = yield select(state => state.user.pageNum);
        yield put({type: 'fetch', payload: {pageNum}});
        let list = yield select(state => state.user.list);
        if (!list || list.length <= PAGE_SIZE * (Number(pageNum) - 1) + 1) {
          yield put({type: 'fetch', payload: {pageNum: 1}});
        }
      } else {
        message.error(result.error);
      }
    },
    *deleteAll ({payload}, {put, call, select}) {
      let result = yield call(service.delAll, payload);
      if (result.code == 0) {
        yield put({type: 'fetch', payload: {pageNum: 1}});
      } else {
        message.error(result.error);
      }
    },
    *search ({payload: {where}}, {put, call, select}) {
      // debugger;
      where = qs.stringify(where);
      yield put(routerRedux.push(`/admin/user?pageNum=1&${where}`));
    }

  },
  subscriptions: {
    setup ({history, dispatch}) {
      history.listen(({pathname, query}) => {
        if (pathname == '/admin/user') {
          let {pageNum, ...where} = query;
          dispatch({type: 'fetch', payload: {pageNum, where}})
        }
      })
    }
  }
}
