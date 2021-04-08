import Router from "koa-router";
import axios from "./utils/axios";
import Cities from "../dbs/models/cities";
import Menu from "../dbs/models/menus";
import Province from '../dbs/models/province'

let router = new Router({
    prefix: "/geo" //设置路由前缀
});


router.get("/getPosition", async ctx => {
    ctx.body = {
        city: "九江",
        province: "河北省"
    };
    // let {
    //     status,
    //     data: { province, city, ip }
    // } = await axios.get(`http://cp-tools.cn/geo/getPosition`);
    // if (status === 200) {
    //     ctx.body = {
    //         province,
    //         city
    //     };
    // } else {
    //     ctx.body = {
    //         province: "",
    //         city: ""
    //     };
    // }
    // console.log(statues, province)
});

//获取菜单
router.get("/menu", async ctx => {
    const result = await Menu.findOne({});
    ctx.body = {
        menu: result
    };
});
//获取省份
router.get("/province", async(ctx) => {
    const result = await Province.find()
    ctx.body = {
        province: result
    }
})

//根据传过来的id获取相应的城市列表
router.get("/province/:id", async(ctx) => {
    const result = await Cities.findOne({
        id: ctx.params.id
    })
    ctx.body = {
        city: result
    }
})

//获取所有城市列表
router.get('/city', async(ctx) => {

        let result = await Cities.find()
        let city = []
        result.forEach(item => {
            city = city.concat(item.value)
        })


        ctx.body = {
            city: city
        }

    })
    //获取热门城市
router.get("/hotCity", async ctx => {
    let list = [
        '北京市',
        '上海市',
        '广州市',
        '深圳市',
        '天津市',
        '西安市',
        '杭州市',
        '南京市',
        '武汉市',
        '成都市'
    ]
    let result = await Cities.find()
    let nList = []
    result.forEach(item => {
        nList = nList.concat(item.value.filter(k => list.includes(k.name) || list.includes(k.province)))
    })
    ctx.body = {
            hots: nList
        }
        // let {
        //     status,
        //     data: { hots }
        // } = await axios.get(`http://cp-tools.cn/geo/hotCity?sign=${sign}`);
        // if (status === 200) {
        //     ctx.body = {
        //         hots
        //     };
        // } else {
        //     ctx.body = {
        //         hots: []
        //     };
        // }
});

export default router;