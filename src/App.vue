<template>
  <v-app id="app">
    <v-app-bar app height="100" color="var(--primary-background-color)" />
    <v-main>
      <TheTimeline />
    </v-main>
  </v-app>
</template>

<script>
import TheTimeline from '@/components/TheTimeline'

export default {
  name: 'App',
  components: {
    TheTimeline
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
