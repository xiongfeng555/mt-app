import passport from "koa-passport";
import LocalStrategy from "passport-local";
import UserModel from "../../dbs/models/users";
passport.use( //制定本地验证策略
    new LocalStrategy(async function(username, password, done) {
        let where = {
            username
        };
        let user = await UserModel.findOne({
            username
        });
        if (user !== null) {
            if (user.password === password) {
                return done(null, user);
            } else {
                return done(null, false, "密码错误");
            }
        } else {
            return done(null, false, "用户不存在");
        }
    })
);
passport.serializeUser(function(user, done) {
    //序列化 将数据存入session
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    //反序列化 从session中取数据
    return done(null, user);
});

export default passport;