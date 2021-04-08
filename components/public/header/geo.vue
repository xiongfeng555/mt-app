<template>
    <div class="m-geo">
        <i class="el-icon-location"></i>
        {{$store.state.geo.position.city}}
        <nuxt-link to="/changeCity" class="changeCity">切换城市</nuxt-link>
        [哈尔滨，七台河，鸡西]
    </div>
</template>
<script>
export default {
    created() {
        this.$store.commit('geo/setPosition', { city: '九江', province: '我忘了' })
    },
}
</script>

<style lang="scss" scoped>

</style>