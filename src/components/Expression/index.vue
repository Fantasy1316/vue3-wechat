<template>
  <transition name="fade">
    <div class="expression" v-show="expressionShow" @click.stop>
      <div class="expression-content">
        <div
          class="expression-content--item"
          :class="{ 'expression-content--item_active': currentType === 1 }"
        >
          <expression-emoji :currentIndex="emojiIndex" />
          <expression-meme :currentIndex="memeIndex" />
        </div>
      </div>
      <div class="expression-indicator">
        <i
          class="iconfont icon-yuandianxiao"
          :class="{ 'iconfont-active': indicatorCurrent === item }"
          v-for="item in 2"
          :key="item"
          @click="hadnleChangeExpressionIndex(item)"
        ></i>
      </div>
      <div class="expression-types">
        <div
          class="types-item"
          :class="{ 'types-item--active': currentType === index }"
          v-for="(item, index) in types"
          :key="index"
          @click.stop="handleChangeType(index)"
        >
          <i class="iconfont" :class="item"></i>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { computed, reactive, toRefs } from 'vue'
import ExpressionEmoji from './expression-emoji'
import ExpressionMeme from './expression-meme'
export default {
  name: 'Expression',
  components: {
    ExpressionEmoji,
    ExpressionMeme,
  },
  props: {
    expressionShow: Boolean,
  },
  setup() {
    const state = reactive({
      emojiIndex: 0,
      memeIndex: 0,
      currentType: 0,
      types: ['icon-biaoqing', 'icon-aixin'],
    })

    const handleChangeType = (index) => {
      state.currentType = index

      state.emojiIndex = 0
      state.memeIndex = 0
    }

    const hadnleChangeExpressionIndex = (index) => {
      if (state.currentType === 0) {
        state.emojiIndex = index - 1
      } else {
        state.memeIndex = index - 1
      }
    }

    const indicatorCurrent = computed(() => {
      if (state.currentType === 0) {
        return state.emojiIndex + 1
      } else {
        return state.memeIndex + 1
      }
    })

    return {
      ...toRefs(state),
      handleChangeType,
      hadnleChangeExpressionIndex,
      indicatorCurrent,
    }
  },
}
</script>

<style lang="scss" scoped>
.expression {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: -448px;
  left: -190px;
  width: 402px;
  height: 434px;
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 5px;
  box-shadow: 0 0 8px 3px #d1d1d1;

  &-content {
    overflow: hidden;

    &--item {
      display: flex;
      flex: 1;
      width: 200%;
      transition: all 0.4s ease;

      &_active {
        transform: translateX(-50%);
      }
    }
  }

  &-indicator {
    text-align: center;

    .iconfont {
      font-size: 20px;
      color: #e5e5e5;

      &-active {
        color: #b2b2b2;
      }
    }
  }

  &-types {
    display: flex;
    align-items: center;
    position: relative;
    height: 42px;
    padding: 4px 10px;
    border-top: 1px solid #ebebeb;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 174px;
      width: 52px;
      height: 16px;
      background-color: #fff;
    }

    &::before {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 192px;
      width: 16px;
      height: 16px;
      background-color: #fff;
      transform: rotate(45deg);
      box-shadow: 0 0 6px 3px #d1d1d1;
    }

    .types-item {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      width: 37px;
      height: 34px;
      margin-right: 10px;
      border-radius: 4px;
      z-index: 1;

      &--active {
        background-color: #e7e7e7;
      }

      .iconfont {
        font-size: 20px;
      }

      .icon-aixin {
        font-size: 22px;
      }
    }
  }
}
</style>
