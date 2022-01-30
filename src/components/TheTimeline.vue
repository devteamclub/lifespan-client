<template>
  <div class="timeline">
    <div ref="wrapper" class="wrapper">
      <div
        v-for="(items, dateKey, i) in getTimeIntervals"
        :key="i"
        class="interval"
      >
        <div class="predictions">
          <span class="start-date">
            {{ dateKey }}
          </span>
          <div
            v-for="(prediction, k) in items"
            :key="k"
          >
            <ItemChip
              v-if="prediction.categoryList"
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
              v-if="!event.categoryList"
              :item="event"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import { getYear } from '@/services/dateService'
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
      testUserId: 2,
      currentYear: new Date().getFullYear()
    }
  },
  computed: {
    getTimeIntervals() {
      const items = [...this.predictions, ...this.events]
      const timeIntervals = {}

      items.forEach((item) => {
        timeIntervals[this.getYear(item.startDate)] = timeIntervals[this.getYear(item.startDate)]
          ? [...timeIntervals[this.getYear(item.startDate)], item]
          : [item]
      })

      return timeIntervals
    }
  },
  async mounted() {
    await this.fetchPredictions()
    await this.fetchEvents()

    if (this.predictions.length) {
      this.scrollToCurrentYear()
    }
  },
  methods: {
    getYear,
    async fetchPredictions() {
      const { data } = await api.users.getUserPredictionEvents()
      if (data?.length) this.predictions = data
    },
    async fetchEvents() {
      const { data } = await api.users.getPersonalEvents(this.testUserId)
      if (data?.length) this.events = data
    },
    scrollToCurrentYear() {
      const startDateElements = this.$refs.wrapper.querySelectorAll('.start-date')
      const currentYearPrediction = [...startDateElements].find(startDateElement => {
        return parseInt(startDateElement.textContent) === this.currentYear
      })

      if (!currentYearPrediction) return

      const headerHeight = 100
      const topOffset = currentYearPrediction.getBoundingClientRect().top - headerHeight

      window.scroll({
        top: topOffset,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.timeline {
  .interval {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 100vh;

    .start-date {
      position: absolute;
      top: 15px;
      right: 15px;
      font-size: var(--title-text-size);
      font-weight: var(--font-weight-bold);
      line-height: 1;
    }
  }

  .predictions,
  .events {
    position: relative;
    height: 100%;
    padding: 120px 24px;
  }

  .predictions {
    background-color: var(--timeline-accent-color);
  }

  .events {
    background-color: var(--timeline-accent-color-light);
  }
}
</style>
