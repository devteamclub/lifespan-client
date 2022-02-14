<template>
  <v-app id="app">
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
      testUserId: 10
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

.content-wrapper {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  height: 100%;
}
</style>
