<template>
  <div class="shopcart">
    <div class="content" @click="toggleList">
      <!-- 购物车左侧 -->
      <div class="content-left">
        <!-- 购物车小图标 -->
        <div class="logo-wrapper">
          <div class="logo" :class="{'height-light': totalCount > 0}">
            <span class="icon">O</span>
          </div>
          <div v-show="totalCount > 0" class="num">{{totalCount}}</div>
        </div>
        <!-- 总价格 -->
        <div class="price">
          <div class="text" :class="{'height-light': totalCount > 0}"><span class="icon">￥</span>{{totalPrice}}</div>
        </div>
        <!-- 另需XX元配送 -->
        <div class="desc">
          <div class="text">另需￥{{deliveryPrice}}元</div>
        </div>
      </div>
      <!-- 右侧结算按钮 -->
      <div class="content-right">
        <div class="pay" :class="payClass">{{payDesc}}</div>
      </div>
    </div>
    <!-- 购物车弹出层 -->
    <div class="shopcartList" v-show="listShow">
      <div class="list-header">
        <div class="title">购物车</div>
        <div class="empty" @click="empty">清空</div>
      </div>
      <div class="list-content" ref="content">
        <ul>
          <li class="food" v-for="food in selectFoods" v-show="food.count > 0">
            <div class="name">{{food.name}}</div>
            <div class="cartcontrol-wrapper">
              <cartcontrol :food="food"></cartcontrol>
            </div>
            <div class="price">
              <span><span class="icon">￥</span>{{food.price * food.count}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 购物车详情页弹出时的背景遮罩 -->
    <transition name="mask">
      <div class="mask" v-show="listShow" @click="toggleList"></div>
    </transition>
  </div>
</template>

<script>
import cartcontrol from '../cartcontrol/cartcontrol'
// import BScroll from 'better-scroll'

export default {
  props: {
    selectFoods: {
      type: Array,
      default () {
        return [{
          name: '皮蛋瘦肉粥',
          price: 30,
          count: 2
        }, {
          name: '瘦肉粥',
          price: 40,
          count: 2
        }]
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      // 列表折叠
      fold: true
    }
  },
  components: {
    cartcontrol
  },
  computed: {
    // 计算总价，依赖 selectFoods
    totalPrice() {
      let total = 0
      this.selectFoods.forEach((food) => {
        total += food.price * food.count
      })
      return total
    },
    // 计算总数，依赖 selectFoods
    totalCount() {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    // 结算按钮的三种属性
    payDesc() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`
      } else if (this.totalPrice < this.minPrice) {
        const diff = this.minPrice - this.totalPrice
        return `还差${diff}元起送`
      } else {
        return `去结算`
      }
    },
    // 结算部分的背景颜色转换
    payClass() {
      if (this.totalPrice < this.minPrice) {
        return 'not-enough'
      } else {
        return `enough`
      }
    },
    // 购物车列表是否展开
    listShow() {
      if (!this.totalCount) {
        // 选中的商品数量为0时不展开
        this.fold = true
        return false
      } else {
        let show = !this.fold
        // 使用BScroll时，点击+按钮不是+1（bug）
        // if (show) {
        //   this.$nextTick(() => {
        //     if (!this.scrll) {
        //       this.scroll = new BScroll(this.$refs.content, {
        //         click: true
        //       })
        //     }
        //     this.scroll.refresh()
        //   })
        // }
        return show
      }
    }
  },
  methods: {
    // 购物车列表展开/折叠
    toggleList() {
      if (!this.totalCount) {
        this.fold = true
      } else {
        this.fold = !this.fold
      }
    },
    // 清空购物车
    empty() {
      this.selectFoods.forEach((food) => {
        food.count = 0
      })
    }
  }
}
</script>
<style lang="scss">
@import "../../../static/sass/index.scss";

.shopcart {
    width: 100%;
    height: 53px;
    background-color: #141d27;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 100;
    .content {
        display: flex;
        width: 100%;
        height: 100%;
        // 定位是为了使用z-index,防止被后面的背景挡住
        position: relative;
        z-index: 101;
        .content-left {
            flex: 1;
            height: 100%;
            font-size: 0;
            .logo-wrapper {
                position: relative;
                display: inline-block;
                width: 80px;
                height: 100%;
                // background-color: pink;
                .logo {
                    width: 44px;
                    height: 44px;
                    line-height: 44px;
                    text-align: center;
                    border: 6px solid #141d27;
                    border-radius: 50%;
                    position: absolute;
                    left: 12px;
                    bottom: 3px;
                    z-index: 101;
                    background-color: #2b343c;
                    &.height-light {
                        background-color: rgb(0,160,220);
                        .icon {
                            color: #fff;
                        }
                    }
                    .icon {
                        font-size: 24px;
                        color: rgba(255,255,255,.4);
                    }
                }
                .num {
                    display: inline-block;
                    position: absolute;
                    z-index: 102;
                    left: 44px;
                    top: -8px;
                    width: auto;
                    height: 16px;
                    line-height: 20px;
                    text-align: center;
                    padding: 0 6px;
                    border-radius: 16px;
                    font-size: 9px;
                    font-weight: 700;
                    background-color: #f01414;
                    color: #fff;
                    box-shadow: 0 4px 8px 0 rgba(0,0,0,.4);
                }
            }
            .price {
                display: inline-block;
                width: auto;
                height: 100%;
                vertical-align: top;
                box-sizing: border-box;
                padding: 12px 0;
                .text {
                    font-size: 16px;
                    line-height: 30px;
                    font-weight: 700;
                    color: rgba(255,255,255,.4);
                    padding-right: 12px;
                    border-right: 1px solid rgba(255,255,255,.1);
                    &.height-light {
                        color: #fff;
                    }
                }
            }
            .desc {
                display: inline-block;
                vertical-align: top;
                width: auto;
                height: 100%;
                box-sizing: border-box;
                padding: 12px 0;
                // background-color: skyblue;
                .text {
                    font-size: 16px;
                    line-height: 30px;
                    color: rgba(255,255,255,.4);
                    padding-left: 12px;
                }
            }
        }
        .content-right {
            flex: 0 0 105px;
            width: 105px;
            height: 100%;
            // background-color: pink;
            .pay {
                width: 100%;
                height: 100%;
                font-size: 16px;
                line-height: 53px;
                text-align: center;
                font-weight: 700;
                color: rgba(255,255,255,.4);
                background-color: #2b343c;
                &.not-enough {
                    background-color: #2b343c;
                }
                &.enough {
                    color: #fff;
                    background-color: #007c2f;
                }
            }
        }
    }

    .shopcartList {
        box-sizing: border-box;
        width: 100%;
        height: auto;
        position: absolute;
        bottom: 53px;
        left: 0;
        z-index: 100;
        .list-header {
            box-sizing: border-box;
            width: 100%;
            height: 40px;
            background-color: #f3f5f7;
            padding: 0 18px;
            @include border-1px(rgba(7,17,27,.1));
            .title {
                width: auto;
                height: 100%;
                float: left;
                font-size: 14px;
                font-weight: 200;
                color: rgb(7,17,27);
                line-height: 40px;
            }
            .empty {
                width: auto;
                height: 100%;
                float: right;
                font-size: 12px;
                line-height: 40px;
                color: rgb(0,160,220);
            }
        }
        .list-content {
            background-color: #fff;
            box-sizing: border-box;
            padding: 0 18px;
            max-height: 217px;
            overflow: auto;
            .food {
                box-sizing: border-box;
                height: 48px;
                padding: 12px 0;
                font-size: 14px;
                color: rgb(7,17,27);
                line-height: 24px;
                @include border-1px(rgba(7,17,27,.1));
                &:last-child {
                    @include border-none;
                }
                .name {
                    display: inline-block;
                }
                .price {
                    display: inline-block;
                    font-weight: 700;
                    color: rgb(240,20,20);
                    float: right;
                    margin-left: 18px;
                    margin-right: 12px;
                    .icon {
                        font-size: 10px;
                        font-weight: normal;
                    }
                }
                .cartcontrol-wrapper {
                    display: inline-block;
                    height: 24px;
                    width: auto;
                    line-height: 24px;
                    float: right;
                    .cartcontrol {
                        position: static;
                    }
                }
            }
        }
    }
}
// 阴影背景过渡效果
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(7,17,27,.7);
}
.mask-enter-active,.mask-leave-active {
  transition: all .4s;
}
.mask-enter,.mask-leave-to {
  opacity: 0;
  z-index: -1;
}
.mask-enter-to,.mask-leave {
  opacity: 1;
  z-index: 90;
}
</style>
