import Router from "koa-router";
import axios from "./utils/axios";
import Poi from '../dbs/models/poi'
import Region from '../dbs/models/regions'
import Category from '../dbs/models/category'

let router = new Router({
    prefix: "/search" //设置路由前缀
});

//获取top推荐
router.get('/top', async(ctx) => {
    let top = await Poi.find({
        name: new RegExp(ctx.query.input),
        city: ctx.query.city
    });
    ctx.body = {
        code: 0,
        top: top.map(item => {
            return {
                name: item.name,
                type: item.type
            }
        }),
        type: top.length ? top[0].type : ''
    }
})

//获取热门搜索
router.get('/hotSearch', async(ctx) => {
    let result = await Region.find()
    ctx.body = {
        search: result
    }
})

//获取目录项
router.get('/category', async(ctx) => {
    let { types, areas } = await Category.findOne({
        city: ctx.query.city
    })
    ctx.body = {
        types,
        areas
    }
})

//获取商品详情页信息
router.get('/products', async(ctx) => {
    let keyword = ctx.query.keyword
    let { status, data: { menuList: list } } = await axios.get('/api/list.json')
    let result = {}
    let remain = []
    list.filter(item => {
        if (item.name === keyword) {
            result = item
        } else {
            item.name = keyword
            remain.push(item)
        }
    });
    if (status === 200) {
        ctx.body = {
            product: result,
            list: remain,
            more: remain,
            login: ctx.isAuthenticated()
        }
    } else {
        ctx.body = {
            product: {},
            login: ctx.isAuthenticated(),
            more: []
        }
    }

})

export default router;