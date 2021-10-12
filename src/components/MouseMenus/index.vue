<template>
  <div
    class="mouse-menus"
    :style="{ top: top + 'px', left: left + 'px' }"
    v-show="show"
  >
    <ul class="mouse-menus--list">
      <li class="mouse-menus--list_item">置顶</li>
      <li class="mouse-menus--list_item">标为未读</li>
      <li class="mouse-menus--list_item">消息免打扰</li>
      <li class="mouse-menus--list_item">查看详细资料</li>
      <li class="mouse-menus--list_line"></li>
      <li class="mouse-menus--list_item">不显示</li>
      <li class="mouse-menus--list_item">删除</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MouseMenus',
  props: {
    top: Number,
    left: Number,
    show: Boolean,
  },
  setup(props) {
    console.log(props)
  },
}
</script>

<style lang="scss" scoped>
.mouse-menus {
  position: absolute;
  padding: 5px 0;
  background-color: #f3f3f3;
  border: 1px solid #e2e2e2;
  border-radius: 5px;
  box-shadow: 0px 5px 8px 0px rgba(117, 117, 117, 0.6);

  &--list {
    &_item {
      padding: 2px 20px;
      font-size: 14px;
      columns: #333;

      &:hover {
        color: #fff;
        background-color: #4baeff;
      }
    }

    &_line {
      padding-top: 6px;
      margin-bottom: 6px;
      border-bottom: 1px solid #e6e6e6;
    }
  }
}
</style>
