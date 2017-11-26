<template>
<transition-group name="slide">
  <div v-show="showFood" class="selectde-food" key="food" ref="food">
    <!-- food-content盒子是为了能使用BScroll插件 -->
    <div class="food-content">
      <!-- 商品名字和图片部分 -->
      <div class="detail">
        <div class="img">
          <img :src="food.image">
          <div class="back" @click="hide">
            <span class="icon icon-arrow_lift"></span>
          </div>
        </div>
        <div class="text">
          <h2 class="name">{{food.name}}</h2>
          <!-- 月售、好评率 -->
          <div class="count">
            <div class="sell-count">月售{{food.sellCount}}份</div>
            <div class="rating">好评率{{food.rating}}%</div>
          </div>
          <!-- 价格 -->
          <div class="price-wrapper">
            <div class="price">￥<span class="price-text">{{food.price}}</span></div>
            <div class="old-price">￥<span class="oldprice-text">{{food.oldPrice}}</span></div>
          </div>
          <!-- 加减按钮，cartcontrol 子组件 -->
          <div class="cartcontrol-wrapper">
            <cartcontrol :food="food" v-show="food.count"></cartcontrol>
          </div>
          <!-- 加入购物车按钮，有过渡效果 -->
          <transition name="fade">
            <div v-show="!food.count || food.count===0" class="buy" @click="addFirst">
              加入购物车
            </div>
          </transition>
        </div>
      </div>

      <split></split>

      <!-- 商品介绍 -->
      <div class="introduce">
        <h2 class="title">商品介绍</h2>
        <div class="info">{{food.info}}</div>
      </div>

      <split></split>

      <!-- 商品评价 -->
      <div class="food-ratings">
        <h2 class="title">商品评价</h2>
        <!-- ratingselect 子组件 -->
        <ratingselect @select="selectRating" @toggle="toggleContent" :ratings="food.ratings" :select-type="selectType" :only-text="onlyText" :desc="desc"></ratingselect>
        <!-- 评价列表 -->
        <div class="rating-wrapper">
          <!-- 有评价列表时显示ul -->
          <ul v-show="food.ratings && food.ratings.length">
            <li v-show="needShow(rating.rateType, rating.text)" v-for="rating in food.ratings" class="rating-item">
              <div class="user">
                <span class="username">{{rating.username}}</span>
                <span class="avatar">
                  <img :src="rating.avatar">
                </span>
              </div>
              <div class="rate-time">{{rating.rateTime | formatDate}}</div>
              <div class="text">
                <!-- 好评/差评 -->
                <span v-show="rating.rateType === 0" class="icon" :class="{'good': rating.rateType === 0, 'bad': rating.rateType === 1}">(^o^)</span>
                <span v-show="rating.rateType === 1" class="icon" :class="{'good': rating.rateType === 0, 'bad': rating.rateType === 1}">⊙︿⊙</span>
                <span v-for="item in rating.recommend" class="recomend">{{item}}</span>
                <span class="content" v-if="rating.text">{{rating.text}}</span>
              </div>
            </li>
          </ul>
          <!-- 暂无评价 -->
          <div v-show="!food.ratings || !food.ratings.length" class="no-ratings">暂无评价</div>
        </div>
      </div>

    </div>
  </div>
</transition-group>
</template>

<script>
import split from '../split/split'
import cartcontrol from '../cartcontrol/cartcontrol'
import ratingselect from '../ratingselect/ratingselect'
import BScroll from 'better-scroll'
import {formatDate} from '../../../static/js/date.js'
import Vue from 'vue'

// const POSITIVE = 0
// const NEGATIVE = 1
const ALL = 2

