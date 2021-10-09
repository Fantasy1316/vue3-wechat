<template>
  <div class="win-command">
    <div class="win-command--item win-command--item_close">
      <i class="iconfont icon-close"></i>
    </div>
    <div class="win-command--item win-command--item_minus">
      <i class="iconfont icon-minus"></i>
    </div>
    <div class="win-command--item win-command--item_maxus">
      <i class="iconfont icon-maxus"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WindowsContral',
}
</script>

<style lang="scss" scoped>
.win-command {
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: transparent;

  &:hover {
    color: #333;
  }

  &--item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 12px;
    height: 12px;
    box-sizing: border-box;
    background-color: #dbdbdb;
    border-radius: 12px;
    overflow: hidden;

    &_close {
      background-color: #ff4757;
      border: 1px solid #da3c49;
    }

    &_minus {
      background-color: #ffbd4c;
      border: 1px solid #e0a53d;
    }

    &_maxus {
      background-color: #30cd4a;
      border: 1px solid #25b13d;
    }

    .iconfont {
      font-size: 30px;
      font-weight: 900;
      transform: scale(0.3);
    }
  }
}
</style>
