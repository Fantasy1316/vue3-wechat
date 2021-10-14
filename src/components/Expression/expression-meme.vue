<template>
  <div class="expression-meme">
    <div
      class="meme-content"
      :class="{ 'meme-content--action': currentIndex === 1 }"
    >
      <div
        class="meme-content--item"
        v-for="(item, index) in memeGroupList"
        :key="index"
      >
        <div class="item" v-for="(meme, index) in item" :key="index">
          <img :src="meme" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue'
export default {
  name: 'ExpressionMeme',
  props: {
    currentIndex: Number,
  },
  setup() {
    const MEME_COUNT = 23
    const state = reactive({
      allMemeList: [],
      memeGroupList: [],
      memeGroupCount: 0,
    })

    onMounted(() => {
      for (let i = 1; i <= MEME_COUNT; i++) {
        state.allMemeList.push(require(`../../../public/meme/meme_${i}.jpg`))
      }

      state.memeGroupCount = Math.ceil(MEME_COUNT / 20)
      let start = 0
      for (let j = 1; j <= state.memeGroupCount; j++) {
        let end = j * 20
        state.memeGroupList.push(state.allMemeList.slice(start, end))
        start = end
      }
    })

    return {
      ...toRefs(state),
    }
  },
}
</script>

<style lang="scss" scoped>
.expression-meme {
  display: flex;
  flex-direction: column;
  padding: 10px 10px 0;
  overflow: hidden;

  .meme-content {
    flex: 1;
    display: flex;
    transform: translateX(0);
    transition: all 0.3s 0.1s ease;

    &--action {
      transform: translateX(-102%);
    }

    &--item {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-template-rows: repeat(4, 1fr);

      &:first-child {
        margin-right: 10px;
      }

      .item {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 76px;
        height: 76px;
        border-radius: 4px;

        &:hover {
          background-color: #f0f0ed;
        }

        img {
          width: 60px;
          height: auto;
          user-select: none;
          -webkit-user-drag: none;
        }
      }
    }
  }
}
</style>
