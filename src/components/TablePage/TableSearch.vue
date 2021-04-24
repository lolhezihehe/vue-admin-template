<template>
  <el-form v-if="columns.length>0" ref="form" :model="form" :label-width="labelWidth" class="table-search" @submit.native.prevent>
    <el-row :gutter="20">
      <el-col v-for="(item, index) in columns" v-show="showIndex === 0 || index<showIndex || isExpand" :key="item.prop" :span="item.span || 8">
        <el-form-item :prop="item.prop" :label="item.label">
          <!-- select -->
          <el-select
            v-if="item.type === 'select'"
            v-model="form[item.prop]"
            class="item-w100"
            v-bind="item.attrs || {}"
          >
            <el-option
              v-for="option in item.options"
              :key="option.value"
              :value="option.value"
              :label="option.label"
            />
          </el-select>

          <!-- datetime -->
          <el-date-picker
            v-else-if="item.type === 'datetime'"
            v-model="form[item.prop]"
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            :placeholder="defaultAttr(item.attrs, 'placeholder', '请选择')"
            class="item-w100"
            v-bind="item.attrs || {}"
          />

          <!-- date -->
          <el-date-picker
            v-else-if="item.type === 'date'"
            v-model="form[item.prop]"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :placeholder="defaultAttr(item.attrs, 'placeholder', '请选择')"
            class="item-w100"
            v-bind="item.attrs || {}"
          />

          <!-- year -->
          <el-date-picker
            v-else-if="item.type === 'year'"
            v-model="form[item.prop]"
            type="year"
            format="yyyy"
            value-format="yyyy"
            :placeholder="defaultAttr(item.attrs, 'placeholder', '请选择')"
            class="item-w100"
            v-bind="item.attrs || {}"
          />

          <!-- month -->
          <el-date-picker
            v-else-if="item.type === 'month'"
            v-model="form[item.prop]"
            type="month"
            format="MM"
            value-format="MM"
            :placeholder="defaultAttr(item.attrs, 'placeholder', '请选择')"
            class="item-w100"
            v-bind="item.attrs || {}"
          />

          <!-- datetimerange -->
          <el-date-picker
            v-else-if="item.type === 'datetimerange'"
            v-model="form[item.prop]"
            type="datetimerange"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            :range-separator="defaultAttr(item.attrs, 'rangeSeparator', '至')"
            :start-placeholder="defaultAttr(item.attrs, 'startPlaceholder', '开始时间')"
            :end-placeholder="defaultAttr(item.attrs, 'endPlaceholder', '结束时间')"
            class="item-w100"
            v-bind="item.attrs || {}"
          />

          <!-- daterange -->
          <el-date-picker
            v-else-if="item.type === 'daterange'"
            v-model="form[item.prop]"
            type="daterange"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :range-separator="defaultAttr(item.attrs, 'rangeSeparator', '至')"
            :start-placeholder="defaultAttr(item.attrs, 'startPlaceholder', '开始时间')"
            :end-placeholder="defaultAttr(item.attrs, 'endPlaceholder', '结束时间')"
            class="item-w100"
            v-bind="item.attrs || {}"
          />

          <!-- cascader -->
          <el-cascader
            v-else-if="item.type === 'cascader'"
            v-model="form[item.prop]"
            :options="item.options"
            :props="{emitPath:false, ...item.props}"
            :collapse-tags="defaultAttr(item.attrs, 'collapseTags', true)"
            :placeholder="defaultAttr(item.attrs, 'placeholder', '请选择')"
            class="item-w100"
            v-bind="item.attrs || {}"
          />

          <!-- 默认 input -->
          <el-input v-else v-model="form[item.prop]" v-bind="item.attrs || {}" />
        </el-form-item>
      </el-col>

      <el-col :span="8" :lg="6">
        <el-form-item label-width="0">
          <el-button type="primary" @click="submit">查询</el-button>
          <el-button v-if="showReset" @click="reset">重置</el-button>
          <el-button v-if="showIndex !== 0 && (columns.length > showIndex)" type="text" @click="isExpand = !isExpand">
            <span v-if="!isExpand">展开<i class="el-icon-arrow-down" /></span>
            <span v-else>收起<i class="el-icon-arrow-up" /></span>
          </el-button>
        </el-form-item>
      </el-col>

    </el-row>
  </el-form>
</template>

<script>
export default {
  name: 'TableSearch',
  props: {
    /**
     * 配置项数据
     * Array<object>
     */
    columns: {
      type: Array,
      default: () => []
    },

    /**
     * 是否有重置按钮
     */
    showReset: {
      type: Boolean,
      default: true
    },

    /**
     * 收起状态展示几个搜索项，默认2个, 0表示隐藏展开收起按钮
     */
    showIndex: {
      type: Number,
      default: 2
    },

    /**
     * el-form label-width
     */
    labelWidth: {
      type: String,
      default: '5em'
    }
  },
  data() {
    return {
      form: {},
      isExpand: false
    }
  },
  computed: {
    rangeColumns() {
      return this.columns.filter(v => {
        return v.type === 'daterange' || v.type === 'datetimerange'
      })
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      const form = {}
      this.columns.forEach(item => {
        form[item.prop] = Object.prototype.hasOwnProperty.call(item, 'default') ? item.default : undefined
      })
      // https://cn.vuejs.org/v2/guide/reactivity.html#%E5%AF%B9%E4%BA%8E%E5%AF%B9%E8%B1%A1
      this.form = { ...this.form, ...form }
    },
    /**
     * 如果attrs没有传值 则使用defaultValue
     */
    defaultAttr(attrs, key, defaultValue = '') {
      if (attrs && Object.prototype.hasOwnProperty.call(attrs, key)) return attrs[key]
      return defaultValue
    },
    submit() {
      // el-date range选择之后的值为array, 这里直接取 开始时间 和 结束时间（通过startKey和endKey 传参数字段）
      const rangeForm = {}
      this.rangeColumns.forEach(item => {
        const value = this.form[item.prop]
        const startKey = item.startKey || 'startDate'
        const endKey = item.endKey || 'endDate'
        // 先重置原prop字段，prop与startKey/endKey同一字段也无影响
        rangeForm[item.prop] = undefined
        if (Array.isArray(value) && value.length > 1) {
          rangeForm[startKey] = value[0]
          rangeForm[endKey] = value[1]
        } else {
          rangeForm[startKey] = undefined
          rangeForm[endKey] = undefined
        }
      })

      this.$emit('submit', { ...this.form, ...rangeForm })
    },
    reset() {
      this.$refs.form.resetFields()
      this.$emit('reset')
    }
  }
}
</script>

<style lang="scss" scoped>
.table-search {
  position: relative;
}
.item-w100 {
  width: 100%;
}
</style>
