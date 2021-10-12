<template>
  <div class="launch-group">
    <div class="launch-group--btn">
      <i class="iconfont icon-tianjia" @click="show = true"></i>
    </div>
    <div class="launch-group--content">
      <div class="content" :class="{ 'content-show': show }">
        <div class="content-left">
          <div class="content-left--search">
            <search />
          </div>
          <p class="content-left--sign">
            <i class="iconfont icon-xingxing"></i>
            <span>星标好友</span>
          </p>
          <div class="content-left--fridens">
            <div class="friends" v-for="(item, index) in list" :key="index">
              <div class="fridens-key">{{ item.key }}</div>
              <div class="fridens-list">
                <div
                  class="fridens-list--item"
                  v-for="friend in item.friends"
                  :key="friend.id"
                  @click="selectedFriend(friend)"
                >
                  <i
                    class="iconfont icon-danxuanweixuanzhong_o"
                    v-if="!selectedIdList.includes(friend.id)"
                  ></i>
                  <i class="iconfont icon-yixuanzhong" v-else></i>
                  <div class="item-avatar">
                    <img :src="friend.avatar" alt="" />
                  </div>
                  <p class="item-name">{{ friend.name }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="content-right">
          <p class="content-right--title">
            <span class="title-main">发起群聊</span>
            <span class="title-sub">{{ subtitleText }}</span>
          </p>
          <div class="content-right--selected">
            <div
              class="selected-item"
              v-for="item in selectedList"
              :key="item.id"
            >
              <div class="selected-item--avatar">
                <i
                  class="iconfont icon-delete_fill"
                  @click="selectedFriend(item)"
                ></i>
                <img :src="item.avatar" :alt="item.name" />
              </div>
              <p class="selected-item--name">{{ item.name }}</p>
            </div>
          </div>
          <div class="content-right--buttons">
            <button class="button button-cancel" @click="show = false">
              取消
            </button>
            <button
              class="button button-create"
              :class="{ 'button-create--active': selectedList.length }"
            >
              创建
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { computed, onMounted, reactive, toRefs } from 'vue'
import Search from '../Search'
export default {
  name: 'LaunchGroup',
  components: {
    Search,
  },
  setup() {
    const state = reactive({
      show: false,
      list: [],
      selectedIdList: [],
    })

    const selectedList = computed(() => {
      return state.list
        .map((item) =>
          item.friends.filter((f) => state.selectedIdList.includes(f.id))
        )
        .flat(Infinity)
    })

    const subtitleText = computed(() => {
      if (selectedList.value.length) {
        return `已选择 ${selectedList.value.length} 个联系人`
      } else {
        return '未选择联系人'
      }
    })

    const getFriendsList = () => {
      axios('/mock/wechat/chat/friends').then((res) => {
        state.list = res.data.data
      })
    }

    const selectedFriend = (item) => {
      if (state.selectedIdList.includes(item.id)) {
        let index = state.selectedIdList.findIndex((id) => id === item.id)
        state.selectedIdList.splice(index, 1)
      } else {
        state.selectedIdList.push(item.id)
      }
    }

    onMounted(() => {
      getFriendsList()
    })

    return {
      ...toRefs(state),
      selectedList,
      subtitleText,
      selectedFriend,
    }
  },
}
</script>

<style lang="scss" scoped>
.launch-group {
  position: relative;
  user-select: none;

  &--btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 26px;
    height: 24px;
    background-color: #eaeaea;
    border-radius: 3px;
    user-select: none;

    .iconfont {
      font-size: 16px;
      color: #afafaf;
    }
  }

  &--content {
    position: absolute;
    top: 32px;
    left: -80px;
    width: 640px;
    overflow: hidden;

    .content {
      display: flex;
      position: relative;
      left: 14px;
      width: 604px;
      height: 460px;
      margin-bottom: 20px;
      background-color: #fff;
      box-sizing: border-box;
      border-radius: 4px;
      border: 1px solid #e3e3e3;
      box-shadow: 0 6px 4px 0px rgba(219, 219, 219, 0.432) inset,
        0 4px 16px 0px rgba(202, 202, 202, 0.842);
      z-index: 99;
      transform: translateY(-480px);
      transition: all 0.4s ease;

      &-show {
        transform: translateY(0);
      }

      &-left {
        display: flex;
        flex-direction: column;
        width: 280px;
        height: 100%;
        background-color: #f7f7f7;

        &--search {
          padding: 15px 23px 12px;
        }

        &--sign {
          padding: 0 23px 10px 23px;
          font-size: 12px;
          color: #7c7b80;

          .iconfont {
            padding-right: 2px;
            font-size: 14px;
          }
        }

        &--fridens {
          flex: 1;
          overflow-y: scroll;

          .friends {
            .fridens-key {
              padding: 16px 0 14px 24px;
              font-size: 14px;
              color: #787a89;
            }

            .fridens-list {
              padding-left: 18px;

              &--item {
                display: flex;
                align-items: center;
                padding: 10px 0;

                .icon-danxuanweixuanzhong_o {
                  font-size: 24px;
                  color: #bbbbbb;
                }

                .icon-yixuanzhong {
                  font-size: 24px;
                  color: #10c55e;
                }

                .item-avatar {
                  @include avatar(30px, 30px, 4px);
                  margin: 0 10px;
                }

                .item-name {
                  font-size: 14px;
                  color: #0c243e;
                }
              }
            }
          }
        }
      }

      &-right {
        display: flex;
        flex-direction: column;
        flex: 1;
        height: 100%;

        &--title {
          display: flex;
          justify-content: space-between;
          padding: 20px 28px 8px 30px;

          .title-main {
            font-size: 14px;
            color: #121315;
          }

          .title-sub {
            font-size: 12px;
            color: #acaaad;
          }
        }

        &--selected {
          flex: 1;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(5, 1fr);
          grid-row-gap: 10px;
          grid-column-gap: 10px;
          padding: 10px 40px 0 30px;
          overflow-y: scroll;

          .selected-item {
            position: relative;

            &--avatar {
              @include avatar(40px, 40px, 4px);
              margin: 0 auto 8px;
            }

            &--name {
              @include lineWrap();
              max-width: 74px;
              font-size: 12px;
              color: #1a253b;
              text-align: center;
            }
          }

          .icon-delete_fill {
            position: absolute;
            top: -8px;
            left: 51px;
            font-size: 17px;
            color: #d6d6d6;
          }
        }

        &--buttons {
          display: flex;
          justify-content: space-between;
          padding: 20px 46px 25px;

          .button {
            width: 100px;
            height: 28px;
            line-height: 28px;
            font-size: 14px;
            background-color: #f2f2f2;
            border-radius: 4px;
            border: none;
            outline: none;

            &-cancel {
              color: #57be7b;
            }

            &-create {
              color: #cfcfcf;

              &--active {
                color: #fff;
                background-color: #16c56a;
              }
            }
          }
        }
      }
    }
  }
}
</style>
