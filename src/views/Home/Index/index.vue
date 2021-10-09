<template>
  <div class="container">
    <div class="home">
      <div class="home-sider">
        <div class="home-sider--command">
          <win-command />
        </div>
      </div>
      <div class="home-view"></div>
    </div>
  </div>
</template>

<script>
import WinCommand from '@/components/WinCommand'
export default {
  name: 'Home',
  components: {
    WinCommand,
  },
}
</script>

<style lang="scss" scoped>
.container {
  @include container(#f8f8f8);
  display: flex;
  justify-content: center;
  align-items: center;

  .home {
    display: flex;
    width: 60%;
    min-width: 1000px;
    height: 80%;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 8px 3px #dfdfdf;
    overflow: hidden;

    &-sider {
      width: 68px;
      background-color: #efefef;

      &--command {
        padding: 8px 3px;
      }
    }
  }
}
</style>
