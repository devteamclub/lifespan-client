<template>
  <div class="timeline">
    <div ref="predictions" class="predictions-wrapper">
      <div
        v-for="item in predictions"
        :key="item.id"
        class="predictions"
      >
        <span class="start-date">
          {{ getYear(item.startDate) }}
        </span>
        <span class="end-date">
          {{ getYear(item.endDate) }}
        </span>
        <ItemChip is-prediction :item="item" />
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
      if (data?.length) this.events = data
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
    height: 100vh;
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
