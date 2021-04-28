const Mock = require('mockjs')

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    title: '@sentence(10, 20)',
    'status|1': ['published', 'draft', 'deleted'],
    author: 'name',
    display_time: '@datetime',
    pageviews: '@integer(300, 5000)'
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/table/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        },
        success: 'list success'
      }
    }
  },
  {
    url: '/vue-admin-template/table/index',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: {},
        message: 'index success'
      }
    }
  },
  {
    url: '/vue-admin-template/table/delete',
    type: 'delete',
    response: config => {
      return {
        code: 20000,
        data: {},
        message: 'delete success'
      }
    }
  }
]
