
import request from '../../../utils/request';

export function signup (user) {
  return request(`/api/signup`, {
    method: 'POST',
    body: JSON.stringify(user)
  })
}

export function signin (user) {
  return request(`/api/signin`, {
    method: 'POST',
    body: JSON.stringify(user)
  })
}
