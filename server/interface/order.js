import Router from "koa-router";
import axios from "./utils/axios";
import Cart from "../dbs/models/cart"
import Order from "../dbs/models/order";
import md5 from "crypto-js/md5";


var router = new Router({ prefix: "/order" })


//创建订单
router.post('/createOrder', async(ctx) => {
    let { id, price, count } = ctx.request.body
    console.log(id, price, count)
    let time = Date()
    let orderId = md5(Math.random() * 1000 + time).toString()
    if (!ctx.isAuthenticated()) {
        ctx.body = {
            code: -1,
            msg: 'please login'
        }
    } else {
        let findCart = await Cart.findOne({ cartNo: id })
        console.log(findCart)
        let order = new Order({
            id: orderId,
            count,
            total: price * count,
            time,
            user: ctx.session.passport.user,
            name: findCart.detail[0].name,
            imgs: findCart.detail[0].imgs,
            status: 0
        })
        let result = await order.save()
        if (result) {
            await findCart.remove()
            ctx.body = {
                code: 0,
                id: orderId
            }
        } else {
            ctx.body = {
                code: -1
            }
        }
    }
})


//获取订单
router.post('/getOrders', async(ctx) => {
    if (!ctx.isAuthenticated()) {
        ctx.body = {
            code: -1,
            list: [],
            msg: 'please login'
        }
    } else {
        let result = await Order.find()
        console.log(result)
        if (result) {
            ctx.body = {
                code: 0,
                list: result
            }
        } else {
            ctx.body = {
                code: -1,
                list: []
            }
        }
    }
})
export default router