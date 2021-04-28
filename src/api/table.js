import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}

export function getRow(id) {
  return request({
    url: '/vue-admin-template/table/index',
    method: 'get',
    params: { id }
  })
}

export function deleteRow(id) {
  return request({
    url: '/vue-admin-template/table/delete',
    method: 'delete',
    params: { id }
  })
}
