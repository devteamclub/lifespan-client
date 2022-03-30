<template>
  <div class="metamask">
    <div v-if="!token" @click="isShow = true">CONNECT</div>
    <div v-else>
      {{ token }}
    </div>
    <VueMetamask
      v-if="isShow"
      userMessage="msg"
      @onComplete="onComplete"
    />
  </div>
</template>

<script>
import VueMetamask from 'vue-metamask'
export default {
  components: { VueMetamask },
  data() {
    return {
      isShow: false,
      token: null
    }
  },
  methods: {
    onComplete(data) {
      this.token = data.metaMaskAddress
      console.log(data)
    }
  }
}
</script>

<style lang="scss" scoped>
.metamask {
  position: fixed;
  left: 110px;
  top: 110px;
  z-index: 11;
}
</style>
