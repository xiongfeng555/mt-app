import passport from "koa-passport";
import LocalStrategy from "passport-local";
import UserModel from "../../dbs/models/users";
passport.use(
    new LocalStrategy(async function(username, password, done) {
        let where = {
            username
        };
        let result = await UserModel.findOne({
            username
        });
        if (result !== null) {
            if (result.password === password) {
                return done(null, result);
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