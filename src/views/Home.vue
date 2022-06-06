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
          Right
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TheHeader from '../components/Header.vue'
import AppCard from '../components/AppCard.vue'

export default {
  components: {
    TheHeader,
    AppCard
  },
  computed: {
    ...mapGetters(['getUser']),
    tokenImage() {
      if (this.userAge === 1) {
        return '/images/token_1year.png'
      } else {
        return '/images/token_7years.png'
      }
    },
    userAge() {
      return new Date().getFullYear() - new Date(this.getUser.birthday).getFullYear()
    },
    userAgeString() {
      if (this.userAge === 1) {
        return `${this.userAge} year`
      } else {
        return `${this.userAge} years`
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
      display: flex;
      justify-content: space-between;

      .left-column {
        width: calc(50% - 20px);

        .token-wrapper {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;

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
        width: calc(50% - 20px)
      }
    }
  }
</style>
