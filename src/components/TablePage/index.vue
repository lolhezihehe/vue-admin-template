<template>
  <div class="table-page">
    <TableSearch v-bind="searchConfig" @search="handleSearch" />
    <el-table :data="list" border stripe highlight-current-row v-bind="$attrs" v-on="$listeners">
      <template v-for="column in columns">
        <!-- expand -->
        <el-table-column v-if="column.type === 'expand'" :key="'_' + column.type" type="expand" v-bind="column.attrs" />

        <!-- index -->
        <el-table-column
          v-else-if="column.type === 'index'"
          :key="'_' + column.type"
          type="index"
          :label="column.label"
          :index="indexMethod"
          v-bind="column.attrs"
        />

        <!-- selection -->
        <el-table-column
          v-else-if="column.type === 'selection'"
          :key="'_' + column.type"
          type="selection"
          v-bind="column.attrs"
        />

        <!-- link -->
        <el-table-column
          v-else-if="column.type === 'link'"
          :key="column.prop"
          :prop="column.prop"
          :label="column.label"
          v-bind="column.attrs"
        >
          <template v-slot="scope">
            <el-link type="primary">{{ scope.row[column.prop] }}</el-link>
          </template>
        </el-table-column>

        <!-- slot -->
        <el-table-column
          v-else-if="column.type === 'slot'"
          :key="column.prop"
          :prop="column.prop"
          :label="column.label"
          v-bind="column.attrs"
        >
          <template v-slot="scope">
            <slot :name="column.prop" v-bind="scope" />
          </template>
        </el-table-column>

        <!-- button -->
        <el-table-column
          v-else-if="column.type === 'button'"
          :key="column.prop"
          :label="column.label"
          v-bind="column.attrs"
        >
          <template v-slot="scope">
            <el-button
              v-for="btn in column.buttons"
              :key="btn.handle"
              :type="btn.type"
              size="mini"
              @click="handleButton(btn.handle, scope.row)"
            >{{ btn.label }}</el-button>
          </template>
        </el-table-column>

        <!-- 默认 -->
        <el-table-column v-else :key="column.prop" :prop="column.prop" :label="column.label" v-bind="column.attrs">
          <template v-slot="scope">
            <span>{{ scope.row[column.prop] | filterText }}</span>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <!-- pagination -->
    <el-pagination
      v-if="pagination"
      class="table-pagination"
      :total="total"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      v-bind="mergePageAttrs"
      @current-change="getList"
      @size-change="getList"
    />
  </div>
</template>

<script>
import TableSearch from './TableSearch'
import _get from 'lodash/get'
function isEmpty(value) {
  if (value === undefined || value === null || value === '') return true
  return false
}
export default {
  name: 'TablePage',
  components: {
    TableSearch
  },
  filters: {
    filterText: function(value) {
      if (isEmpty(value)) return '-'
      return value
    }
  },
  props: {
    /**
     * tbale-search的全部配置
     */
    searchConfig: {
      type: Object,
      default: () => { }
    },
    /**
     * 默认请求带有的参数
     */
    baseParams: {
      type: Object,
      default: () => { }
    },
    /**
     * 请求方法
     */
    listMethod: {
      type: Function,
      default: null
    },
    /**
     * 返回数据的字段key
     */
    listKey: {
      type: String,
      default: 'data.list'
    },
    /**
     * 返回total的字段key
     */
    totalKey: {
      type: String,
      default: 'data.total'
    },
    /**
     * 删除方法
     */
    deleteMethod: {
      type: Function,
      default: null
    },
    /**
     * 删除方法传的标识 默认id
     */
    deleteKey: {
      type: String,
      default: 'id'
    },
    /**
     * columns
     */
    columns: {
      type: Array,
      default: () => []
    },
    /**
     * 是否需要页码
     */
    pagination: {
      type: Boolean,
      default: true
    },
    /**
     * el-pagination的 prop
     */
    pageAttrs: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      // search
      searchParams: null,
      // table
      list: [],
      // pagination
      mergePageAttrs: {
        layout: 'total, sizes, prev, pager, next, jumper',
        background: true,
        pageSizes: [10, 20, 30, 50],
        ...this.pageAttrs
      },
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
  created() {
    this.getList()
  },
  methods: {
    getList() {
      if (typeof this.listMethod === 'function') {
        const p = Promise.resolve(this.listMethod(this.params))
        p.then(response => {
          this.list = _get(response, this.listKey, [])
          this.total = _get(response, this.totalKey, 0)
        }).catch(() => {
          this.list = []
          this.total = 0
        })
      } else {
        console.warn('无请求列表方法')
      }
    },
    indexMethod(index) {
      return (this.currentPage - 1) * this.pageSize + index + 1
    },
    handleSearch(data) {
      this.searchParams = data
      this.getList()
    },
    handleButton(handle, row) {
      this.$emit('handleButton', handle, row)
      if (handle === 'delete' && typeof this.listMethod === 'function') {
        this.handleDelete(row)
      }
    },
    handleDelete(row) {
      this.$confirm('是否删除？', '提示').then(() => {
        this.deleteMethod(row[this.deleteKey]).then((response) => {
          this.$message.success(response.message)
          this.getList()
        })
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.table-page {
  position: relative;
}
.table-pagination {
  text-align: right;
}
</style>
