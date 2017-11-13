<template>
  <div class="ratingselect">
    <!-- 评价类型选择按钮 -->
    <div class="rating-type">
      <span @click="slect(2, $event)" class="all" :class="{'active':selectType === 2}">
        {{desc.all}}
        <span class="num">{{ratings.length}}</span>
      </span>
      <span @click="slect(0, $event)" class="positive" :class="{'active':selectType === 0}">
        {{desc.positive}}
        <span class="num">{{positives.length}}</span>
      </span>
      <span @click="slect(1, $event)" class="negative" :class="{'active':selectType === 1}">
        {{desc.negative}}
        <span class="num">{{negatives.length}}</span>
      </span>
    </div>

    <!-- 只看有内容的评价 -->
    <div @click="toggleContent" class="switch" :class="{'on':onlyText}">
      <span class="icon">√</span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2

export default {
  props: {
    ratings: {
      type: Array,
      default() {
        return []
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    onlyText: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default() {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    }
  },
  computed: {
    positives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITIVE
      })
    },
    negatives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE
      })
    }
  },
  methods: {
    slect(type, event) {
      if (!event._constructed) {
        return
      }
      // this.selectType = type
      this.$emit('select', type)
    },
    toggleContent(event) {
      if (!event._constructed) {
        return
      }
      this.$emit('toggle')
    }
  }
}
</script>

<style lang="scss">
@import "../../../static/sass/index.scss";

  .ratingselect {
    // background-color: pink;
    margin-top: 12px;
    padding: 0 18px;
    border-bottom: 1px solid rgba(7,17,27,.1);
    .rating-type {
      padding-bottom: 12px;
      @include border-1px(rgba(7,17,27,.1));
      // 三个方块的公共样式
      .all, .positive, .negative {
        height: 16px;
        width: auto;
        display: inline-block;
        padding: 4px 8px;
        font-size: 12px;
        line-height: 16px;
        color: #4d555d;
        border-radius: 2px;
        margin-right: 8px;
        .num {
          font-size: 8px;
        }
        &.active {
          color: #fff;
        }
      }
      .all {
        background-color: rgba(0,160,220,.2);
        &.active {
          background-color: rgb(0,160,220);
        }
      }
      .positive {
        background-color: rgba(0,160,220,.2);
        &.active {
          background-color: rgb(0,160,220);
        }
      }
      .negative {
        background-color: rgba(77,85,93,.2);
        &.active {
          background-color: rgb(77,85,93);
        }
      }
    }
    // 只看有内容的评价
    .switch {
      padding: 12px 0;
      font-size: 12px;
      color: #b7bbbf;
      line-height: 14px;
      // @include border-1px(rgba(7,17,27,.1));
      &.on {
        .icon {
          background-color: #00955b;
        }
        .text {
          color: #4d555d;
        }
      }
      .icon {
        display: inline-block;
        vertical-align: middle;
        font-size: 10px;
        width: 14px;
        height: 14px;
        line-height: 14px;
        text-align: center;
        border-radius: 50%;
        background-color: #b7bbbf;
        color: #fff;
      }
      .text {
        display: inline-block;
      }
    }
  }
</style>
