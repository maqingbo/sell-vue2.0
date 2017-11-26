<template>
<div class="cartcontrol">
  <div class="cart-add" @click.stop.prevent="addCart">
    <span class="icon icon-add_circle"></span>
  </div>
  <transition-group name="move">
    <div key="cart-count" class="cart-count" v-show="food.count > 0">{{food.count}}</div>
    <div key="cart-decrease" class="cart-decrease" v-show="food.count > 0" @click.stop.prevent="decreaseCart">
      <span class="icon icon-remove_circle_outline"></span>
    </div>
  </transition-group>
</div>
</template>

<script>
import Vue from 'vue'

export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart() {
      // if (!event._constructed) {
      //   return
      // }
      console.log('click')
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        // console.log(+1)
        this.food.count += 1
      }
    },
    decreaseCart() {
      if (this.food.count) {
        this.food.count--
      }
    }
  }
}
</script>

<style lang="scss">
.cartcontrol {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 80px;
    height: 24px;
    // background-color: pink;
    .cart-add,
    .cart-count,
    .cart-decrease {
        display: inline-block;
        float: right;
        width: 24px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        font-size: 24px;
        color: #00a0dc;
        border-radius: 50%;
        background-color: #fff;
    }
    // 过度动画
    .move-enter-active,
    .move-leave-active {
        transition: all 0.4s linear;
    }
    .move-enter,
    .move-leave-to {
        opacity: 0;
        transform: translate3d(24px,0,0);
    }
    .move-enter-to,
    .move-leave {
        opacity: 1;
        transform: translate3d(0,0,0);
    }
    // 过度动画-结束
    // .cart-decrease {
    //     .icon {
    //       width: 24px;
    //       height: 24px;
    //       color: #00a0dc;
    //       background-color: #fff;
    //     }
    // }
    .cart-count {
        font-size: 10px;
        color: rgb(147,153,159);
        background-color: #fff;
    }
}
</style>
