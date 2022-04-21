<template>
  <div class="timeline">
    <TheServicesMenu :selected-categories="selectedCategories" @saveSelectedCategories="saveSelectedCategories" />
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
        :ref="dateKey"
        :data-interval-date="dateKey"
        class="interval"
      >
        <div class="predictions">
          <div class="start-date">
            {{ dateKey }}
          </div>
          <div
            v-for="prediction in items"
            :key="prediction.id"
            class="chip-wrapper"
          >
            <ItemChip
              v-if="!prediction.isEvent"
              :item="prediction"
              @fetchPredictions="fetchPredictions"
            />
          </div>
        </div>
        <div class="events">
          <div
            v-for="event in items"
            :key="event.id"
            :class="{ lasting: parallaxData[event.id] && parallaxData[event.id].range > 0 }"
            class="chip-wrapper"
          >
            <ItemChip
              v-if="event.isEvent && parallaxData[event.id]"
              v-prlx="{
                preserveInitialPosition: true,
                limit: { min: 0, max: parallaxData[event.id].offsetTo },
                speed: parallaxData[event.id].speed,
                disabled: !parallaxData[event.id].speed
              }"
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
import TheServicesMenu from '@/components/TheServicesMenu'

export default {
  name: 'TheTimeline',
  components: {
    ItemChip,
    ChaptersBar,
    TheServicesMenu
  },
  data() {
    return {
      predictions: [],
      events: [],
      chapters: [],
      intervalElements: null,
      currentIntervalStartDate: null,
      currentYear: new Date().getFullYear(),
      selectedCategories: [],
      parallaxData: {}
    }
  },
  computed: {
    ...mapGetters(['getUser']),
    getTimeIntervals() {
      const items = [...this.predictions, ...this.events]
      const timeIntervals = {}

      if (this.events.length) {
        const birthYear = this.getYear(this.events[0].startDate)
        const deathYear = this.getYear(this.events[this.events.length - 1].endDate)
        for (let i = +birthYear; i < deathYear; i += 1) {
          timeIntervals[i] = ''
        }
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
  async created() {
    const { data: { categoryList: selectedCategories } } = await api.users.getUserSettings(this.getUser.id)
    this.selectedCategories = selectedCategories || []
    await Promise.all([
      this.fetchPredictions(),
      this.fetchEvents(),
      this.fetchChapters()
    ])

    this.intervalElements = this.$refs.wrapper.querySelectorAll('.interval')
    this.scrollToCurrentYear()
    window.addEventListener('scroll', this.throttle(this.handleDatesInfo))
    this.calculateParallaxData()
  },
  methods: {
    getYear,
    throttle,
    saveSelectedCategories(selectedCategories) {
      this.selectedCategories = selectedCategories
      this.fetchPredictions()
    },
    async fetchPredictions() {
      const { data } = await api.predictions.getPredictionsByCategories(this.getUser.id, this.selectedCategories.join())
      this.predictions = data || []
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
          if (entry.boundingClientRect.top <= 0) {
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
    },
    calculateParallaxData() {
      this.events.forEach(event => {
        this.parallaxData[event.id] = this.getEventParallaxData(event)
      })
    },
    getEventParallaxData(event) {
      const result = {
        speed: 0,
        offsetTo: 0,
        range: 0
      }
      const startYear = this.getYear(event.startDate)
      const endYear = this.getYear(event.endDate)
      const range = endYear - startYear
      if (!this.$refs[startYear] || !range) return result
      let totalHeight = this.$refs[startYear][0].clientHeight
      for (let i = 1; i <= range; i += 1) {
        totalHeight += this.$refs[startYear + i] ? this.$refs[startYear + i][0].clientHeight : 0
      }
      const eventChipHeight = 80
      result.range = range
      result.speed = this.calculateParallaxSpeed(totalHeight)
      result.offsetTo = totalHeight - eventChipHeight
      return result
    },
    calculateParallaxSpeed(totalHeight) {
      if (totalHeight < 1000) return 0.45
      if (totalHeight < 2000) return 0.88
      if (totalHeight < 4000) return 0.9
      return 0.99
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
    min-height: 250px;

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
  }
  .predictions {
    & > div:nth-child(even) {
      margin-left: 30%;
    }
  }

  .lasting {
    margin-left: 30%;
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
    background-color: #f8f8f8;
  }

  .chip-wrapper {
    height: fit-content;
  }
}
</style>
