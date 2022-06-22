<template>
  <div>
    <TheHeader />
    <div
      v-if="getUser"
      class="home"
    >
      <div class="wrapper">
        <div class="sections">
          <BirthdaySection>
            BirthdaySection
          </BirthdaySection>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheHeader from '../components/Header.vue'
import { mapGetters } from 'vuex'
import BirthdaySection from '../components/BirthdaySection.vue'

export default {
  components: {
    TheHeader,
    BirthdaySection
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

      .sections {
        width: 800px;
        margin: 0 auto;
      }
    }
  }
</style>
