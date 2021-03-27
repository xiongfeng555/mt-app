<template>
  <el-container class="layout-default">
  <el-header height="217px">
    <myheader/>
  </el-header>
  <el-main>
    <nuxt />
  </el-main>
  <el-footer height="100%">
    <my-footer/>
  </el-footer>
</el-container>
</template>
<script>
import Myheader from '@/components/public/header/index.vue'
import MyFooter from '@/components/public/footer/index.vue'
export default {
  components:{
    Myheader,
    MyFooter
  }
}
</script>

