<template>
  <div style="height: calc(100vh - 50px); width: 100%">
    <amap :zoom="6" :center="[119.296389, 26.074268]">
      <amap-marker
        v-for="mark in marks"
        :key="mark.date"
        :position="mark.position"
				:label="{
					content: mark.city + mark.date,
					direction: 'bottom'
				}"
      />
    </amap>
  </div>
</template>

<script>
import Amap from '@amap/amap-vue/lib/amap'
import AmapMarker from '@amap/amap-vue/lib/marker'
export default {
  components: {
    Amap,
    AmapMarker
  },
  data() {
    return {
      marks: [
        { position: [120.383096, 36.266249], city: '青岛', date: '2020-12-30' },
        { position: [121.320081, 31.193964], city: '上海', date: '2020-08-27' },
        { position: [115.7407, 32.879193], city: '阜阳', date: '2020-07-07' },
        { position: [113.269114, 22.988374], city: '广州', date: '2020-07-05' },
        { position: [120.2126, 30.290851], city: '杭州', date: '2018-06-29' },
        { position: [118.798039, 31.96875], city: '南京', date: '2018-07-01' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
