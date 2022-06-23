<template>
  <div>
    <TheHeader />
    <div
      v-if="getUser"
      class="home"
    >
      <div class="wrapper">
        <div class="left-column">
          <div class="token-wrapper">
            <div class="text">
              <div class="name">
                {{ getUser.name }}
              </div>
              <div class="age">
                {{ userAgeString }}
              </div>
            </div>
            <img
              class="token"
              :src="tokenImage"
              alt="token"
            >
          </div>
          <div class="app-list">
            <AppCard
              name="Family"
              description=" Connect your family across time and space"
              class="app-card"
              icon="/images/app/family.svg"
            />
            <AppCard
              name="Future outlook"
              description="What does the future holds for your family"
              class="app-card"
              icon="/images/app/lifespan.svg"
              :active="true"
              :url="`/user/${getUser.id}`"
            />
            <AppCard
              name="Plush forest"
              description="Dedicate a real tree to your child"
              class="app-card"
              icon="/images/app/forest.svg"
              url="https://forest.plush.dev"
              target="_blank"
              :active="true"
            />
            <AppCard
              name="Juno"
              description="Next-generation child development help."
              class="app-card"
              icon="/images/app/juno.png"
            />
            <AppCard
              name="Parallels"
              description="Compare lifespans"
              class="app-card"
              icon="/images/app/parallels.svg"
            />
          </div>
        </div>
        <div class="right-column">
          <AgeTable
            :age="userAge"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import TheHeader from '../components/Header.vue'
import AppCard from '../components/AppCard.vue'
import AgeTable from '../components/AgeTable.vue'

export default {
  components: {
    TheHeader,
    AppCard,
    AgeTable
  },
  computed: {
    ...mapGetters(['getUser']),
    tokenImage () {
      if (this.userAge.years < 1) {
        return '/images/token_1year.png'
      } else {
        return '/images/token_7years.png'
      }
    },
    userAge () {
      const dob = new Date(this.getUser.birthday)

      return {
        years: moment().diff(dob, 'years'),
        months: moment().diff(dob, 'months'),
        weeks: moment().diff(dob, 'weeks')
      }
    },
    userAgeString () {
      const birthDate = new Date(this.getUser.birthday)

      if (!birthDate) {
        return ''
      }

      const years = moment().diff(birthDate, 'years')
      const months = moment().diff(birthDate, 'months')
      const weeks = moment().diff(birthDate, 'weeks')

      if (weeks < 24) {
        const postfix =
          weeks === 1 ? 'week' : 'weeks'
        return `${weeks} ${postfix}`
      }

      if (months < 12) {
        const postfix =
          months === 1
            ? 'month'
            : 'months'
        return `${months} ${postfix}`
      }

      const monthExceptYears = months - years * 12
      const yearPostfix =
        years === 1 ? 'year' : 'years'
      const monthPostfix =
        monthExceptYears === 1
          ? 'month'
          : 'months'
      if (monthExceptYears === 0 || years > 2) {
        return `${years} ${yearPostfix}`
      }

      return `${years} ${yearPostfix}, ${months - years * 12} ${monthPostfix}`
    }
  }
}
</script>

<style lang="scss" scoped>
  .home {
    box-sizing: border-box;
    padding: 20px 20px 80px;

    .wrapper {
      display: flex;
      justify-content: space-between;
      max-width: 1440px;
      margin: 0 auto;

      @media (max-width: 1280px) {
        flex-direction: column;
      }

      .left-column {
        width: calc(50% - 20px);

        @media (max-width: 1280px) {
          width: 100%;
        }

        .token-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;

          .text {
            position: absolute;
            color: white;
            text-align: center;

            .name {
              font-size: 24px;
            }

            .age {
              font-weight: var(--font-weight-ligh);
            }
          }

          .token {
            width: 400px;
            height: auto;
          }
        }

        .app-list {
          .app-card {
            margin-top: 20px;

            &:first-child {
              margin-top: 0;
            }
          }
        }
      }

      .right-column {
        display: flex;
        justify-content: flex-end;
        width: calc(50% - 20px);

        @media (max-width: 1280px) {
          justify-content: center;
          width: 100%;
          margin-top: 40px;
        }
      }
    }
  }
</style>
