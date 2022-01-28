<template>
  <div class="timeline">
    <div ref="predictions" class="predictions-wrapper">
      <div
        v-for="(items, dateKey, i) in timeIntervals"
        :key="i"
        class="predictions"
      >
        <span class="start-date">
          {{ dateKey }}
        </span>
        <ItemChip
          v-for="(prediction, k) in items"
          :key="k"
          :item="prediction"
        />
      </div>
    </div>
    <div class="events-wrapper">
      <div v-for="item in events" :key="item.id" class="events">
        <ItemChip :item="item" />
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
      timeIntervals: {},
      events: [],
      testUserId: 2,
      currentYear: new Date().getFullYear()
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
      if (data?.length) {
        this.events = data
        this.setTimeIntervals()
      }
    },
    setTimeIntervals() {
      const items = [...this.predictions, ...this.events]

      items.forEach((item) => {
        this.timeIntervals[this.getYear(item.startDate)] = this.timeIntervals[this.getYear(item.startDate)]
          ? [...this.timeIntervals[this.getYear(item.startDate)], item]
          : [item]
      })
    },
    scrollToCurrentYear() {
      const startDateElements = this.$refs.predictions.querySelectorAll('.start-date')
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100%;

  .predictions-wrapper {
    padding: 18px 18px 0;
    background-color: var(--timeline-accent-color);
  }

  .events-wrapper {
    padding: 18px 18px 0;
    background-color: var(--timeline-accent-color-light);
  }

  .predictions,
  .events {
    position: relative;
    display: grid;
    height: 100vh;
    padding: 80px 0;
  }

  .predictions {
    .start-date,
    .end-date {
      position: absolute;
      right: 0;
      font-size: var(--title-text-size);
      font-weight: var(--font-weight-bold);
      line-height: 1;
    }

    .start-date {
      top: 0;
    }

    .end-date {
      bottom: 80px; // header height
    }
  }
}
</style>
