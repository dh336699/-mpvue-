# 微信小程序mpvue模板

> A Mpvue project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
1.根据自己需要修改token页面，以及token页面跳转路径

2.component-examples中为展示的组件用法

3.api文件为接口管理文件

4.class文件中为一个倒计时类

5.common中js文件的city有各种全国省市区数据

6.common中js文件的index为常用函数，例：倒计时，七牛云上传图，时间戳转换等

7.common中js文件的wx，微信常用api封装 引入方式 import * as xx from 'wx'

8.common中styles文件的elements.less文件， CSS 模块化，页面中直接引用elements.less即可

9.store中的index为vuex文件，其他文件根据项目大小可进行拓展。
