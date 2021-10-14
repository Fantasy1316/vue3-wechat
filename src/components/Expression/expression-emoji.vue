<template>
  <div class="expression-emoji">
    <div
      class="emoji-content"
      :class="{ 'emoji-content--action': currentIndex === 1 }"
    >
      <div
        class="emoji-content--item"
        v-for="(item, index) in emojiGroupList"
        :key="index"
      >
        <div class="item" v-for="(emoji, index) in item" :key="index">
          <img :src="emoji" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue'
export default {
  name: 'ExpressionEmoji',
  props: {
    currentIndex: Number,
  },
  setup() {
    const EMOJI_COUNT = 114
    const state = reactive({
      allEmojiList: [],
      emojiGroupList: [],
      emojiGroupCount: 0,
    })

    onMounted(() => {
      for (let i = 1; i <= EMOJI_COUNT; i++) {
        state.allEmojiList.push(
          require(`../../../public/expression/Expression_${i}@2x.png`)
        )
      }

      state.emojiGroupCount = Math.ceil(EMOJI_COUNT / 72)
      console.log(state.emojiGroupCount)
      let start = 0
      for (let j = 1; j <= state.emojiGroupCount; j++) {
        let end = j * 72
        state.emojiGroupList.push(state.allEmojiList.slice(start, end))
        start = end
      }

      console.log(state.emojiGroupList)
    })

    return {
      ...toRefs(state),
    }
  },
}
</script>

<style lang="scss" scoped>
.expression-emoji {
  display: flex;
  flex-direction: column;
  padding: 10px 10px 0;
  overflow: hidden;

  .emoji-content {
    flex: 1;
    display: flex;
    transform: translateX(0);
    transition: all 0.3s 0.1s ease;

    &--action {
      transform: translateX(-102%);
    }

    &--item {
      display: grid;
      grid-template-columns: repeat(9, 1fr);
      grid-template-rows: repeat(8, 1fr);

      .item {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 43px;
        height: 44px;
        border-radius: 4px;

        &:hover {
          background-color: #f0f0ed;
        }

        img {
          width: 22px;
          height: 22px;
          user-select: none;
          -webkit-user-drag: none;
        }
      }
    }
  }
}
</style>
