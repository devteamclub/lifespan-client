<template>
  <div>
    <TheHeader />
    <div
      v-if="getUser"
      class="home"
    >
      <div class="wrapper">
        Home
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TheHeader from '../components/Header.vue'

export default {
  components: {
    TheHeader
  },
  computed: {
    ...mapGetters(['getUser'])
  }
}
</script>

<style lang="scss" scoped>
  .wrapper {
    max-width: 1440px;
    margin: 0 auto;
  }

  .home {
    padding: 20px;
    box-sizing: border-box;
  }
</style>
