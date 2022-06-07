<template>
  <div class="table">
    <div
      v-for="year in 96"
      :key="year"
      class="year-row"
    >
      <div class="year">
        <div
          v-for="month in 12"
          :key="month"
          class="month"
        >
          <AgeTableCell
            :color="getCellColor(year)"
            :is-filled="(year - 1) * 12 + month - 1 < age.months"
            :is-bold="year - 1 === age.years && month - 1 === age.months % 12"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AgeTableCell from './AgeTableCell.vue'

const stages = [
  [3, '#98be61'],
  [5, '#b0d177'],
  [11, '#76cdae'],
  [19, '#a995e7'],
  [35, '#8f7ed7'],
  [51, '#74bee4'],
  [80, '#6f9be6'],
  [96, '#de8dbc']
]

export default {
  name: 'AgeTable',
  components: {
    AgeTableCell
  },
  props: {
    age: {
      type: Object,
      required: true
    }
  },
  methods: {
    getCellColor (year) {
      for (let i = 0; i < stages.length; i++) {
        if (year <= stages[i][0]) {
          return stages[i][1]
        }
      }

      return '#000000'
    }
  }
}
</script>

<style lang="scss" scoped>
.table {
  width: 600px;
  overflow: auto;

  @media (max-width: 640px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .year-row {
    display: flex;

    &:nth-child(odd) {
      float: left;

      @media (max-width: 640px) {
        float: none;
      }
    }

    &:nth-child(even) {
      float: right;

      @media (max-width: 640px) {
        float: none;
      }
    }

    .year {
      display: inline-flex;

      .month {
        padding: 4px;
        box-sizing: border-box;
      }
    }
  }
}
</style>
