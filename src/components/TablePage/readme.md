## TablePage 

表格页面通用组件

简易用法
```html
<template>
  <table-page :search-config="sesrchConfig" :columns="columns" :list-method="getList" @handleButton="handleButton"/>
</template>

<script>
import TablePage from '@/components/TablePage'
import { getList} from '@/api/table'
export default {
  components: {
    TablePage
  },
  data() {
    return {
      sesrchConfig: {
        columns: [
          { prop: 'name', label: '名称' },
          { prop: 'sex', label: '性别', type: 'select', options: []},
          { prop: 'birth', label: '生日', type: 'date' }
        ],
      },
      columns: [
        { type: 'index', label: '序号', attrs: { width: 50 }},
        { prop: 'title', label: '标题' },
        { prop: 'start_date', label: '开始时间' },
        { prop: 'end_date', label: '结束时间' },
        {
          type: 'button',
          prop: 'button',
          label: '操作',
          buttons: [
            { handle: 'edit', label: 'edit', type: 'primary'},
            { handle: 'delete', label: 'delete' }
          ]
        }
      ]
    }
  },
  created() {
    this.sesrchConfig.columns.find(v => v.prop === 'sex').options = [{ value: 1, label: '男' }, { value: 0, label: '女' }]
  },
  methods: {
    getList,
    handleButton(handle, row) {
      console.log('click button', handle, row)
    }
  }
}
</script>
```

完整用法
```html
<template>
  <div class="demo-block">
    <TablePage :search-config="sesrchConfig" :columns="columns" :list-method="getList" :delete-method="deleteRow" @handleButton="handleButton">
      <template v-slot:status="{ row }">
        <span :class="{ red: row.status === 'deleted' }">{{ row.status }}</span>
      </template>
    </TablePage>
  </div>
</template>

<script>
import TablePage from '@/components/TablePage'
import { getList, getRow, deleteRow } from '@/api/table'
export default {
  components: {
    TablePage
  },
  data() {
    return {
      TIME: [],
      sesrchConfig: {
        columns: [
          { prop: 'name', label: '名称', default: 'jack' },
          { prop: 'address', label: '地区', type: 'city', roles: ['TABLE_CITY'] },
          { prop: 'no-roles', label: '地区', type: 'city', roles: ['NO_ROLES'] },
          { prop: 'sex', label: '性别', type: 'select', options: [], attrs: { clearable: true }},
          { prop: 'birth', label: '生日', type: 'date' },
          { prop: 'year', label: '年份', type: 'year' },
          { prop: 'month', label: '月份', type: 'month' },
          { prop: 'range', label: '日期区间', type: 'daterange', span: 16, startKey: 'startDate', endKey: 'endDate', attrs: { startPlaceholder: '开始时间' }},
          { prop: 'timerange', label: '时间区间', type: 'datetimerange', span: 16, startKey: 'startDateTime', endKey: 'endDateTime', attrs: { startPlaceholder: '开始时间' }},
          { prop: 'datetime', label: '时间', type: 'datetime' },
          { prop: 'cascader', label: '级联', type: 'cascader', options: [], attrs: { clearable: true }}
        ],
        showIndex: 2
      },
      columns: [
        { type: 'index', label: '序号', attrs: { width: 50 }},
        { type: 'link', prop: 'title', label: '标题' },
        { prop: '_empty', label: '无内容' },
        { prop: 'start_date', label: '开始', roles: ['NO_ROLES'] },
        { prop: 'end_date', label: '结束', roles: ['TABLE_EDIT'] },
        { type: 'slot', prop: 'status', label: '状态' },
        {
          type: 'button',
          prop: 'button',
          label: '操作',
          buttons: [
            { handle: 'role', label: 'role', roles: ['NO_ROLES'] },
            { handle: 'detail', label: 'detail', roles: ['TABLE_DETAIL'] },
            { handle: 'edit', label: 'edit', type: 'primary', roles: ['TABLE_EDIT'] },
            { handle: 'delete', label: 'delete', roles: ['TABLE_DELETE'] }
          ]
        }
      ]
    }
  },
  created() {
    this.sesrchConfig.columns.find(v => v.prop === 'sex').options = [{ value: 1, label: '男' }, { value: 0, label: '女' }]
    this.sesrchConfig.columns.find(v => v.prop === 'cascader').options = [{
      value: 'zhinan',
      label: '指南',
      children: [{
        value: 'shejiyuanze',
        label: '设计原则',
        children: [{
          value: 'yizhi',
          label: '一致'
        }, {
          value: 'fankui',
          label: '反馈'
        }]
      }, {
        value: 'daohang',
        label: '导航',
        children: [{
          value: 'cexiangdaohang',
          label: '侧向导航'
        }, {
          value: 'dingbudaohang',
          label: '顶部导航'
        }]
      }]
    }, {
      value: 'ziyuan',
      label: '资源',
      children: [{
        value: 'axure',
        label: 'Axure Components'
      }, {
        value: 'sketch',
        label: 'Sketch Templates'
      }, {
        value: 'jiaohu',
        label: '组件交互文档'
      }]
    }]
  },
  methods: {
    handleButton(handle, row) {
      console.log('click button', handle, row)
      if (handle === 'edit') {
        getRow(row.id)
      }
    },
    getList,
    deleteRow
  }
}
</script>

<style lang="scss" scoped>
.demo-block {
  position: relative;
  padding: 30px;
  background: #fff;
}
.red {
  color: red;
}
</style>
```
权限控制vue-element-admin使用的是角色权限控制，我司管理系统角色可以自建，使用的是该角色下的个人权限，所以登录完要在store存入全部的权限代码，根据对应的权限代码来控制dom显示隐藏

