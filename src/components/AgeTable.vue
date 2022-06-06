<template>
  <table>
    <tr
      v-for="year in age"
      :key="year"
    >
      <td
        v-for="month in 12"
        :key="month"
      >
        <AgeTableCell
          color="green"
        />
      </td>
    </tr>
  </table>
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
  [96, '#6f9be6']
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
  computed: {
    cellColor() {
      for (let i = 0; i < stages.length; i++) {
        if (this.age.years < stages[i]) {
          return stages[i][1]
        }
      }

      return '#000000'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
