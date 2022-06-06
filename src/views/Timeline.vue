<template>
  <div>
    <TheHeader />
    <TheTimeline v-if="getUser" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TheHeader from '@/components/Header'
import TheTimeline from '@/components/TheTimeline'

export default {
  components: {
    TheHeader,
    TheTimeline
  },
  computed: {
    ...mapGetters(['getUser'])
  }
}
</script>
