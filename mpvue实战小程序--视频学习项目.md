# mpvue_app

> A Mpvue project

## Build Setup

``` bash
# 初始化项目
vue init mpvue/mpvue-quickstart myproject
cd myproject

# 安装依赖
yarn

# 开发时构建
npm dev

# 打包构建
npm build

# 指定平台的开发时构建(微信、百度、头条、支付宝)
npm dev:wx
npm dev:swan
npm dev:tt
npm dev:my

# 指定平台的打包构建
npm build:wx
npm build:swan
npm build:tt
npm build:my

# 生成 bundle 分析报告
npm run build --report
```

onLoad：页面第一次加载时触发，从跳转页面返回时不能触发，可以传递参数

onShow：页面显示或从后台跳回小程序时显示此页面时触发，从跳转页面返回时触发，不能传递参数

onHide：页面隐藏，例如使用 wx.navigateTo  只是打开新页面  并不关闭原页面

onUnload：页面被卸载，例如使用 wx.redirectTo  重定向一个页面 原页面已经关闭

当初始化或打开一个新页面时  先执行onLoad，然后执行onShow

但是对于Tab页面，又是不一样的

从A第一次请求到B 是onHide然后是onLoad、onShow

第二次请求则不执行onLoad，因为B页面已经被缓存了，所以当你想看到新页面时只能使用onShow来刷新

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
