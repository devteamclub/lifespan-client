<template>
  <div class="timeline">
    <div v-if="getUser" ref="wrapper" class="wrapper">
      <transition enter-active-class="animated flipInX">
        <div v-if="currentIntervalStartDate" :key="currentIntervalStartDate" class="top-info">
          <span class="start-date">
            {{ currentIntervalStartDate }}
          </span>
          <div class="person-age">
            <span class="age">{{ getPersonAge }}</span>
            <span class="years"> y.o.</span>
          </div>
          <span class="chapter">{{ getCurrentChapter }}</span>
        </div>
      </transition>
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
  </div>
</template>

<script>
import api from '@/api'
import { mapGetters } from 'vuex'
import { getYear } from '@/services/dateService'
import { throttle } from '@/services/throttle'
import ItemChip from '@/components/ItemChip'

export default {
  name: 'TheTimeline',
  components: {
    ItemChip
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
    getCurrentChapter() {
      let chapter = ''

      this.chapters.forEach((item) => {
        const chapterStartYear = this.getYear(item.startDate)
        const chapterEndYear = this.getYear(item.endDate)

        if (this.currentIntervalStartDate >= chapterStartYear && this.currentIntervalStartDate <= chapterEndYear) {
          chapter = item.title
        }
      })

      return chapter
    }
  },
  async mounted() {
    await this.fetchPredictions()
    await this.fetchEvents()
    await this.fetchChapters()

    this.intervalElements = this.$refs.wrapper.querySelectorAll('.interval')

    if (this.predictions.length) {
      this.scrollToCurrentYear()
    }

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

      const headerHeight = 100
      const topOffset = currentYearPrediction.getBoundingClientRect().top - headerHeight

      window.scroll({
        top: topOffset,
        behavior: 'smooth'
      })
    },
    handleDatesInfo() {
      const options = {
        root: null,
        threshold: 0
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
    top: 80px;
    left: 50%;
    z-index: 10;
    transform: translate(-50%);

    .start-date,
    .person-age {
      position: absolute;
      top: 15px;
      font-size: var(--title-text-size);
      line-height: 1;
    }

    .start-date {
      right: 15px;
      font-weight: var(--font-weight-bold);
    }

    .person-age {
      left: 15px;
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
      top: 70px;
      left: 50%;
      z-index: 1;
      transform: translate(-50%);
    }
  }

  .interval {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 100vh;
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
    background-color: var(--timeline-accent-color);
  }

  .events {
    background-color: var(--timeline-accent-color-light);
  }

  .animated {
    animation-duration: 1s;
    animation-fill-mode: both
  }

  .flipInX {
    backface-visibility: visible;
    animation-name: flipInX
  }

  @keyframes flipInX {
    0% {
      transform: perspective(400px) rotateX(90deg);
      opacity: 0
    }

    0%,40% {
      animation-timing-function: ease-in
    }

    40% {
      transform: perspective(400px) rotateX(-20deg)
    }

    60% {
      transform: perspective(400px) rotateX(10deg);
      opacity: 1
    }

    80% {
      transform: perspective(400px) rotateX(-5deg)
    }

    to {
      transform: perspective(400px)
    }
  }
}
</style>
