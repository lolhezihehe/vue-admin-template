<template>
  <div class="demo-block">
    <TableSearch :columns="columns" :show-index="0" @submit="handleSubmit" />
    <pre>
			{{ params }}
		</pre>
  </div>
</template>

<script>
import TableSearch from '@/components/TablePage/TableSearch'
export default {
  components: {
    TableSearch
  },
  data() {
    return {
      params: null,
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
      ]
    }
  },
  created() {
    this.columns.find(v => v.prop === 'sex').options = [{ value: 1, label: '男' }, { value: 0, label: '女' }]
    this.columns.find(v => v.prop === 'cascader').options = [{
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
    handleSubmit(data) {
      console.log('handle submit', data)
      this.params = data
    }
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
