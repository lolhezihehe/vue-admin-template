<template>
  <div class="demo-block">
    <TablePage :search-config="sesrchConfig" />
  </div>
</template>

<script>
import TablePage from '@/components/TablePage'
export default {
  components: {
    TablePage
  },
  data() {
    return {
      sesrchConfig: {
        columns: [
          { prop: 'name', label: '名称', default: 'jack' },
          { prop: 'sex', label: '性别', type: 'select', options: [], attrs: { clearable: true }},
          { prop: 'birth', label: '生日', type: 'date' },
          { prop: 'year', label: '年份', type: 'year' },
          { prop: 'month', label: '月份', type: 'month' },
          { prop: 'range', label: '日期区间', type: 'daterange', span: 16, startKey: 'startDate', endKey: 'endDate', attrs: { startPlaceholder: '开始时间' }},
          { prop: 'timerange', label: '时间区间', type: 'datetimerange', span: 16, startKey: 'startDateTime', endKey: 'endDateTime', attrs: { startPlaceholder: '开始时间' }},
          { prop: 'datetime', label: '时间', type: 'datetime' },
          { prop: 'cascader', label: '级联', type: 'cascader', options: [], attrs: { clearable: true }}
        ],
        showIndex: 0
      }
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
  }
}
</script>

<style lang="scss" scoped>
.demo-block{
	position: relative;
	padding: 30px;
	background: #fff;
}
</style>
