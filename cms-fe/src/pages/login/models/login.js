import {message} from 'antd'
import * as service from '../services/login';
import { decode } from 'jsonwebtoken';
import { routerRedux } from 'dva/router'
export default {
  namespaced: 'login',
  state: {
    isLogin: false,
    user: null
  },
  reducers: {
    save (state, action) {
      return {...state, ...action.payload};
    }
  },
  effects: {
    *signup ({type, payload}, {put, call}) {
      let result = yield call(service.signup, payload);
      debugger;
      console.log(result)
      if (result.code == 0) {
        yield put({type: 'save', payload: {isLogin: true}});
      } else {
        message.error(result.error)
      }
    },
    *signin ({type, payload}, {put, call}) {
      let result = yield call(service.signin, payload);
      debugger;
      console.log(result)
      if (result.code == 0) {
        let token = result.data;
        let user = decode(token);
        delete user.password;
        delete user.repassword;
        yield put({type: 'save', payload: {user}});
        localStorage.setItem('token', token);
        yield put(routerRedux.push('/admin'));
      } else {
        message.error(result.error)
      }
    },
    *loadUser ({type, payload}, {put, call}) {
      let token = localStorage.getItem('token');
      let user = decode(token);
      yield put({type: 'save', payload: {user}});
    }

  },
  // subscriptions: {
  //   setup ({history}) {
  //     history.listen(({pathname, query}) => {
  //       if (pathname.startWith('/admin/user')) {

  //       }
  //     })
  //   }
  // }
}
