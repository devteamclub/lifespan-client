<template>
  <v-app id="app">
    <v-main>
      <TheMetamask />
      <TheTimeline v-if="getUser" />
    </v-main>
  </v-app>
</template>

<script>
import TheTimeline from '@/components/TheTimeline'
import TheMetamask from '@/components/TheWallet'

export default {
  name: 'App',
  components: {
    TheTimeline,
    TheMetamask
  }
}
</script>

<style lang="scss">
@import '@/assets/style/global.scss';

.content-wrapper {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  height: 100%;
}
</style>
