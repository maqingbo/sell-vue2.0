<template>
<div class="ratings" ref="ratings">
  <!-- 需要使用bScroll -->
  <div class="ratings-content">

    <!-- 第一部分 -->
    <div class="overview">
      <!-- 综合得分 -->
      <div class="overview-left">
        <div class="score">{{seller.score}}</div>
        <p>综合评分</p>
        <div class="rank-rate">高于周边商家 {{seller.rankRate}}%</div>
      </div>
      <!-- 服务态度、商品评价 -->
      <div class="overview-right">
        <div class="block servicescore">
          <span class="title">服务态度</span>
          <span class="star"><star :size="36" :score="seller.serviceScore"></star></span>
          <span class="score">{{seller.serviceScore}}</span>
        </div>
        <div class="block foodscore">
          <span class="title">商品评价</span>
          <span class="star"><star :size="36" :score="seller.foodScore"></star></span>
          <span class="score">{{seller.foodScore}}</span>
        </div>
        <div class="block deliverytime">
          <span class="title">送达时间</span>
          <span class="time">{{seller.deliveryTime}} 分钟</span>
        </div>
      </div>
    </div>

    <split></split>

    <!-- 第二部分 -->
    <div class="seller-rating">
      <!-- ratingselect 子组件 -->
      <ratingselect @select="selectRating" @toggle="toggleContent" :ratings="ratings" :select-type="selectType" :only-text="onlyText" :desc="desc"></ratingselect>
      <!-- 评论列表 -->
      <ul class="rating-wrapper">
        <li v-for="rating in ratings" v-show="needShow(rating.rateType, rating.text)" class="rating-item">
          <div class="avatar">
            <img :src="rating.avatar" alt="用户头像">
          </div>
          <div class="username">{{rating.username}}</div>
          <div class="rate-time">{{rating.rateTime | formatDate}}</div>
          <div class="star-wrapper">
            <span><star :size="24" :score="rating.score"></star></span>
            <span v-if="rating.deliveryTime" class="delivery-time">{{rating.deliveryTime}} 分钟送达</span>
          </div>
          <div v-if="rating.text" class="rating-text">{{rating.text}}</div>
          <div class="recommend-wrapper">
            <!-- 好评/差评 -->
            <span v-show="rating.rateType === 0" class="icon" :class="{'good': rating.rateType === 0, 'bad': rating.rateType === 1}">(^o^)</span>
            <span v-show="rating.rateType === 1" class="icon" :class="{'good': rating.rateType === 0, 'bad': rating.rateType === 1}">⊙︿⊙</span>
            <span v-for="item in rating.recommend" class="recomend">{{item}}</span>
          </div>
        </li>
      </ul>
    </div>

  </div>
</div>
</template>

<script>
import star from '../star/star'
import split from '../split/split'
import ratingselect from '../ratingselect/ratingselect'
import BScroll from 'better-scroll'
import {
  formatDate
} from '../../../static/js/date.js'

// const ERR_OK = 0
const ALL = 2

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      ratings: [],
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
  filters: {
    formatDate(time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  components: {
    'star': star,
    'split': split,
    'ratingselect': ratingselect,
    'BScroll': BScroll
  },
  created() {
    // 获取数据
    // this.$http.get('/api/ratings').then(response => {
    //   response = response.body
    //   // console.log(response)
    //   if (response.errno === ERR_OK) {
    //     this.ratings = response.data
    //     // console.log(this.ratings)
    //     this.$nextTick(() => {
    //       this._initScroll()
    //     })
    //   }
    // })

    // 七牛云存储 data.json
    this.$http.get('http://oq6glhzmw.bkt.clouddn.com/data.json').then(response => {
      // console.log(response.body.ratings)
      if (response.status === 200) {
        this.ratings = response.body.ratings
        // console.log(this.ratings)
        this.$nextTick(() => {
          this._initScroll()
        })
      }
    })
  },
  methods: {
    // BScroll初始化函数
    _initScroll() {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.ratings, {
          click: true
        })
      } else {
        this.scroll.refresh()
      }
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
      // 刷新BScroll
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
  }
}
</script>
<style lang="scss">
@import "../../../static/sass/index.scss";

