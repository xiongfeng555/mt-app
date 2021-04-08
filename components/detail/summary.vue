<template>
  <dl class="m-sum-card">
    <dt>
      <h1>{{ meta.name }}</h1>
      <el-rate
        v-model="rate"
        disabled />
      <span>{{ Number(meta.rate)}}分</span>
      <span>人均￥{{ Number(meta.price) }}</span>
      <ul>
        <li>地址：{{ meta.addr }}</li>
        <li>电话：{{ meta.ticket }}</li>
      </ul>
    </dt>
    <dd>
      <el-carousel
        height="214px"
        indicator-position="none">
        <el-carousel-item>
          <h3><img
            :src="meta.img"
            :alt="meta.name"
            width="100%"
            height="100%"></h3>
        </el-carousel-item>
      </el-carousel>
    </dd>
  </dl>
</template>

<script>
export default {
  props: {
    meta: {
      type:Object,
      default:()=>{
        return {}
      }
    }
  },
  data() {
    return {
      sale: 70 + Math.floor(Math.random() * 300)
    }
  },
  computed: {
    rate: function () {
      return Number(this.meta.rate) || Math.floor(Math.random() * 5)
    }
  },
  methods: {
    openMap: function (location) {

    }
  }
}
</script>
