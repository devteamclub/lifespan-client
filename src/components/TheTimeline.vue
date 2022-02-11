<template>
  <div class="timeline">
    <div ref="wrapper" class="wrapper">
      <div v-if="currentIntervalStartDate" class="top-info">
        <span class="start-date">
          {{ currentIntervalStartDate }}
        </span>
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
          <div
            v-for="(prediction, k) in items"
            :key="k"
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
    <ChaptersBar :chapters="chapters" :current-chapter-title="getCurrentChapterTitle" />
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
      const { data } = await api.users.getUserPredictionEvents()
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

      if (!currentYearPrediction) return

      const topOffset = currentYearPrediction.getBoundingClientRect().top

      window.scroll({
        top: topOffset,
        behavior: 'smooth'
      })
    },
    handleDatesInfo() {
      const options = {
        root: null,
        threshold: 0.1
      }

      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.currentIntervalStartDate = entry.target.dataset.intervalDate
            observer.unobserve(entry.target)
          }
        })
      }, options)

      if (this.intervalElements.length) {
        this.intervalElements.forEach(item => observer.observe(item))
      }
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

    .start-date,
    .person-age {
      position: absolute;
      top: 10px;
      font-size: var(--title-text-size);
      line-height: 1;
    }

    .start-date {
      right: calc(50% + 15px);
      font-weight: var(--font-weight-bold);
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
    padding: 120px 48px;

    & > div:nth-child(even) {
      margin-left: 30%;
    }
  }

  .predictions {
    background-color: rgba(var(--timeline-accent-color), 0.5);
  }

  .events {
    background-color: rgba(var(--timeline-accent-color-light), 0.5);
  }
}
</style>
