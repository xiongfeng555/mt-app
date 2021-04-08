<template>
  <li
    class="m-detail-item">
    <dl class="section">
      <dd>
        <img
          :src="meta.img"
          :alt="meta.type">
      </dd>
      <dd>
        <h4>{{ meta.name }}</h4>
        
        <p>
          <span class="price">{{ Number(meta.price) }}</span>
          <sub>门店价{{ Number(meta.price) }}</sub>
        </p>
      </dd>
      <dd>
        <el-button
          type="warning"
          round
          @click="createCart">立即抢购</el-button>
      </dd>
    </dl>
  </li>
</template>

<script>
export default {
  props: {
    meta: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  methods: {
    createCart: async function () {
      console.log(this.meta)
      let self = this;
      let {
        status,
        data: {
          code,
          id
        }
      } = await this.$axios.post('/cart/create', {
        params: {
          id: Math.random().toString().slice(3, 9),
          detail: {
            name: self.meta.name,
            price: self.meta.price,
            imgs: self.meta.img
          }
        }
      })
      if(status===200&&code===0){
        window.location.href=`/cart/?id=${id}`
      }else{
        console.log('error')
      }
    }
  }
}
</script>

<style lang="scss">


</style>
