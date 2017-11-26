<template>
  <div class="seller" ref="sellerw">
    <div class="seller-content">
      <!-- 第一部分 -->
      <div class="base-info">
        <div class="name-wrapper">
          <div class="name">{{seller.name}}</div>
          <div class="star-wrapper">
            <span><star :size="36" :score="seller.score"></star></span>
            <span class="sellcount">月售{{seller.sellCount}}单</span>
          </div>
          <div class="favourite" @click="favouriteToggle">
            <span class="icon icon-favorite" :class="{'active': favourite}"></span>
            <span class="text">{{favouriteText}}</span>
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

      <split></split>

      <!-- 第三部分/商家实景 -->
      <div class="seller-pics">
        <h2 class="title">商家实景</h2>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li v-for="pic in seller.pics" class="pic">
              <img :src="pic" alt="pic">
            </li>
          </ul>
        </div>
      </div>

      <split></split>

      <!-- 第四部分/商家信息 -->
      <div class="infos">
        <h2 class="title">商家信息</h2>
        <ul class="info-wrapper">
          <li v-for="info in seller.infos" class="info">{{info}}</li>
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
  data() {
    return {
      favourite: false
    }
  },
  computed: {
    favouriteText() {
      return this.favourite ? '已收藏' : '收藏'
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  watch: {
    seller: function() {
      this.$nextTick(() => {
        this._initScroll()
        this._initPics()
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      this._initScroll()
      this._initPics()
    })
  },
  methods: {
    // BScroll初始化函数
    _initScroll() {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.sellerw, {
          click: true
        })
      } else {
        this.scroll.refresh()
      }
    },
    // 商家实景/图片
    _initPics() {
      if (this.seller.pics) {
        let picWidth = 120
        let picMargin = 6
        let width = (picWidth + picMargin) * (this.seller.pics.length - 1)
        this.$refs.picList.style.width = width + 'px'
        this.$nextTick(() => {
          if (!this.picScroll) {
            this.picScroll = new BScroll(this.$refs.picWrapper, {
              scrollX: true,
              eventPassthrouth: 'vertical'
            })
          } else {
            this.picScroll.refresh()
          }
        })
      }
    },
    favouriteToggle(event) {
      if (!event._constructed) {
        return
      }
      console.log(111)
      this.favourite = !this.favourite
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
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
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
            width: 36px;
            height: auto;
            text-align: center;
          }
          .icon {
            font-size: 24px;
            line-height: 24px;
            color: #d4d6d9;
            &.active {
              color: rgb(240,20,20);
            }
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
      box-sizing: border-box;
      padding: 18px;
      padding-bottom: 0;
      @include border-1px(#e6e7e8);
      .title {
        font-size: 14px;
        line-height: 14px;
        color: rgb(7,17,27);
        margin-bottom: 8px;
      }
      // 公告
      .bulletin {
        font-size: 12px;
        line-height: 24px;
        color: rgb(240,20,20);
        font-weight: 200;
        text-align: justify;
        padding-bottom: 16px;
        @include border-1px(#e6e7e8);
      }
      // 活动
      .supports {
        .support-item {
          width: 100%;
          height: auto;
          box-sizing: border-box;
          padding: 16px 12px;
          padding-left: 34px;
          position: relative;
          @include border-1px(#e6e7e8);
          &:last-child {
            @include border-none;
          }
          .icon {
            display: inline-block;
            position: absolute;
            top: 16px;
            left: 12px;
            width: 16px;
            height: 16px;
            border-radius: 2px;
            margin-right: 6px;
            // background-color: pink;
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

    // 商家实景
    .seller-pics {
      padding: 18px;
      padding-right: 0;
      @include border-1px(#e6e7e8);
      .title {
        font-size: 14px;
        line-height: 14px;
        color: rgb(7,17,27);
        margin-bottom: 8px;
      }
      .pic-wrapper {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        .pic-list {
          font-size: 0;
          .pic {
            display: inline-block;
            margin-right: 6px;
            &:last-child {
              margin-right: 0;
            }
            img {
              height: 90px;
              width: auto;
            }
          }
        }
      }
    }

    // 商家信息
    .infos {
      padding: 18px;
      padding-bottom: 0;
      .title {
        font-size: 14px;
        line-height: 14px;
        color: rgb(7,17,27);
        padding-bottom: 12px;
        @include border-1px(#e6e7e8);
      }
      .info-wrapper {
        .info {
          box-sizing: border-box;
          width: 100%;
          height: auto;
          padding: 16px 12px;
          font-size: 12px;
          font-weight: 200;
          color: rgb(7,17,27);
          line-height: 16px;
          @include border-1px(#e6e7e8);
          &:last-child {
            @include border-none;
          }
        }
      }
    }
  }
</style>
