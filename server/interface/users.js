import Router from "koa-router";
import Redis from "koa-redis";
import nodeMailer from "nodemailer";
import User from "../dbs/models/users";
import Passport from "./utils/passport";
import Email from "../dbs/config";
import axios from "./utils/axios";

let router = new Router({
    prefix: "/users" //设置路由前缀
});
console.log(User)
    //新建redis客户端，用于存储用户名和密码
let Store = new Redis().client;

//注册
router.post("/signup", async ctx => {
    const { username, password, email, code } = ctx.request.body;
    if (code) { //如果验证码存在进行验证
        const saveCode = await Store.hget(`nodemail:${username}`, "code"); //根据username取关键字code的值
        const saveExpire = await Store.hget(`nodemail:${username}`, "expire"); //取有效时间
        if (code === saveCode) {
            //如果验证码相同
            if (new Date().getTime() - saveExpire > 0) {
                ctx.body = {
                    code: -1,
                    msg: "验证码已过期，请重新尝试"
                };
                return false;
            }
        } else {
            //填写错误的验证码
            ctx.body = {
                code: -1,
                msg: "请填写正确的验证码"
            };
        }
    } else {
        //没填写验证码需要拦截
        ctx.body = {
            code: -1,
            msg: "请填写验证码"
        };
    }
    let user = await User.find({
        //查找是否已有用户名被注册
        username
    });
    if (user.length) { //如果用户名已存在
        ctx.body = {
            code: -1,
            msg: "用户名已被注册"
        };
        return;
    }
    let nuser = await User.create({ //创建一个新用户信息
        username,
        password,
        email
    });
    if (nuser) { //如果创建成功
        let res = await axios.post('/users/signin', { //发送登录请求
            username,
            password
        })
        if (res.data && res.data.code === 0) {
            ctx.body = {
                code: 0,
                msg: "注册成功",
                user: res.data.user
            };
        } else {
            ctx.body = {
                code: -1,
                msg: "err"
            };
        }
    } else {
        ctx.body = {
            code: -1,
            msg: "注册失败"
        };
    }
});
//登录
router.post("/signin", async(ctx, next) => {
    return Passport.authenticate(
        "local",
        function(
            err,
            user,
            info,
            status
        ) {
            //与passport中制定的策略想对应
            if (err) {
                ctx.body = {
                    code: -1,
                    msg: err
                };
            } else {
                if (user) {
                    ctx.body = {
                        code: 0,
                        msg: "登录成功",
                        user
                    };
                    return ctx.login(user); //存入session，对应passport序列化参数
                } else {
                    ctx.body = {
                        code: 1,
                        msg: info
                    };
                }
            }
        }
    )(ctx, next); //此处将ctx传入本地验证策略函数
});
//验证码
router.post("/verify", async(ctx, next) => {
    let username = ctx.request.body.username;
    const saveExpire = await Store.hget(`nodemail:${username}`, "expire");
    if (saveExpire && (new Date().getTime() - saveExpire < 0)) { //如果有效期存在并且间隔小于1分钟
        ctx.body = {
            code: -1,
            msg: "验证请求过于频繁，一分钟内一次"
        };
        return false;
    }
    //邮箱设置
    let transporter = nodeMailer.createTransport({
        host: Email.smtp.host,
        port: 587,
        secure: false,
        auth: {
            user: Email.smtp.user,
            pass: Email.smtp.pass
        }
    });
    let ko = {
        code: Email.smtp.code(),
        expire: Email.smtp.expire(),
        email: ctx.request.body.email,
        user: ctx.request.body.username
    };
    //设置发邮件的内容
    let mailOptions = {
            from: `'认证邮件'<${Email.smtp.user}>`,
            to: ko.email,
            subject: '高仿美团验证码',
            html: `您在高仿美团官网中注册，您的邀请码是${ko.code}`
        }
        //发邮件
    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('error')
        } else {
            Store.hmset(`nodemail:${ko.user}`, 'code', ko.code, 'expire', ko.expire, 'email', ko.email)
        }
    })
    ctx.body = {
        code: 0,
        msg: '验证码已发送，可能会有延时，有效期1分钟'
    }
});

//退出
router.get('/exit', async(ctx, next) => {
        await ctx.logout() //设置退出动作
        if (!ctx.isAuthenticated()) { //验证是都处于登录状态
            ctx.body = {
                code: 0
            }
        } else {
            ctx.body = {
                code: -1
            }
        }
    })
    //获取用户信息
router.get('/getUser', async(ctx) => {
    if (ctx.isAuthenticated()) {
        const { username, email } = ctx.session.passport.user
        ctx.body = {
            user: username,
            email
        }
    } else {
        ctx.body = {
            user: '',
            email: ''
        }
    }
})

export default router