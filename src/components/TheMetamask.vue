<template>
  <div class="metamask">
    <div @click="isShow = true">CONNECT</div>
    <VueMetamask
      v-if="isShow"
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
      msg: 'This is demo net work'
    }
  },
  methods: {
    onComplete(data) {
      console.log('data:', data)
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
