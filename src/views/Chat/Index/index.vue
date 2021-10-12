<template>
  <div class="chat-index">
    <div class="chat-index--list">
      <div class="list-search">
        <search class="list-search--search" />
        <div class="list-search--btn">
          <i class="iconfont icon-tianjia"></i>
        </div>
      </div>
      <div id="listChat" class="list-chat">
        <div
          class="list-chat--item"
          v-for="item in list"
          :key="item.id"
          :class="[
            { 'list-chat--item_active': item.id == active },
            { 'list-chat--item_mouse-active': item.id == mouseActive },
          ]"
          @click="handleChatItemClick(item.id)"
          @click.right="handleItemRightClick($event, item.id)"
        >
          <div class="item-avatar">
            <img :src="item.avatar" alt="item.name" />
          </div>
          <div class="item-info">
            <p class="item-info--date">{{ item.date }}</p>
            <p class="item-info--name">{{ item.name }}</p>
            <p class="item-info--message">{{ item.message }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="chat-index--chat">
      <router-view />
    </div>

    <!-- 鼠标右键 -->
    <mouse-menus v-model:show="show" :top="top" :left="left" />
  </div>
</template>

<script>
import axios from 'axios'
import { onMounted, reactive, toRefs, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Search from '@/components/Search'
import MouseMenus from '@/components/MouseMenus'

export default {
  name: 'ChatIndex',
  components: {
    Search,
    MouseMenus,
  },
  setup() {
    const router = useRouter()
    const route = useRoute()

    let state = reactive({
      active: 0,
      mouseActive: 0,
      list: [],
      top: 0,
      left: 0,
      show: false,
    })

    // 获取聊天列表
    const getChatList = () => {
      state.active = route.params.id
      axios('/mock/wechat/chat/list').then((res) => {
        if (res) {
          state.list = res.data.data
        }
      })
    }

    const handleChatItemClick = (id) => {
      state.show = false
      state.active = id
      router.push(`${id}`)
    }

    const handleItemRightClick = (event, id) => {
      state.mouseActive = id
      const { pageX, pageY } = event
      state.top = pageY
      state.left = pageX
      state.show = true
      document.oncontextmenu = () => false
    }

    const handleChatListScroll = () => {
      let list = document.querySelector('#listChat')
      // 监听鼠标滚轮滚动
      list.addEventListener('mousewheel', (e) => {
        if (state.show) e.preventDefault()
      })
      // 监听键盘上下键 上: 38 下: 40
      window.addEventListener('keydown', (e) => {
        if (state.show) e.preventDefault()
      })
    }

    watch(
      () => state.show,
      (show) => {
        if (!show) state.mouseActive = 0
      }
    )

    onMounted(() => {
      handleChatListScroll()
      getChatList()
    })

    return {
      ...toRefs(state),
      handleChatItemClick,
      handleItemRightClick,
      handleChatListScroll,
    }
  },
}
</script>

<style lang="scss" scoped>
.chat-index {
  display: flex;
  height: 100%;

  &--list {
    display: flex;
    flex-direction: column;
    width: 260px;
    border-right: 1px solid #e1e1e1;

    .list-search {
      display: flex;
      align-items: center;
      padding: 18px 12px 16px 16px;
      background-color: #f7f7f7;

      &--search {
        flex: 1;
      }

      &--btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 26px;
        height: 24px;
        margin-left: 10px;
        background-color: #eaeaea;
        border-radius: 3px;

        .iconfont {
          font-size: 16px;
          color: #afafaf;
        }
      }
    }

    .list-chat {
      flex: 1;
      background-color: #f7f7f7;
      overflow-y: scroll;

      &--item {
        display: flex;
        align-items: center;
        padding: 14px;
        box-sizing: border-box;

        &_active {
          background-color: #dedede;
        }

        &_mouse-active {
          padding: 12px;
          border: 2px solid #1ea725;
        }

        .item-avatar {
          @include avatar(36px, 36px, 4px);
        }

        .item-info {
          flex: 1;
          position: relative;
          margin-left: 12px;
          overflow: hidden;

          &--date {
            position: absolute;
            right: 0;
            font-size: 20px;
            color: #b7b5b6;
            transform: scale(0.5);
            transform-origin: right 2px;
          }

          &--name {
            margin-bottom: 8px;
            font-size: 12px;
            font-weight: 500;
          }

          &--message {
            @include lineWrap;
            font-size: 12px;
            color: #a8a6a7;
          }
        }
      }
    }
  }

  &--chat {
    flex: 1;
    background: url('../../../assets/images/weixin.png') no-repeat;
    background-position: center;
  }
}
</style>
