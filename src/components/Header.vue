<template>
  <header class="header">
    <div class="wrapper">
      <router-link to="/">
        <img
          class="logo"
          src="/images/logo/image.png"
          srcset="/images/logo/image@2x.png 2x, /images/logo/image@3x.png 3x"
          alt="icon"
        >
      </router-link>
      <div class="right">
        <TheMetamask />
      </div>
    </div>
  </header>
</template>

<script>
import TheMetamask from '@/components/TheWallet'

export default {
  name: 'Header',
  components: {
    TheMetamask
  }
}
</script>

<style lang="scss" scoped>
  .header {
    padding: 20px;
    box-sizing: border-box;

    .wrapper {
      min-width: 320px;
      max-width: 1440px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;

      .logo {
        width: 25px;
        height: 34px;
      }
    }
  }
</style>
