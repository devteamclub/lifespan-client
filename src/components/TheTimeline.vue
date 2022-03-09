<template>
  <div class="timeline">
    <div ref="wrapper" class="wrapper">
      <div v-if="currentIntervalStartDate" class="top-info">
        <div class="person-age">
          <span class="age">{{ getPersonAge }}</span>
          <span class="years"> y.o.</span>
        </div>
        <!-- remove if we will show chapters only on chapters bar -->
        <!-- <span class="chapter">{{ getCurrentChapterTitle }}</span> -->
      </div>
      <div
        v-for="(items, dateKey, i) in getTimeIntervals"
        :key="i"
        :data-interval-date="dateKey"
        class="interval"
      >
        <div class="predictions">
          <div class="start-date">
            {{ dateKey }}
          </div>
          <div
            v-for="(prediction, k) in items"
            :key="k"
            class="chip-wrapper"
          >
            <ItemChip
              v-if="!prediction.isEvent"
              :item="prediction"
            />
          </div>
        </div>
        <div class="events">
          <div
            v-for="(event, j) in items"
            :key="j"
            class="chip-wrapper"
          >
            <ItemChip
              v-if="event.isEvent"
              :item="event"
              :age="getPersonAge"
            />
          </div>
        </div>
      </div>
    </div>
    <ChaptersBar
      :chapters="chapters"
      :current-chapter-title="getCurrentChapterTitle"
      @scrollToChapter="scrollToChapter"
    />
  </div>
</template>

<script>
import api from '@/api'
import { mapGetters } from 'vuex'
import { getYear } from '@/services/dateService'
import { throttle } from '@/services/throttle'
import ItemChip from '@/components/ItemChip'
import ChaptersBar from '@/components/ChaptersBar'

export default {
  name: 'TheTimeline',
  components: {
    ItemChip,
    ChaptersBar
  },
  data() {
    return {
      predictions: [],
      events: [],
      chapters: [],
      intervalElements: null,
      currentIntervalStartDate: null,
      currentYear: new Date().getFullYear()
    }
  },
  computed: {
    ...mapGetters(['getUser']),
    getTimeIntervals() {
      const items = [...this.predictions, ...this.events]
      const timeIntervals = {}
      if (!this.events.length) return

      const birthYear = this.getYear(this.events[0].startDate)
      const deathYear = this.getYear(this.events[this.events.length - 1].endDate)
      for (let i = birthYear; i < deathYear; i++) {
        timeIntervals[i] = ''
      }

      items.forEach((item) => {
        timeIntervals[this.getYear(item.startDate)] = timeIntervals[this.getYear(item.startDate)]
          ? [...timeIntervals[this.getYear(item.startDate)], item]
          : [item]
      })

      return timeIntervals
    },
    getPersonAge() {
      if (this.currentIntervalStartDate < this.getYear(this.getUser.birthday)) return 0
      return this.currentIntervalStartDate - this.getYear(this.getUser.birthday)
    },
    getCurrentChapterTitle() {
      if (this.currentIntervalStartDate < this.getYear(this.getUser.birthday)) {
        return 'Not yet born'
      }

      const chapter = this.chapters.find((item) => {
        const chapterStartYear = this.getYear(item.startDate)
        const chapterEndYear = this.getYear(item.endDate)

        return this.currentIntervalStartDate >= chapterStartYear && this.currentIntervalStartDate <= chapterEndYear
      })

      return chapter?.title || ''
    }
  },
  async mounted() {
    await Promise.all([
      this.fetchPredictions(),
      this.fetchEvents(),
      this.fetchChapters()
    ])

    this.intervalElements = this.$refs.wrapper.querySelectorAll('.interval')
    this.scrollToCurrentYear()
    window.addEventListener('scroll', this.throttle(this.handleDatesInfo))
  },
  methods: {
    getYear,
    throttle,
    async fetchPredictions() {
      const { data } = await api.users.getUserPredictionEvents(this.getUser.id)
      if (data?.length) this.predictions = data
    },
    async fetchEvents() {
      const { data } = await api.users.getPersonalEvents(this.getUser.id)
      if (data?.length) this.events = data
    },
    async fetchChapters() {
      const { data } = await api.users.getPersonalChapters(this.getUser.id)
      if (data?.length) this.chapters = data
    },
    scrollToCurrentYear() {
      const currentYearPrediction = [...this.intervalElements].find(startDateElement => {
        return parseInt(startDateElement.dataset.intervalDate) === this.currentYear
      })

      this.scrollToElement(currentYearPrediction)
    },
    scrollToChapter(chapterStartDate) {
      const intervalElementsArr = [...this.intervalElements]

      const selectedChapterOnInterval = intervalElementsArr.find(startDateElement => {
        return startDateElement.dataset.intervalDate === this.getYear(chapterStartDate)
      })

      const isFirstChapter = intervalElementsArr[0] === selectedChapterOnInterval

      this.scrollToElement(selectedChapterOnInterval, isFirstChapter)
    },
    handleDatesInfo() {
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
            this.currentIntervalStartDate = entry.target.dataset.intervalDate
            observer.unobserve(entry.target)
          }
        })
      })

      if (this.intervalElements.length) {
        this.intervalElements.forEach(item => observer.observe(item))
      }
    },
    scrollToElement(element, isFirst) {
      if (!element) return

      window.scroll({
        top: isFirst ? element.offsetTop : element.offsetTop + 1, // plus 1px to scroll correctly on the element
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.timeline {
  .top-info {
    position: fixed;
    top: 0;
    z-index: 10;
    width: 100%;

    .person-age {
      position: absolute;
      top: 10px;
      font-size: var(--title-text-size);
      line-height: 1;
    }

    .person-age {
      left: calc(50% + 15px);
      display: flex;
      align-items: baseline;
      gap: 10px;
      font-weight: var(--font-weight-light);

      .years {
        font-size: 24px;
      }
    }

    .chapter {
      position: absolute;
      top: 15px;
      right: 0;
      z-index: 1;
      font-weight: var(--font-weight-bold);
      white-space: nowrap;
      transform: translate(-50%);
    }
  }

  .interval {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 100vh;

    &:nth-child(even) {
      .predictions {
        background-color: rgba(var(--timeline-accent-color), 1);
      }

      .events {
        background-color: rgba(var(--timeline-accent-color-light), 1);
      }
    }
  }

  .predictions,
  .events {
    position: relative;
    display: grid;
    gap: 200px;
    height: 100%;
    padding: 10px 15px 48px 120px;

    & > div:nth-child(even) {
      margin-left: 30%;
    }
  }

  .predictions {
    background-color: rgba(var(--timeline-accent-color), 0.5);

    .start-date {
      position: sticky;
      top: 10px;
      z-index: 10;
      height: fit-content;
      font-size: var(--title-text-size);
      font-weight: var(--font-weight-bold);
      line-height: 1;
      text-align: right;
    }
  }

  .events {
    background-color: rgba(var(--timeline-accent-color-light), 0.5);
  }

  .chip-wrapper {
    height: fit-content;
  }
}
</style>
