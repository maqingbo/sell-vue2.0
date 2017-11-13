<template>
  <div class="seller" ref="seller">
    <div class="sell-content">
      <!-- 第一部分 -->
      <div class="base-info">
        <div class="name-wrapper">
          <div class="name">{{seller.name}}</div>
          <div class="star-wrapper">
            <span><star :size="36" :score="seller.score"></star></span>
            <span class="sellcount">月售{{seller.sellCount}}单</span>
          </div>
          <div class="favourite">
            <span class="icon">▽</span>
            <span class="text">收藏</span>
          </div>
        </div>
        <div class="minprice-wrapper">
          <div class="priceitem minprice">
            <p class="title">起送价</p>
            <span>{{seller.minPrice}}<span class="unit">元</span></span>
          </div>
          <div class="priceitem deliveryprice">
            <p class="title">商家配送</p>
            <span>{{seller.deliveryPrice}}<span class="unit">元</span></span>
          </div>
          <div class="priceitem deliverytime">
            <p class="title">平均配送时间</p>
            <span>{{seller.deliveryTime}}<span class="unit">分钟</span></span>
          </div>
        </div>
      </div>

      <split></split>

      <!-- 第二部分 -->
      <div class="bulletin-wrapper">
        <h2 class="title">公告与活动</h2>
        <div class="bulletin">{{seller.bulletin}}</div>

        <ul v-if="seller.supports" class="supports">
          <li class="support-item" v-for="(item,index) in seller.supports">
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <div class="text">{{seller.supports[index].description}}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import star from '../star/star'
import split from '../split/split'
import BScroll from 'better-scroll'

export default {
  props: {
    seller: {
      type: Object
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  watch: {
    'seller'() {
      this.$nextTick(() => {
        this._initScroll()
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      this._initScroll()
      // this._initPics()
    })
  },
  methods: {
    // BScroll初始化函数
    _initScroll() {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.seller, {
          click: true
        })
      } else {
        this.scroll.refresh()
      }
    }
  },
  components: {
    'star': star,
    'split': split
  }
}
</script>

<style lang="scss">
@import "../../../static/sass/index.scss";

  .seller {
    .base-info {
      padding: 0 18px;
      @include border-1px(#e6e7e8);
      position: relative;
      .name-wrapper {
        padding: 18px 0;
        @include border-1px(#e6e7e8);
        .name {
          font-size: 14px;
          line-height: 14px;
          color: rgb(7,17,27);
          margin-bottom: 8px;
        }
        .star-wrapper {
          > span {
            display: inline-block;
            vertical-align: middle;
          }
          .sellcount {
            margin-left: 12px;
            font-size: 10px;
            line-height: 18px;
            color: rgb(77,85,93);
          }
        }
        .favourite {
          position: absolute;
          top: 18px;
          right: 0;
          > span {
            display: block;
            text-align: center;
          }
          .icon {
            font-size: 24px;
            line-height: 24px;
            color: rgb(240,20,20);
          }
          .text {
            font-size: 10px;
            line-height: 10px;
            color: rgb(77,85,93);
            margin-top: 2px;
          }
        }
      }
      .minprice-wrapper {
        padding: 18px 0;
        display: flex;
        .priceitem {
          flex: 1;
          text-align: center;
          border-right: 1px solid rgba(7,17,27,.1);
          &:last-child {
            border-right: 0;
          }
          .title {
            font-size: 10px;
            line-height: 10px;
            color: rgb(147,153,159);
            margin-bottom: 4px;
          }
          > span {
            font-size: 24px;
            line-height: 24px;
            font-weight: 200;
            color: rgb(7,17,27);
            .unit {
              font-size: 10px;
            }
          }
        }
      }
    }
    // 公告与活动
    .bulletin-wrapper {
      padding: 18px;
      padding-bottom: 0;
      .title {
        font-size: 14px;
        line-height: 14px;
        color: rgb(7,17,27);
        margin-bottom: 8px;
      }
      .bulletin {
        font-size: 12px;
        line-height: 24px;
        color: rgb(240,20,20);
        font-weight: 200;
        text-align: justify;
        padding-bottom: 16px;
        @include border-1px(#e6e7e8);
      }
      .supports {
        .support-item {
          width: 100%;
          height: auto;
          box-sizing: border-box;
          padding: 16px 12px;
          padding-left: 34px;
          position: relative;
          @include border-1px(#e6e7e8);
          .icon {
            display: inline-block;
            position: absolute;
            top: 16px;
            left: 12px;
            width: 16px;
            height: 16px;
            border-radius: 2px;
            margin-right: 6px;
            background-color: pink;
            vertical-align: top;
            background-repeat: no-repeat;
            background-size: 16px 16px;
            &.decrease {
              @include bg-image("decrease_4");
            }
            &.discount {
              @include bg-image("discount_4");
            }
            &.special {
              @include bg-image("special_4");
            }
            &.invoice {
              @include bg-image("invoice_4");
            }
            &.guarantee {
              @include bg-image("guarantee_4");
            }
          }
          .text {
            font-size: 12px;
            line-height: 16px;
            font-weight: 200;
            color: rgb(7,17,27);
          }
        }
      }
    }
  }
</style>
