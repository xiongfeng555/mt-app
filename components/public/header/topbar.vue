<template>
    <el-row :gutter="0">
  <el-col :span="6">
      <geo/>
  </el-col>
  <el-col :span="6">
        <user/>
      </div></el-col>
  <el-col :span="12"><nav-bar/></div></el-col>
</el-row>
</template>
<script>
import Geo from './geo.vue'
import User from './user.vue'
import NavBar from './nav'
export default {
    components:{
        Geo,
        User,
        NavBar
    }
}
</script>

<style lang="scss">
    @import "@/assets/css/public/layout.scss";
</style>