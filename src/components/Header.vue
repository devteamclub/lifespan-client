<template>
  <header class="header">
    <div class="wrapper">
      <TheMetamask />
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
  .wrapper {
    max-width: 1440px;
    margin: 0 auto;
  }

  .header {
    padding: 20px;
    box-sizing: border-box;
  }
</style>
