<template>
    <div class="m-menu">
        <dl class="nav" @mouseleave="mouseleave">
            <dt>全部分类</dt>
            <dd v-for="(item,index) in menu" :key="index"  @mouseenter="mouseenter"><i :class="item.type"></i>{{item.name}}<span class="arrow"></span></dd>
        </dl>
        <div class="detail" v-if="kind" @mouseenter="sover" @mouseleave="sout">
            <template v-for="(item,index) in curdetail.child">
            <h4 :key="index+'a'">{{item.title}}</h4>
            <span v-for="v in item.child" :key="v">{{v}}</span>    
            </template>
            
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            kind:'',
            menu:[{
                type:'food',
                name:'美食',
                child:[{
                    title:'美食',
                    child:['代金券','火锅']
                }]
            },{
                type:'takeout',
                name:'外卖',
                child:[{
                    title:'外卖',
                    child:['代金券','火锅']
                }]
            }]
        }
    },
    computed:{
        curdetail(){
            return this.menu.filter((item)=>{
                return item.type === this.kind
            })[0]
        }
    },
    methods: {
        mouseleave(){
            let self = this
            self.timer = setTimeout(function(){
                self.kind = ''
            },150)
        },
        mouseenter(e){
        this.kind = e.target.querySelector('i').className
    },
    sover(){ //鼠标进入细节层，清空定时器
        clearTimeout(this.timer)
    },
    sout(){ // 鼠标离开细节层
        this.kind = ''
    }
    }
}
</script>