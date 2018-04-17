<template>
<div id="app">
  <vheader :seller="seller"></vheader>
  <div class="tab">
    <div class="tab-item">
      <!-- 使用 router-link 组件来导航. -->
      <!-- 通过传入 `to` 属性指定链接. -->
      <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
      <router-link :to="{ name: 'goods'}">商品</router-link>
    </div>
    <div class="tab-item">
      <router-link :to="{ name: 'ratings'}">评论</router-link>
    </div>
    <div class="tab-item">
      <router-link :to="{ name: 'seller'}">商家</router-link>
    </div>
  </div>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view :seller="seller"></router-view>
</div>
</template>

<script>
import header from './components/header/header'

// const ERR_OK = 0

export default {
  data() {
    return {
      seller: {}
    }
  },
  created() {
    this.$http.get('http://oq6glhzmw.bkt.clouddn.com/data.json').then((response) => {
      // console.log('app.vue')
      // console.log(response.body)
      if (response.status === 200) {
        // console.log(response.body.seller)
        this.seller = response.body.seller
      }
    })
  },
  components: {
    'vheader': header
  }
}
</script>

<style lang="scss">
@import '~@/common/sass/mixin.scss';

#app {
    .tab {
        display: flex;
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        // background-color: pink;
        @include border-1px(rgba(7,17,27,.1));
        .tab-item {
            flex: 1;
            > a {
                display: block;
                width: 100%;
                height: 100%;
                font-size: 14px;
                color: rgb(77,85,93);
                &.router-link-active {
                    color: rgb(240,20,20);
                }
            }
        }
    }
}
</style>
