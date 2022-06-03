<template>
  <div>
    <TheMetamask />
    <TheTimeline v-if="getUser" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TheMetamask from '@/components/TheWallet'
import TheTimeline from '@/components/TheTimeline'

export default {
  components: {
    TheMetamask,
    TheTimeline
  },
  computed: {
    ...mapGetters(['getUser'])
  }
}
</script>
