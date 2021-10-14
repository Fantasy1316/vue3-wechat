<template>
  <div class="chat-detail">
    <div class="chat-detail--header">
      <p class="header-name">叫我水手</p>
      <i class="iconfont icon-more"></i>
    </div>
    <div class="chat-detail--message"></div>
    <div class="chat-detail--input">
      <div class="input-funs">
        <p class="input-funs--item">
          <i
            class="iconfont icon-biaoqing"
            title="表情"
            @click="show = !show"
            tabindex="2"
            @blur="show = false"
          >
            <expression v-model:expressionShow="show" />
          </i>
          <i class="iconfont icon-iconset0196" title="附件"></i>
          <i
            class="iconfont icon-ziyuan"
            title="截图"
            @click="screenshotStatus = true"
          ></i>
          <i class="iconfont icon-xiaoxi" title="查找聊天内容"></i>
        </p>
        <p class="input-funs--item">
          <i class="iconfont icon-custom-phone" title="语音通话"></i>
          <i class="iconfont icon-video" title="视频通话"></i>
        </p>
      </div>
      <div id="inputEdit" class="input-edit" contenteditable></div>
    </div>
  </div>

  <!--截图组件-->
  <screen-short
    v-if="screenshotStatus"
    @destroy-component="destroyComponent"
    @get-image-data="getImg"
  ></screen-short>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue'
import Expression from '@/components/Expression'
export default {
  name: 'ChatDetail',
  components: {
    Expression,
  },
  setup() {
    const state = reactive({
      show: false,
      screenshotStatus: false,
    })
    const getInputEditFocus = () => {
      document.querySelector('#inputEdit').focus()
    }

    // 销毁组件函数
    const destroyComponent = (status) => {
      state.screenshotStatus = status
    }
    // 获取裁剪区域图片信息
    const getImg = (base64) => {
      console.log('截图组件传递的图片信息', base64)
    }

    onMounted(() => {
      getInputEditFocus()
    })

    return {
      ...toRefs(state),
      getInputEditFocus,
      destroyComponent,
      getImg,
    }
  },
}
</script>

<style lang="scss" scoped>
.chat-detail {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #f3f3f3;

  &--header {
    display: flex;
    align-items: center;
    padding: 16px 18px 14px 24px;
    border-bottom: 1px solid #e1e1e1;

    .header-name {
      flex: 1;
      font-size: 16px;
      font-weight: 500;
    }

    .icon-more {
      font-size: 28px;
      color: #323232;
    }
  }

  &--message {
    flex: 1;
    border-bottom: 1px solid #e1e1e1;
  }

  &--input {
    display: flex;
    flex-direction: column;
    height: 158px;

    .input-funs {
      display: flex;
      justify-content: space-between;
      padding: 18px 16px 16px 16px;

      &--item {
        display: flex;

        .iconfont {
          position: relative;
          margin-right: 20px;
          font-size: 20px;
          color: #4b4b4b;
        }

        .icon-video {
          font-size: 22px;
        }
      }
    }

    .input-edit {
      flex: 1;
      padding: 0 18px;
      margin-bottom: 12px;
      font-size: 14px;
      line-height: 18px;
      outline: none;
      overflow-y: scroll;
    }
  }
}
</style>
