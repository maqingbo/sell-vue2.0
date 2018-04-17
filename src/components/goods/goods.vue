<template lang="html">
  <div class="goods">
    <!-- 左侧目录 -->
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li class="menu-item" v-for="item in goods">
          <span class="text">
            <span v-if="item.type > 0" class="icon" :class="classMap[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>

    <!-- 右侧商品列表 -->
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="foods">
          <div class="text">{{item.name}}</div>
          <ul class="food-list">
            <li @click="selectFood(food, $event)" v-for="(food,key) in item.foods" :key="food.key" class="food">
              <div class="img"><img :src="food.image"></div>
              <div class="detail">
                <div class="name">{{food.name}}</div>
                <div v-if="food.description" class="description">{{food.description}}</div>
                <div class="sell-count-wrapper">
                  <span v-if="food.sellCount" class="sell-count">月售{{food.sellCount}}份</span>
                  <span v-if="food.rating" class="rating">好评率{{food.rating}}%</span>
                </div>
                <div class="money">
                  <span class="price">
                    <span class="icon">￥</span>{{food.price}}
                  </span>
                  <span v-if="food.oldPrice" class="old-price">
                    <span class="icon">￥</span>{{food.oldPrice}}
                  </span>
                </div>
                <cartcontrol :food="food"></cartcontrol>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <!-- 购物车组件 -->
    <shopcart :select-foods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>

    <!-- food详情页，子组件 -->
    <food :food="selectedFood" ref="food"></food>
  </div>
</template>

<script>
import shopcart from '../shopcart/shopcart'
import cartcontrol from '../cartcontrol/cartcontrol'
import food from '../food/food'
import BScroll from 'better-scroll'

// const ERR_OK = 0

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: [],
      selectedFood: {}
    }
  },
  components: {
    'shopcart': shopcart,
    'cartcontrol': cartcontrol,
    'food': food
  },
  computed: {
    selectFoods() {
      let foods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  created() {
    // 获取数据
    // 七牛云存储 data.json
    this.$http.get('http://oq6glhzmw.bkt.clouddn.com/data.json').then(response => {
      // console.log(response.body.goods)
      if (response.status === 200) {
        this.goods = response.body.goods
        // console.log(this.goods)
        this.$nextTick(() => {
          this._initBScroll()
        })
      }
    })

    // 小图标class
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  methods: {
    // 将BScroll初始化写成一个方法
    _initBScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {click: true})
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {click: true})
    },
    // 打开所选 food 的详情页
    selectFood(food, event) {
      this.selectedFood = food
      this.$refs.food.show()
    }
  }
}
</script>

<style lang="scss">
@import "~@/common/sass/index.scss";

.goods {
    display: flex;
    position: absolute;
    top: 173px;
    left: 0;
    bottom: 46px;
    overflow: hidden;
    width: 100%;

    .menu-wrapper {
        flex: 0 0 80px;
        width: 80px;
        height: 100%;
        background-color: #f3f5f7;
        .menu-item {
            display: table;
            box-sizing: border-box;
            width: 80px;
            height: 54px;
            padding: 0 12px;
            &.current {
                background-color: #fff;
                .text {
                    font-weight: bold;
                    @include border-none;
                }
            }
            .text {
                display: table-cell;
                vertical-align: middle;
                font-size: 12px;
                line-height: 14px;
                color: #07111b;
                @include border-1px(rgba(7,17,27,.1));
                .icon {
                    display: inline-block;
                    width: 12px;
                    height: 12px;
                    background-color: skyblue;
                    vertical-align: top;
                    @include icon-map(12px);
                }
            }
        }
    }

    .foods-wrapper {
        flex: 1;
        height: 100%;
        // background-color: skyblue;
        .foods {
            .text {
                width: 100%;
                height: 26px;
                line-height: 26px;
                padding-left: 14px;
                font-size: 12px;
                color: #93999f;
                background-color: #f3f5f7;
                border-left: 2px solid #d9dde1;
                // margin-bottom: 10px;
            }
            .food-list {
                // width: 100%;
                height: auto;
                padding: 0 18px;
                .food {
                    padding: 18px 0;
                    position: relative;
                    @include border-1px(rgba(7,17,27,.1));
                    &:last-child {
                        @include border-none;
                    }
                    .img {
                        position: absolute;
                        top: 18px;
                        left: 0;
                        width: 57px;
                        max-height: 57px;
                        overflow: hidden;
                        img {
                            width: 57px;
                            height: auto;
                        }
                    }
                    .detail {
                        width: 100%;
                        height: auto;
                        min-height: 57px;
                        box-sizing: border-box;
                        padding-left: 67px;
                        position: relative;
                        // background-color: skyblue;
                        .name {
                            font-size: 14px;
                            line-height: 14px;
                            color: rgb(7,17,27);
                            // margin-top: 4px;
                        }
                        .description,
                        .sell-count-wrapper {
                            font-size: 10px;
                            line-height: 12px;
                            color: rgb(147,153,159);
                            margin-top: 8px;
                            overflow: hidden;
                        }
                        .description {
                            line-height: 12px;
                        }
                        .sell-count-wrapper {
                            .sell-count {
                                margin-right: 12px;
                                vertical-align: top;
                            }
                        }
                        .money {
                            margin-top: 4px;
                            .price {
                                display: inline-block;
                                font-size: 14px;
                                line-height: 24px;
                                color: #f01414;
                                font-weight: 700;
                                margin-right: 8px;
                                vertical-align: baseline;
                                .icon {
                                    font-size: 10px;
                                    line-height: 24px;
                                    font-weight: normal;
                                    vertical-align: baseline;
                                }
                            }
                            .old-price {
                                font-size: 10px;
                                line-height: 22px;
                                color: rgb(147,153,159);
                                font-weight: normal;
                                text-decoration: line-through;
                                .icon {
                                    vertical-align: middle;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
