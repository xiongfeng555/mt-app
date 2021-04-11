<template>
    <div class="search-panel">
        <el-row class="m-header-searchbar">
            <el-col :span="3" class="left">
                <img src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png" alt="美团">
            </el-col>
            <el-col :span="15" class="center">
                <div class="wrapper">
                    <el-input placeholder="搜索商家和地点" v-model="search" @focus="focus" @blur="blur" @input="input"></el-input>
                    <button class="el-button el-button--primary" @click="toProduct"><i class="el-icon-search"></i></button>
                    <dl class="hotPlace" v-show="isHotPlace">
                        <dt>热门搜索</dt>
                        <dd v-for="(item,index) in $store.state.home.hotPlace.slice(0,5)" :key="index">{{item.name}}</dd>
                    </dl>
                    <dl class="searchList" v-show="isSearchList">
                        <dd v-for="(item,index) in searchList" :key="index+'s'">{{item.name}}</dd>
                    </dl>
                </div>
                <p class="suggest">
                    <nuxt-link to="/products">菜单列表</nuxt-link>
                    <nuxt-link to="/products">菜单列表</nuxt-link>
                    <nuxt-link to="/products">菜单列表</nuxt-link>
                    <nuxt-link to="/products">菜单列表</nuxt-link>
                    <nuxt-link to="/products">菜单列表</nuxt-link>
                </p>
                <ul class="nav">
                    <li>
                        <nuxt-link to="/" class="takeout">美团外卖</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/" class="movie">猫眼电影</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/" class="hotel">美团酒店</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/" class="apartment">民宿/公寓</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/" class="business">商家入驻</nuxt-link>
                    </li>
                </ul>
            </el-col>
            <el-col :span="6" class="right">
                <ul class="security">
                    <li><i class="refund"><p class="txt">随时退</p></i></li>
                     <li><i class="single"><p class="txt">不满意退单</p></i></li>
                      <li><i class="overdue"><p class="txt">过期退</p></i></li>
                </ul>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import _ from 'lodash'
export default {
    data() {
        return {
            search:'',
            isFocus:false,
            hotPlaceList:['天安门','毛主席'],
            searchList:[]
        }
    },
    computed:{
        isHotPlace(){ //
            return this.isFocus && !this.search
        },
        isSearchList(){
            return this.isFocus && this.search
        }
    },
    methods: {
        focus(){
            this.isFocus = true
        },
        blur(){
            let self = this
            setTimeout(function(){
                self.isFocus = false
            },200)
        },
        input:_.debounce(async function(){
            let self = this
            let city = self.$store.state.geo.position.city.replace('市','')
            self.searchList = ''
            let {status,data:{top}} = await self.$axios.get('/search/top',{
                params:{
                    input:self.search,
                    city
                }
            })
            self.searchList = top
        },300),
        toProduct(){
            window.location.href = '/products'
        }
    },
}
</script>