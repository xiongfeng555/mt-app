import Router from "koa-router";
import axios from "./utils/axios";
import Cart from "../dbs/models/cart";
import md5 from "crypto-js/md5";

let router = new Router({ prefix: "/cart" });

//创建购物车
router.post("/create", async ctx => {
    if (!ctx.isAuthenticated()) { //如果没有登录
        ctx.body = {
            code: -1,
            msg: "please login"
        };
    } else { //当用户处于登录状态时
        let time = Date();
        let cartNo = md5(Math.random() * 1000 + time).toString(); //生成一个属产品的id并返回给客户端
        let {
            params: { id, detail }
        } = ctx.request.body;
        let cart = new Cart({ id, cartNo, time, user: ctx.session.passport.user, detail });
        let result = await cart.save()
        if (result) {
            ctx.body = {
                code: 0,
                msg: "",
                id: cartNo
            };
        } else {
            ctx.body = {
                code: -1,
                msg: 'fail'
            }
        }
    }
});

//获取购物车数据
router.post('/getCart', async(ctx) => {
    let { id } = ctx.request.body
    let result = await Cart.findOne({
        cartNo: id
    })
    if (result) {
        ctx.body = {
            code: 0,
            data: result.detail[0]
        }
    } else {
        ctx.body = {
            code: -1,
            data: {}
        }
    }
})
export default router;