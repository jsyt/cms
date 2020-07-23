import querystring from 'querystring'
import request from '@/utils/request';

export function fetch (pageNum, where) {
  let whereString = querystring.stringify(where);
  return request(`/api/user?pageNum=${pageNum}&${whereString}`)
}

export function create (payload) {
  return request(`/api/user`, {
    method: "POST",
    body: JSON.stringify(payload)
  })
}

export function update (payload) {
  return request(`/api/user/${payload.id}`, {
    method: "PUT",
    body: JSON.stringify(payload)
  })
}

export function del(id) {
  return request(`/api/user/${id}`, {
    method: "DELETE"
  })
}

export function delAll(ids) {
  return request(`/api/user/${id[0]}`, {
    method: "DELETE",
    body: JSON.stringify(ids)
  })
}
