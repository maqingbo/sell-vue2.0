/**
 * @Author: wmaqingbo
 * @Date:   2017-10-20 18:43
 * @Email:  wmaqingbo@163.com
 * @Last modified by:   wmaqingbo
 * @Last modified time: 2017-12-11 21:31
 */

import Vue from 'vue'
import Router from 'vue-router'

// 1. 定义（路由）组件。
// 可以从其他文件 import 进来
import goods from '../components/goods/goods'
import ratings from '../components/ratings/ratings'
import seller from '../components/seller/seller'

// 注册路由插件
Vue.use(Router)

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。

const router = new Router({
  // mode: 'history',
  // 生产环境去掉下面一行注释
  // base: '/elm/',
  routes: [
    // 地址为空时跳转home页面
    {
      path: '',
      redirect: '/goods'
    }, {
      path: '/goods',
      name: 'goods',
      component: goods
    }, {
      path: '/ratings',
      name: 'ratings',
      component: ratings
    }, {
      path: '/seller',
      name: 'seller',
      component: seller
    }, {
      path: '/elm',
      redirect: '/elm/goods'
      // elm为所放置的文件夹名称，不修改的话可能会无法显示页面
    }
  ]
})

// 默认指向goods路径
router.push('goods')

export default router
