<template>
  <div class="search">
    <i class="iconfont icon-sousuo_o"></i>
    <input type="text" placeholder="搜索" />
  </div>
</template>

<script>
export default {
  name: 'Search',
}
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  align-items: center;
  padding: 5px 6px 3px;
  background-color: #eaeaea;
  border-radius: 3px;

  .iconfont {
    position: relative;
    top: -0px;
    font-size: 16px;
    color: #808080;
  }

  input {
    display: inline-block;
    font-size: 12px;
    background-color: transparent;
    border: none;
    outline: none;

    &placeholder {
      color: #9a9a9a;
    }
  }
}
</style>
