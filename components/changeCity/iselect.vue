<template>
  <div class="m-iselect">
    <span class="name">按省份选择:</span>
    <el-select
      v-model="pvalue"
      placeholder="省份">
      <el-option
        v-for="item in province"
        :key="item.value"
        :label="item.label"
        :value="item.value"/>
    </el-select>
    <el-select
      v-model="cvalue"
      :disabled="!city.length"
      placeholder="城市">
      <el-option
        v-for="item in city"
        :key="item.value"
        :label="item.label"
        :value="item.value"/>
    </el-select>
    <el-autocomplete
      v-model="input"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入城市中文或拼音"
      @select="handleSelect"
    />
  </div>
</template>

<script>
import _ from 'lodash';
export default {
  data(){
    return {
      province:[],//全国省份列表
      pvalue:'',//选中的省份值
      city:[],//根据省份请求得到的城市列表
      cvalue:'',//选中的城市值
      input:'',//模糊查询的值
      cities:[]
    }
  },
  watch:{
    //监听省份值得变化，根据值去取城市的数据
    pvalue:async function(newPvalue){
      let self=this;
      let {status,data:{city:{value}}} =await self.$axios.get(`/geo/province/${newPvalue}`)
      if(status===200){
        self.city=value.map(item=>{
          return {
            value:item.id,
            label:item.name
          }
        })
        self.cvalue=''
      }
     
    }
  },
  mounted:async function(){
    let self=this;
    let {status,data:{province}}=await self.$axios.get('/geo/province')

    if(status===200){

      self.province=province.map(item=>{
        return {
          value:item.id,
          label:item.value
        }
      })
    }
  },
  methods:{
    //模糊查询规则
    querySearchAsync:_.debounce(async function(query,cb){
      let self=this;
      //城市列表中查找输入的值
      if(self.cities.length){ 
        cb(self.cities.filter(item => item.value.indexOf(query)>-1))
      }else{
        
        let {status,data:{city}}=await self.$axios.get('/geo/city')
        city = city.map(item => {
                return {
                    value: item.name
                }
            }

        )
        if(status===200){
          self.cities = city
           cb(self.cities.filter(item => item.value.indexOf(query)>-1))
        }else{
          cb([])
        }
      }
    },200),
    //实现选中城市跳转到首页
    handleSelect:function(item){
      console.log(item.value);
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/changeCity/iselect.scss";
</style>