.ratings {
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    // 第一部分
    .overview {
        display: flex;
        padding: 18px 0;
        width: 100%;
        box-sizing: border-box;
        @include border-1px(#e6e7e8);
        // 综合得分
        .overview-left {
            width: 130px;
            text-align: center;
            // background-color: pink;
            border-right: 1px solid #e6e7e8;
            // @media
            .score {
                font-size: 24px;
                color: rgb(255,153,0);
                line-height: 28px;
                margin-bottom: 6px;
            }
            p {
                font-size: 12px;
                line-height: 18px;
                color: rgb(7,17,27);
                margin-bottom: 8px;
            }
            .rank-rate {
                font-size: 10px;
                line-height: 10px;
                color: #93999f;
                margin-bottom: 6px;
            }
        }
        // 服务态度、商品评价
        .overview-right {
            flex: 1;
            padding: 0 20px;
            .block {
                .title {
                    font-size: 12px;
                    line-height: 18px;
                    color: rgb(7,17,27);
                    margin-right: 6px;
                }
                > span {
                    display: inline-block;
                    vertical-align: middle;
                }
                .score {
                    // margin-left: 6px;
                    font-size: 12px;
                    color: rgb(255,153,0);
                    line-height: 18px;
                }
            }

            .servicescore {
                margin-top: 2px;
                margin-bottom: 8px;
            }
            .foodscore {
                margin-bottom: 8px;
            }
            .deliverytime {
                .time {
                    color: rgb(147,153,159);
                }
            }

        }
    }

    // 第二部分
    .seller-rating {
        .rating-wrapper {
            padding: 0 18px;
            .rating-item {
                padding: 18px 0 18px 40px;
                position: relative;
                // 公共样式
                font-size: 10px;
                line-height: 12px;
                color: rgb(7,17,27);
                @include border-1px(#e6e7e8);
                .avatar {
                    position: absolute;
                    top: 18px;
                    left: 0;
                    width: 28px;
                    height: 28px;
                    border-radius: 50%;
                    overflow: hidden;
                    img {
                        width: 100%;
                    }
                }
                .username {
                    color: rgb(7,17,27);
                }
                .rate-time {
                    font-weight: 200;
                    color: rgb(147,153,159);
                    position: absolute;
                    top: 18px;
                    right: 0;
                }
                .star-wrapper {
                    margin-top: 6px;
                    > span {
                        display: inline-block;
                        vertical-align: top;
                    }
                    .delivery-time {
                        font-size: 10px;
                        line-height: 12px;
                        font-weight: 200;
                        color: rgb(147,153,159);
                    }
                }
                .rating-text {
                    font-size: 12px;
                    line-height: 18px;
                    margin-top: 6px;
                }
                .recommend-wrapper {
                    margin-top: 6px;
                    .icon {
                        display: inline-block;
                        font-size: 12px;
                        line-height: 18px;
                        vertical-align: top;
                        font-weight: 400;
                        margin-right: 8px;
                        &.good {
                            color: #00a0dc;
                        }
                        &.bad {
                            color: rgb(147,153,159);
                        }
                    }
                    .recomend {
                        display: inline-block;
                        font-size: 9px;
                        color: rgb(147,153,159);
                        line-height: 16px;
                        border: 1px solid rgb(147,153,159);
                        border-radius: 2px;
                        padding: 0 6px;
                        margin-right: 8px;
                        margin-top: 2px;
                        max-width: 60px;
                        text-overflow: ellipsis;
                        /*省略号*/
                        overflow: hidden;
                        /*设置超过的隐藏*/
                        white-space: nowrap;
                        /*设置不折行*/
                    }
                }
            }
        }
    }

}
</style>
