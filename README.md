# Vue全家桶 + SSR + Koa2 全栈开发美团网（练习用...）

> My brilliant Nuxt.js project

## 实现功能
+ 登录注册
+ 邮箱验证码配置
+ 切换城市
+ 商品列表
+ 加入购物车
+ 订单页制作

## 作品示例

### 注册页
![image](https://user-images.githubusercontent.com/59500738/113985866-3311b880-987f-11eb-9f1c-e7edb6802bdb.png)

 ### 登录页
![image](https://user-images.githubusercontent.com/59500738/113985740-11183600-987f-11eb-9b1e-93862fb99ff4.png)

### 美团首页（与官网有些差别）
![image](https://user-images.githubusercontent.com/59500738/113985650-fa71df00-987e-11eb-9385-e4161f120a87.png)

### 切换城市页（只截取了一半，下面还有）
![image](https://user-images.githubusercontent.com/59500738/113985987-53da0e00-987f-11eb-9eff-040942730516.png)

### 商品列表页（数据是假的，地图使用高德地图API）
![image](https://user-images.githubusercontent.com/59500738/113986134-79671780-987f-11eb-9c50-50911cd700d0.png)

### 商品详情页（做了登录拦截，忽略信息不对，只做逻辑）
![image](https://user-images.githubusercontent.com/59500738/113986356-c21ed080-987f-11eb-9691-4c0967dc831a.png)

### 购物车页（有些简陋）
![image](https://user-images.githubusercontent.com/59500738/113986463-d8c52780-987f-11eb-8f3b-b068395ebb1f.png)

### 提交订单
![image](https://user-images.githubusercontent.com/59500738/113986547-ef6b7e80-987f-11eb-9828-a86232b5f632.png)

### 订单页
![image](https://user-images.githubusercontent.com/59500738/113986920-5db04100-9880-11eb-83e0-18d4e5aa85ed.png)


## 技术难点实现
+ 登录注册
```
1.使用passport实现登录验证和本地验证
2.redis服务器存储用户名和密码
3.session实现保持登录状态
代码在 /server/interface/utils/passport 中
```
+ 邮箱验证码配置
```
1.首先要开通你的邮箱smtp服务，并生成你的授权码
2.具体代码可查看/server/dbs/config.js
```

## 注意事项

+ 数据是假的，因为真的线上接口拿不到（穷）
+ 有一部分mongdb数据集合，在dbs中collections中，可以自取然后导入mongodb可视化工具中（我用的是NoSQLBooster）
+ 新手第一次用nuxt.js写项目，肯定存在很多不好的地方，会一直学习一直改的

## 构建步骤

``` bash
# 安装依赖
$ npm run install（如果安装了cnpm，可以直接cnpm i）

# 运行项目
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```
