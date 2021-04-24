<template>
  <div class="table-page">
    <TableSearch v-bind="searchConfig" @submit="handleSubmit" />
    <el-table
      :data="list"
    >
      <el-table-column prop="title" label="Title" />
    </el-table>
    <el-pagination
      v-if="pagination"
      class="table-pagination"
      background
      :layout="pageLayout"
      :total="total"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :page-sizes="[10, 20, 30, 50]"
      @current-change="getList"
      @size-change="getList"
    />
  </div>
</template>

<script>
import TableSearch from './TableSearch'
import { getList } from '@/api/table'
export default {
  name: 'TablePage',
  components: {
    TableSearch
  },
  props: {
    /**
     * tbale-search的全部配置
     */
    searchConfig: {
      type: Object,
      default: () => {}
    },
    /**
     * 默认请求带有的参数
     */
    baseParams: {
      type: Object,
      default: () => {}
    },
    /**
     * 是否需要页码
     */
    pagination: {
      type: Boolean,
      default: true
    },
    /**
     * el-pagination的layout
     */
    pageLayout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    }
  },
  data() {
    return {
      // search
      searchParams: null,
      // table
      list: [],
      // pagination
      total: 0,
      currentPage: 1,
      pageSize: 10
    }
  },
  computed: {
    params() {
      return {
        page: this.pagination ? this.currentPage : undefined,
        size: this.pagination ? this.pageSize : undefined,
        ...this.baseParams,
        ...this.searchParams
      }
    }
  },
  methods: {
    getList() {
      getList(this.params).then(response => {
        this.list = response.data.items
        this.total = response.data.items.length
      }).catch(() => {
        this.list = []
        this.total = 0
      })
    },
    handleSubmit(data) {
      this.searchParams = data
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
.table-page{
	position: relative;
}
.table-pagination{
  text-align: right;
}
</style>
