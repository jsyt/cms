
import {fetch} from 'dva';

const BASE_URL = 'http://127.0.0.1:7001';

export default function (url, options = {}) {
  options.headers = options.headers || {};
  let token = localStorage.getItem('token');
  if (token) {
    options.headers.authorization = token;
  }
  options.headers['Content-Type'] = 'application/json';
  options.headers['Accept'] = 'application/json';
  options.method = options.method || "GET";
  options.credentials = 'include';
  url = BASE_URL + url;
  return fetch(url, options).then(res => res.json());
}
