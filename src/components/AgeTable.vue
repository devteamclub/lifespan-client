<template>
  <div class="table">
    <div
      v-for="year in 96"
      :key="year"
      class="year-row"
    >
      <AgeTableYear :color="getCellColor(year)" :year="year" :age="age" />
    </div>
  </div>
</template>

<script>
import AgeTableYear from './AgeTableYear.vue'
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
    AgeTableYear
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
  width: 576px;
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
  }
}
</style>
