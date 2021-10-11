<template>
  <div class="container">
    <div class="home">
      <div class="home-sider">
        <div class="home-sider--command">
          <win-command />
        </div>
        <div class="home-sider--avatar">
          <img src="../../../assets/images/avatar.png" alt="" />
        </div>
        <div class="home-sider--nav">
          <div
            class="nav-item"
            v-for="(nav, index) in homeNavList"
            :key="nav.path"
            :title="nav.name"
            @click="handleNavClick(nav.path, index)"
          >
            <i class="iconfont" :class="nav.icon" v-if="active !== index"></i>
            <i class="iconfont nav-active" :class="nav.activeIcon" v-else></i>
          </div>
        </div>
      </div>
      <div class="home-view">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import WinCommand from '@/components/WinCommand'
import { reactive, ref } from 'vue'
export default {
  name: 'Home',
  components: {
    WinCommand,
  },
  setup() {
    let active = ref(0)
    const homeNavList = reactive([
      {
        name: '微信',
        path: 'chat',
        icon: 'icon-24gl-bubble',
        activeIcon: 'icon-24gf-bubble',
      },
      {
        name: '通讯录',
        path: 'contact',
        icon: 'icon-tongxunlu1',
        activeIcon: 'icon-tongxunlu',
      },
      {
        name: '收藏',
        path: 'collect',
        icon: 'icon-shoucang2',
        activeIcon: 'icon-collection_select',
      },
      {
        name: '聊天文件',
        path: 'chat-file',
        icon: 'icon-iconset0196',
        activeIcon: '',
      },
      {
        name: '朋友圈',
        path: 'moments',
        icon: 'icon-pengyouquan',
        activeIcon: '',
      },
    ])
    const handleNavClick = (path, index) => {
      active.value = index
    }

    return {
      active,
      homeNavList,
      handleNavClick,
    }
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

      &--avatar {
        margin: 50px auto 30px;
        @include avatar(38px, 36px, 4px);
      }

      &--nav {
        .nav-item {
          margin-bottom: 35px;
          text-align: center;

          .iconfont {
            font-size: 26px;
            color: #7c7c7c;
          }

          .icon-collection_select {
            font-size: 24px;
          }

          .icon-pengyouquan {
            font-size: 30px;
          }

          .nav-active {
            color: #1ec973;
          }
        }
      }
    }

    &-view {
      flex: 1;
    }
  }
}
</style>
