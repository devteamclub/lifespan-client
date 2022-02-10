<template>
  <v-app id="app">
    <!--    <v-app-bar-->
    <!--      app-->
    <!--      height="80"-->
    <!--      color="var(&#45;&#45;primary-background-color)"-->
    <!--      class="header"-->
    <!--    />-->
    <v-main>
      <TheTimeline v-if="getUser" />
    </v-main>
  </v-app>
</template>

<script>
import api from '@/api'
import { mapActions, mapGetters } from 'vuex'
import TheTimeline from '@/components/TheTimeline'

export default {
  name: 'App',
  components: {
    TheTimeline
  },
  data() {
    return {
      testUserId: 8
    }
  },
  computed: {
    ...mapGetters(['getUser'])
  },
  created() {
    if (!this.getUser) this.fetchUser()
  },
  methods: {
    ...mapActions(['setUser']),
    async fetchUser() {
      const { data } = await api.users.getUser(this.testUserId)
      if (data) this.setUser(data)
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/style/global.scss';

.header.v-app-bar.v-app-bar--fixed {
  z-index: 100;
}

.content-wrapper {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  height: 100%;
}
</style>
