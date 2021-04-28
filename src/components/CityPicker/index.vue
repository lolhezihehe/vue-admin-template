<template>
  <el-cascader v-bind="$attrs" :options="options" :props="optionProps" v-on="$listeners" />
</template>

<script>
/**
 * 业务组件 地区选择组件
 */
export default {
  name: 'CityCascader',
  props: {
    props: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      options: [],
      defaultProps: {
        children: 'children',
        label: 'name',
        value: 'id',
        emitPath: false
      }
    }
  },
  computed: {
    optionProps() {
      return {
        ...this.defaultProps,
        ...this.props
      }
    }
  },
  created() {
    this.getOptions()
  },
  methods: {
    getOptions() {
      // 数据可以是从api或者store获取
      setTimeout(() => {
        this.options = [
          {
            id: 110000,
            name: '北京市',
            children: [
              { id: 110105, name: '朝阳区' },
              { id: 110106, name: '丰台区' }
            ]
          },
          {
            id: 310000,
            name: '上海市',
            children: [
              { id: 310101, name: '黄浦区' },
              { id: 310104, name: '徐汇区' },
              { id: 310106, name: '静安区' }
            ]
          },
          {
            id: 350000,
            name: '福建省',
            children: [
              {
                id: 350100,
                name: '福州市',
                children: [
                  { id: 350102, name: '鼓楼区' },
                  { id: 350103, name: '台江区' },
                  { id: 350104, name: '仓山区' }
                ]
              },
              {
                id: 350200,
                name: '厦门市',
                children: [
                  { id: 350203, name: '思明区' },
                  { id: 350205, name: '海沧区' }
                ]
              }
            ]
          }
        ]
      }, 1000)
    }
  }
}
</script>
