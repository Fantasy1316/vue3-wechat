<template>
  <div class="search">
    <i class="iconfont icon-sousuo_o"></i>
    <input
      type="text"
      class="search-input"
      :class="{ 'search-input--focus': inputFocus }"
      placeholder="搜索"
      @focus="inputFocus = true"
      @blur="inputFocus = false"
    />
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  name: 'Search',
  setup() {
    const state = reactive({
      inputFocus: false,
    })

    return {
      ...toRefs(state),
    }
  },
}
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  align-items: center;
  position: relative;
  border-radius: 3px;

  .iconfont {
    position: absolute;
    top: 5px;
    left: 5px;
    font-size: 14px;
    color: #808080;
  }

  &-input {
    display: inline-block;
    width: 100%;
    height: 24px;
    padding-left: 22px;
    font-size: 12px;
    box-sizing: border-box;
    background-color: #eaeaea;
    border-radius: 3px;
    border: 1px solid #eaeaea;
    outline: none;
    transition: all 0.2s ease;

    &::placeholder {
      color: #9a9a9a;
    }

    &--focus {
      background-color: #fff;
      border: 1px solid #5dc942;
    }
  }
}
</style>
