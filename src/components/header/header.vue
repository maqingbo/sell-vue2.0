<template lang="html">
  <div class="header">
    <!-- 信息展示 -->
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar" alt="avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}} / {{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
        <div v-if="seller.supports" class="support-count" @click="showDetail">
          <div class="count">{{seller.supports.length}}个</div>
          <i class="icon icon-keyboard_arrow_right"></i>
        </div>
      </div>
    </div>
    <!-- 公告 -->
    <div class="bulletin-wrapper" @click="showDetail">
      <div class="title"></div>
      <div class="text">{{seller.bulletin}}</div>
      <i class="icon icon-keyboard_arrow_right"></i>
    </div>
    <div class="bg">
      <img :src="seller.avatar" alt="背景图">
    </div>
    <!-- 详情弹出层 -->
    <transition tag="div" name="fade">
      <div v-show="detailShow" class="detail clearfix">
        <div class="main">
          <h1 class="name">{{seller.name}}</h1>
          <star :size="48" :score="seller.score"></star>
          <div class="supports">
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul class="content">
              <li class="item" v-for="(item, index) in seller.supports">
                <span class="icon" :class="classMap[item.type]"></span>
                <div class="description">{{item.description}}</div>
              </li>
            </ul>
          </div>
          <div class="bulletin">
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="content">{{seller.bulletin}}</div>
          </div>
        </div>
        <div @click="detailClose" class="close">
          <span class="icon icon-close"></span>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
import star from '../star/star'

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      detailShow: false
    }
  },
  components: {
    'star': star
  },
  methods: {
    showDetail() {
      this.detailShow = true
    },
    detailClose() {
      this.detailShow = false
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  }
}
</script>

<style lang="scss">
@import "../../../static/sass/index.scss";

.header {
    position: relative;
    color: #fff;
    background-color: rgba(7,17,27,.5);
    overflow: hidden;
    .content-wrapper {
        position: relative;
        padding: 24px 24px 18px 24px;
        font-size: 0;
        .avatar {
            position: absolute;
            top: 24px;
            left: 24px;
            img {
                border-right: 4px;
            }
        }
        .content {
            padding-left: 80px;
            .title {
                margin: 2px 0 8px;
                .brand {
                    display: inline-block;
                    width: 30px;
                    height: 18px;
                    margin-right: 6px;
                    background-color: #f01414;
                    vertical-align: top;
                    @include bg-image( 'brand');
                    background-size: 30px 18px;
                    background-repeat: no-repeat;
                }
                .name {
                    font-size: 16px;
                    font-weight: bold;
                    line-height: 18px;
                }
            }
            .description {
                font-size: 12px;
                line-height: 12px;
                font-weight: 200;
                margin-bottom: 10px;
            }
            .supports {
                padding: 0 70px 0 16px;
                position: relative;
                .icon {
                    position: absolute;
                    top: 0;
                    left: 0;
                    @include icon-map(12px);
                }
                .text {
                    font-size: 10px;
                    line-height: 13px;
                    font-weight: 200;
                    @include text-ellipsis;
                }
            }
            .support-count {
                position: absolute;
                bottom: 15px;
                right: 12px;
                padding: 0 8px;
                // max-height: 24px;
                overflow: hidden;
                display: inline-block;
                color: #fff;
                background-color: rgba(0,0,0,.2);
                border-radius: 14px;
                .count, .icon {
                    display: inline-block;
                    width: auto;
                    height: 28px;
                    line-height: 28px;
                    font-size: 14px;
                    font-weight: 200;
                    text-align: center;
                    vertical-align: middle;
                }
                .icon {
                  margin-left: 2px;
                }
            }
        }
    }

    .bulletin-wrapper {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 28px;
        line-height: 28px;
        background-color: transparent;
        padding-left: 38px;
        padding-right: 28px;
        .title {
            position: absolute;
            top: 8px;
            left: 12px;
            width: 22px;
            height: 12px;
            background-color: pink;
            @include bg-image( 'bulletin');
            vertical-align: middle;
            background-repeat: no-repeat;
            background-size: 22px 12px;
            // background-color: pink;
        }
        .text {
            @include text-ellipsis;
            // background-color: red;
        }
        .icon {
            display: inline-block;
            width: 28px;
            height: 28px;
            line-height: 28px;
            font-size: 16px;
            text-align: center;
            position: absolute;
            top: 0;
            right: 0;
            // background-color: pink;
        }
    }

    .bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        filter: blur(10px);
        img {
            width: 100%;
            height: 140%;
        }
    }

    .detail {
        display: flex;
        flex-flow: column;
        min-height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 4100;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(7,17,27,.8);
        .fade-enter-active,
        .fade-leave-active {
            transition: all 1s ease;
        }
        .fade-enter,
        .fade-leave-to {
            opacity: 0;
        }
        // .fade-leave,
        // .fade-enter-to {
        //   opacity: 1;
        // }
        .main {
            flex: 1;
            width: 100%;
            padding: 64px 36px 0;
            box-sizing: border-box;
            // background-color: pink;
            .name {
                font-size: 16px;
                line-height: 16px;
                font-weight: 700;
                text-align: center;
                margin-bottom: 16px;
            }
            .star {
                width: 100%;
                height: 24px;
                // background-color: pink;
                margin-bottom: 28px;
                text-align: center;
            }
            .title {
                display: flex;
                .line {
                    flex: 1;
                    position: relative;
                    bottom: 6px;
                    border-bottom: 1px solid rgba(255,255,255,.2);
                }
                .text {
                    font-size: 14px;
                    font-weight: 700;
                    line-height: 14px;
                    padding: 0 12px;
                }
            }
            .content {
                font-size: 12px;
                font-weight: 200;
                padding: 24px 12px 0;
            }
            .supports {
                margin-bottom: 28px;
                .content {
                    padding: 12px 12px 0;
                    .item {
                        position: relative;
                        padding-left: 22px;
                        margin-top: 12px;
                        .icon {
                            position: absolute;
                            top: -1px;
                            left: 0;
                            @include icon-map($value:16px);
                        }
                        .description {
                            line-height: 14px;
                        }
                    }
                }
            }
            .bulletin {
                .content {
                    line-height: 24px;
                    text-align: justify;
                }
            }
        }
        .close {
            width: 100%;
            height: 32px;
            text-align: center;
            margin: 20px 0;
            .icon {
                width: 32px;
                height: 32px;
                font-size: 32px;
                color: rgba(255,255,255,.5);
                display: inline-block;
            }
        }
    }
}
</style>
