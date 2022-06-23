<template>
  <div
    class="year"
    :style="isHover ? { 'background-color': color } : ''"
    @mouseover="isHover = true"
    @mouseout="isHover = false"
  >
    <div
      v-show="isHover"
      class="text"
    >
      {{ `${year} ${postfix}` }}
    </div>
    <div
      v-for="month in 12"
      :key="month"
      class="month"
    >
      <AgeTableCell
        :color="color"
        :is-filled="(year - 1) * 12 + month - 1 < age.months"
        :is-bold="year - 1 === age.years && month - 1 === age.months % 12"
      />
    </div>
  </div>
</template>

<script>
import AgeTableCell from './AgeTableCell.vue'

export default {
  name: 'AgeTableYear',
  components: {
    AgeTableCell
  },
  props: {
    color: {
      type: String,
      required: true
    },
    year: {
      type: Number,
      required: true
    },
    age: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isHover: false
    }
  },
  computed: {
    postfix () {
      if (this.year < 2) {
        return 'year'
      } else {
        return 'years'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.year {
  position: relative;
  display: inline-flex;
  cursor: pointer;

  .text {
    position: absolute;
    left: 10px;
    color: white;
  }

  .month {
    box-sizing: border-box;
    padding: 4px;
  }
}
</style>
