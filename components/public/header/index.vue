<template>
    <div class="m-header">
        <el-row>
            <el-col>
                <top-bar/>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import topBar from './topbar'
import searchBar from './searchbar'
import Topbar from './topbar.vue'
export default {
    components:{
        topBar,
        searchBar
    }
}
        Topbar
</script>

<style lang="scss">
    @import "@/assets/css/public/header/index.scss"
</style>