### TableSearch
搜索栏组件，可单独使用
#### Props
| 参数       | 说明     | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| columns  | 数据配置项，详见columns配置  | array   |  -  |  - |
| show-reset  | 是否显示重置按钮  | boolean   |  -  |  true |
| show-index  | 收起状态下展示几个搜索项，默认2个，0表示不需要展开收起  | number   |  -  |  2 |
| label-width  | el-form label-width | string   |  -  |  5em |
| span  | el-col span每项占位的格数 | number   |  -  |  8 |

##### columns
type类型可以根据自身业务添加常用的业务组件，如地区选择组件
| 参数       | 说明     | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| type  | 搜索项类型，默认为input  | string | select/datetime/date/year/month/<br>daterange/datetimerange/cascader  |  - |
| prop  | 唯一标识，请求参数key  | string   |  -  |  - |
| label  | el-form-item label  | string   |  -  |  - |
| default  | 初始默认值，没有则不传 | string   |  -  |  - |
| labelWidth  | el-form-item label-width | string   |  -  |  5em |
| span  | el-col span该项占几格，默认8 | number   |  -  |  8 |
| options  | select/cascader的数据源 | array   |  -  |  - |
| startKey  | daterange/datetimerange的返回startKey，el-date-picker range状态下返回的是数组，接口一般是传入startDate和endDate 可以使用startKey和endKey过滤 | string   |  -  |  startDate |
| endKey  | daterange/datetimerange的返回endKey | string   |  -  |  endDate |
| attrs  | el组件的其他prop，如{placeholder: '请输入'} | object   |  -  |  - |
| roles  | 权限控制，传值与v-permission一致 | array  |  -  |  - |

#### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| search  | 点击查询按钮触发 | 返回查询的参数 function(params: object) |
| reset  | 点击重置按钮触发 | - |

___

#### TablePage
表格页，把table-search封装进页面，table-search的配置通过search-config传递，el-table的其他参数通过 `v-bind="$attrs"`和`v-on="$listeners"`封装
#### Props
| 参数       | 说明     | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| search-config  | table-search的配置项  | object   |  -  |  - |
| base-params | 默认带有的请求参数（比如左侧是一个地区树，选中的地区id可以在这里传值） | object   |  -  |  - |
| columns  | 数据配置项，详见columns配置  | array   |  -  |  - |
| pagination  | 是否需要页码  | boolean   |  -  |  true |
| page-attrs  | el-pagination的 prop  | object   |  -  |  - |
| list-method  | 列表api请求方法，返回promise或者直接返回数据 | function   |  -  |  - |
| list-key  | 返回数据的字段key，多层级直接用.表示 | string   |  -  |  data.list |
| total-key  | 返回页码的字段key，多层级直接用.表示 | string   |  -  |  data.total |
| delete-method  | 删除事件的api方法，返回promise | function   |  -  |  - |
| delete-key  | 删除获取row字段key | string  |  -  |  id |

##### columns
type类型可以根据自身的业务或者设计稿添加常用的样式展示 如链接
| 参数       | 说明     | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| type  | 每一列的类型，默认展示文本 | string | index/selection/slot/button  |  - |
| prop  | el-table-column prop 唯一标识| string | -  |  - |
| label  | el-table-column label| string | -  |  - |
| buttons  | type=button下按钮配置项，详见buttons | array | -  |  - |
| attrs  | el-table-column其他prop | object   |  -  |  - |
| roles  | 权限控制，传值与v-permission一致 | array  |  -  |  - |

```html
<!-- type=slot 在对应的el-table-column插入slot，与el-table用法一样，需要传对应的slot name -->
<template>
  <!-- el-table的写法 -->
  <el-table>
    <el-table-column label="状态">
      <template slot-scope="scope">
        <span :class="{ red: scope.row.status === 'deleted' }">{{ row.status }}</span>
      </template>
    </el-table-column>
  </el-table>
  <!-- table——page的写法 -->
  <table-page :columns="columns">
    <template v-slot:status="scope">
      <span :class="{ red: scope.row.status === 'deleted' }">{{ row.status }}</span>
    </template>
  </table-page>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        { type: 'slot', prop: 'status', label: '状态' },
      ]
    }
  }
}
</script>
```

##### buttons
type=button配置项
| 参数       | 说明     | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| handle  | 唯一标识，handleButton会回传该标识，如果handle=delete且组件有传delte-method则会直接调用delete-method | string | -  |  - |
| label  | 按钮文字| string | -  |  - |
| type  | el-button type | string | -  |  - |
| roles  | 权限控制，传值与v-permission一致 | array  |  -  |  - |


#### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| handleButton  | buttons按钮组的点击回调 | 返回button的handle和el-table scope.row function(handle: string, row: object) |
