<template>
  <div class="age-progress">
    <div class="text">{{ daysBeforeBirthday }} days left</div>
    <div class="line">
      <div
        v-for="(item, index) in weeksCount"
        :key="index"
        :class="{ 'active': index + 1 <= activeWeeks, 'current': index + 1 === activeWeeks && daysBeforeBirthday !== 0 }"
        class="item"
      />
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'AgeProgress',
  props: {
    birthday: {
      type: Date,
      required: true
    }
  },
  data () {
    return {
      weeksCount: 52
    }
  },
  computed: {
    daysBeforeBirthday () {
      const current = moment()
      const birthday = moment(this.birthday).set('year', current.year());
      const daysDiff= birthday.diff(current, 'days')

      if (daysDiff >= 0) {
        return daysDiff
      } else {
        return birthday.add(1, 'year').diff(current, 'days') + 1
      }
    },
    activeWeeks () {
      const weeksLeft = Math.floor(this.daysBeforeBirthday / 7)

      return weeksLeft > this.weeksCount ? 0 : this.weeksCount - weeksLeft
    }
  }
}
</script>

<style lang="scss" scoped>
.age-progress {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 0 auto;

  .text {
    color: #a4a4a4;
    font-size: 14px;
  }

  .line {
    display: flex;
    margin-top: 4px;

    .item {
      width: 10px;
      height: 36px;
      margin-left: 8px;
      background: #e1e1e1;
      border-radius: 1px;
      box-shadow: inset 0.5px 0.5px 1.5px 0 rgb(0 0 0 / 12%);

      &.active {
        background: #76cdae;
      }

      &.current {
        background: #6236ff;
      }

      &:first-child {
        margin-left: 0;
      }
    }
  }
}
</style>
