<template>
  <div>
    <TheHeader />
    <div
      v-if="getUser"
      class="home"
    >
      <div class="wrapper">
        <div class="progress">
          <AgeProgress :birthday="new Date(getUser.birthday)" />
          <div class="progress-title">A reflection of your year</div>
          <div class="time-interval">{{ previousBirthday }} - {{ nextBirthday }}</div>
          <div class="progress-text">
            Celebrate your birthday on June 24<br />
            with a lifetime achievement award,<br />
            NFT gift,<br />
            12 PLUSH COINS Reward <br />
          </div>
        </div>
        <div class="sections">
          <BirthdaySection title="Example">
            BirthdaySection
          </BirthdaySection>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import TheHeader from '../components/Header.vue'
import { mapGetters } from 'vuex'
import BirthdaySection from '../components/BirthdaySection.vue'
import AgeProgress from '../components/AgeProgress.vue'

export default {
  components: {
    TheHeader,
    BirthdaySection,
    AgeProgress
},
  computed: {
    ...mapGetters(['getUser']),
    nextBirthday () {
      const current = moment()
      const birthday = moment(this.getUser.birthday)
      const diff = birthday.diff(current, 'days')

      if (diff >= 0) {
        return birthday.set('year', current.year()).format('MMMM YYYY')
      } else {
        return birthday.set('year', current.year() + 1).format('MMMM YYYY')
      }
    },
    previousBirthday () {
      const current = moment()
      const birthday = moment(this.getUser.birthday)
      const diff = birthday.diff(current, 'days')

      if (diff >= 0) {
        return birthday.set('year', current.year() - 1).format('MMMM YYYY')
      } else {
        return birthday.set('year', current.year()).format('MMMM YYYY')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .home {
    padding: 20px 20px 80px 20px;
    box-sizing: border-box;

    .wrapper {
      max-width: 1440px;
      margin: 0 auto;
      padding-top: 20px;

      .progress {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 auto;

        .progress-title {
          padding-top: 48px;
          font-family: Moranga, sans-serif;
          font-size: 40px;
          font-weight: bold;
          color: #000;
        }

        .time-interval {
          font-family: AvenirNextRoundedPro-Reg, sans-serif;
          font-size: 24px;
          color: #000;
        }

        .progress-text {
          margin-top: 24px;
          font-family: Moranga, sans-serif;
          font-size: 18px;
          text-align: center;
        }
      }

      .sections {
        width: 800px;
        margin: 0 auto;
      }
    }
  }
</style>
