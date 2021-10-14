<template>
  <transition name="fade">
    <div class="expression" v-show="expressionShow">
      <div class="expression-content">
        <expression-emoji />
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
import { reactive, toRefs } from 'vue'
import ExpressionEmoji from './expression-emoji'
export default {
  name: 'Expression',
  components: {
    ExpressionEmoji,
  },
  props: {
    expressionShow: Boolean,
  },
  setup(props) {
    console.log(props)
    const state = reactive({
      currentType: 0,
      types: ['icon-biaoqing', 'icon-aixin'],
    })

    const handleChangeType = (index) => {
      state.currentType = index

      console.log(props)
    }

    return {
      ...toRefs(state),
      handleChangeType,
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
    flex: 1;
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
