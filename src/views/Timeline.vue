<template>
  <div>
    <TheWallet class="wallet" />
    <TheTimeline v-if="getUser" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TheTimeline from '@/components/TheTimeline'
import TheWallet from '../components/TheWallet.vue'

export default {
  components: {
    TheTimeline,
    TheWallet
  },
  computed: {
    ...mapGetters(['getUser'])
  }
}
</script>

<style lang="scss" scoped>
.wallet {
  position: fixed;
  top: 20px;
  left: 300px;
  z-index: 12;
}
</style>
