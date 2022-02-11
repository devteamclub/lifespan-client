<template>
  <div class="chapters-bar">
    <div
      v-for="chapter in getStyledChapters"
      :key="chapter.id"
      class="bar-item"
      :class="{'active': chapter.title === currentChapterTitle }"
      :style="{ backgroundColor: chapter.backgroundColor, height: chapter.height }"
    >
      <span class="item-title">
        {{ chapter.title }}
      </span>
    </div>
  </div>
</template>

<script>
import { getYear } from '@/services/dateService'

export default {
  name: 'ChaptersBar',
  props: {
    chapters: {
      type: Array,
      required: true
    },
    currentChapterTitle: {
      type: String,
      required: true
    }
  },
  computed: {
    getStyledChapters() {
      // TODO this is temporal remove for last chapter with endDate bug
      const chapters = [...this.chapters]
      chapters.pop()

      chapters.forEach((chapter, i, arr) => {
        chapter.backgroundColor = `#000${i + 1}`

        const firstChapterStartDate = this.getYear(arr[0].startDate)
        const lastChapterEndDate = this.getYear(arr[arr.length - 1].endDate)

        const chaptersDatesRange = lastChapterEndDate - firstChapterStartDate

        const chapterDatesInterval = this.getYear(chapter.endDate) - this.getYear(chapter.startDate)

        // get the percentage value of the single chapter from the total chapters
        const chapterItemHeight = chapterDatesInterval / chaptersDatesRange * 100

        chapter.height = `${chapterItemHeight}vh`
      })

      return this.chapters
    }
  },
  methods: {
    getYear
  }
}
</script>

<style lang="scss" scoped>
.chapters-bar {
  --slide-width: 150px;
  --bar-width: 16px;

  position: fixed;
  top: 0;
  right: 0;
  display: grid;
  width: var(--bar-width);
  height: 100vh;
  transition: width 0.3s ease-in-out;

  &:hover {
    width: var(--slide-width);
  }

  .bar-item {
    position: relative;
    right: 0;
    display: flex;
    align-items: center;
    width: 100vw;
    padding: var(--bar-width);
    transition: right 0.3s ease-in-out;

    &.active {
      right: var(--slide-width);
      border-radius: var(--default-border-radius);
    }

    .item-title {
      font-size: var(--text-size-sm);
      font-weight: var(--text-weight-bold);
    }
  }
}
</style>
