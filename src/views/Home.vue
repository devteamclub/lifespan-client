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
            <img
              class="token"
              src="/images/token.png"
              alt="token"
            >
          </div>
          <div class="app-list">
            <AppCard
              name="Name"
              description="Description"
              class="app-card"
            />
            <AppCard
              name="Name"
              description="Description"
              class="app-card"
            />
            <AppCard
              name="Name"
              description="Description"
              class="app-card"
            />
            <AppCard
              name="Name"
              description="Description"
              class="app-card"
            />
            <AppCard
              name="Name"
              description="Description"
              class="app-card"
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
    ...mapGetters(['getUser'])
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
