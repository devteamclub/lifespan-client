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
      <div class="right-column">
        <router-link
          v-if="getUser && getUser.gender === 'MALE'"
          class="birthday-link"
          to="/"
        >
          <img
            class="birthday-icon"
            src="/images/birthday-gift.svg"
            alt="icon"
          >
        </router-link>
        <TheMetamask class="wallet" />
      </div>
    </div>
  </header>
</template>

<script>
import TheMetamask from '@/components/TheWallet'
import { mapGetters } from 'vuex'

export default {
  name: 'Header',
  components: {
    TheMetamask
  },
  computed: {
    ...mapGetters(['getUser'])
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

      .right-column {
        display: flex;
        align-items: center;

        .birthday-link {
          .birthday-icon {
            width: 40px;
            height: 40px;
          }
        }

        .wallet {
          margin-left: 20px;
        }
      }
    }
  }
</style>
