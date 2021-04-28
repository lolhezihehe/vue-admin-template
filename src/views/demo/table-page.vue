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