export default {
  props: {
    food: {
      type: Object
    }
  },
  data() {
    return {
      showFood: false,
      // 传递给 ratingselect 子组件的数据
      selectType: ALL,
      onlyText: true,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  methods: {
    // food 详情页弹出
    show() {
      this.showFood = true
      // ratingselect 子组件数据初始化
      this.selectType = ALL
      this.onlyText = false
      // BScroll设置
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.food, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    // food 详情页收起
    hide() {
      this.showFood = false
    },
    // 加入购物车事件
    addFirst(event) {
      if (!event._constructed) {
        return
      }
      // this.$emit('add', event.target)
      Vue.set(this.food, 'count', 1)
    },
    // 设置rate的类型，子组件触发的事件
    selectRating(type) {
      this.selectType = type
      // 刷新BScroll
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    // 子组件触发的事件
    toggleContent() {
      this.onlyText = !this.onlyText
      // 重新刷新BScroll
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    // 评论列表是否显示的逻辑判断
    needShow(type, text) {
      if (this.onlyText && !text) {
        return false
      }
      if (this.selectType === ALL) {
        return true
      } else {
        return type === this.selectType
      }
    }
  },
  filters: {
    formatDate(time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  components: {
    split,
    ratingselect,
    cartcontrol
  }
}
</script>

<style lang="scss">
@import "../../../static/sass/index.scss";

.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s;
}
.slide-enter,
.slide-leave-to {
    transform: translate3d(100%, 0, 0);
}
.slide-enter-to,
.slide-leave {
    transform: translate3d(0, 0, 0);
}
.selectde-food {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 48px;
    z-index: 30;
    width: 100%;
    background-color: #fff;
    // 详情部分
    .detail {
        @include border-1px(rgba(7,17,27,.1));
        .img {
            width: 100%;
            height: auto;
            max-height: 375px;
            img {
                width: 100%;
            }
            .back {
                width: 30px;
                height: 30px;
                position: fixed;
                top: 10px;
                left: 10px;
                border-radius: 50%;
                overflow: hidden;
                .icon {
                    display: inline-block;
                    width: 30px;
                    height: 30px;
                    line-height: 30px;
                    text-align: center;
                    font-size: 16px;
                    background-color: rgba(7,17,27,.3);
                    color: #fff;
                }
            }
        }
        .text {
            padding: 18px;
            .name {
                font-size: 14px;
                font-weight: 700;
                color: rgb(7,17,27);
                line-height: 14px;
            }
            // 月售、好评率
            .count {
                margin-top: 8px;
                font-size: 10px;
                line-height: 10px;
                color: rgb(147,153,159);
                .sell-count {
                    display: inline-block;
                    margin-right: 12px;
                }
                .rating {
                    display: inline-block;
                }
            }
            // 价格
            .price-wrapper {
                margin-top: 18px;
                font-size: 10px;
                font-weight: normal;
                line-height: 14px;
                .price {
                    display: inline-block;
                    color: rgb(240,20,20);
                    margin-right: 8px;
                    > .price-text {
                        font-size: 14px;
                        font-weight: 700;
                    }
                }
                .old-price {
                    display: inline-block;
                    color: rgb(147,153,159);
                    text-decoration: line-through;
                    > .oldprice-text {
                        font-weight: 700;
                    }
                }
            }
            // 加入购物车，按钮
            .buy {
              position: absolute;
              right: 18px;
              bottom: 16px;
              padding: 6px 12px;
              background-color: rgb(0,160,220);
              color: #fff;
              border-radius: 12px;
              &.fade-enter-active, &.fade-leave-active {
                transition: all 0.2s;
              }
              &.fade-enter, &.fade-leave-active {
                opacity: 0;
                z-index: -1;
              }
            }
            // 加减按钮
            .cartcontrol-wrapper {
              position: absolute;
              right: 18px;
              bottom: 16px;
            }
        }
    }
    // 商品介绍
    .introduce {
        padding: 18px;
        @include border-1px(rgba(7,17,27,.1));
        .title {
            font-size: 14px;
            line-height: 14px;
            color: rgb(7,17,27);
        }
        .info {
            padding: 0 8px;
            margin-top: 6px;
            font-size: 12px;
            line-height: 18px;
            font-weight: 200;
            color: rgb(77,85,93);
        }
    }
    // 商品评价
    .food-ratings {
        // padding: 18px;
        // @include border-1px(rgba(7,17,27,.1));
        .title {
            font-size: 14px;
            line-height: 14px;
            color: rgb(7,17,27);
            padding: 18px 18px 0 18px;
        }
        .rating-wrapper {
          padding: 0 18px;
          .rating-item {
            padding: 16px 0;
            position: relative;
            .user {
              position: absolute;
              top: 16px;
              right: 0;
              .username {
                display: inline-block;
                font-size: 10px;
                color: #b7bbbf;
                line-height: 12px;
                margin-right: 6px;
                vertical-align: top;
              }
              .avatar {
                display: inline-block;
                width: 12px;
                height: 12px;
                border-radius: 50%;
                overflow: hidden;
                img {
                  width: 100%;
                  height: 100%;
                }
              }
            }
            .rate-time {
              font-size: 10px;
              color: #b7bbbf;
              line-height: 12px;
            }
            .text {
              font-size: 12px;
              line-height: 16px;
              color: #07111b;
              margin-top: 6px;
              .icon {
                font-size: 12px;
                font-weight: 400;
                margin-right: 4px;
                &.good {
                  color: #00a0dc;
                }
                &.bad {
                  color: rgb(147,153,159);
                }
              }
            }
          }
          // 暂无评价
          .no-ratings {
            padding: 16px 0;
            font-size: 12px;
            color: rgb(147,153,159);
          }
        }
    }
}
</style>
