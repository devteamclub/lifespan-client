<template>
  <div class="wallet-modal">
    <div>
      <v-img
        src="images/close.svg"
        alt="close icon"
        class="closer"
      />
      <div class="content">
        <template v-if="isSwitchModal">
          <div class="connection-status">
            1
          </div>
          <div class="wallet-info">
            <div class="address-container">
              <div>{{ address }}</div>
              <v-img
                src="images/copy.svg"
                alt="copy icon"
                class="copied"
              />
            </div>
            <div class="status">
              {{ hint }}
            </div>
          </div>
        </template>
        <template v-else>
          <div class="title">
            {{ title }}
          </div>
          <div class="hint">
            {{ hint }}
          </div>
        </template>
      </div>
    </div>
    <button
      class="button connect-button"
      @click="connectWallet"
    >
      {{ buttonText }}
    </button>
    <VueMetamask
      v-if="isConnect"
      @onComplete="onComplete"
    />
  </div>
</template>

<script>
import VueMetamask from 'vue-metamask'

export default {
  name: 'WalletModal',
  components: { VueMetamask },
  props: {
    modalType: {
      type: String,
      required: true
    },
    networkName: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      isConnect: false,
      title: '',
      hint: '',
      buttonText: ''
    }
  },
  computed: {
    isSwitchModal() {
      console.log(this.modalType)
      return this.modalType === 'SwitchAccountModal'
    }
  },
  created() {
    this.validateState()
  },
  methods: {
    validateState() {
      switch (this.modalType) {
        case 'RegisterModal':
          this.title = 'Plush account is required'
          this.hint = 'If you already have a Plush account, try switching between your Metamask wallets. Otherwise, please visit Plush website to learn more about Plush, and create your account.'
          this.buttonText = 'Sign up'
          break
        case 'SwitchAccountModal':
          this.title = ''
          this.hint = 'View on Explorer'
          this.buttonText = 'Switch account'
          break
        case 'WrongNetworkModal':
          this.title = ''
          this.hint = 'Please connect your wallet to {expectedNetworkName} Network to start using the app.'
          this.buttonText = 'Sign up'
          break
        case 'ConnectModal':
          this.title = 'Metamask connection is required'
          this.hint = `Please connect your wallet to ${this.networkName} Network to start using the app.`
          this.buttonText = 'Connect'
      }
    },
    onComplete(data) {
      this.$emit('onComplete', data)
    },
    connectWallet() {
      this.isConnect = true
    }
  }
}
</script>

<style lang="scss" scoped>
.wallet-modal {
  position: absolute;
  top: 62px;
  transition: .2s ease-in-out;
  background: white;
  border-radius: 24px;
  box-shadow:
    0 2px 2px -1px rgba(0, 0, 0, 0.02),
    0 8px 8px -2px rgba(0, 0, 0, 0.02),
    0 16px 16px -4px rgba(0, 0, 0, 0.03),
    0 32px 32px -8px rgba(0, 0, 0, 0.04),
    0 64px 64px -12px rgba(0, 0, 0, 0.03);
  box-sizing: border-box;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 488px;
}

.content {
  align-items: center;
  display: flex;
  flex-direction: column;
}

.title {
  color: #26272a;
  font-size: 22px;
  line-height: 1.45;
  margin-top: 16px;
  text-align: center;
}

.wallet-info {
  margin-left: 12px;
}

.address-container {
  align-items: center;
  display: flex;
  color: #26272a;
  font-size: 18px;
  line-height: 1.33;

  .copy-button {
    margin-lefT: 4px;
  }
}

.status {
  color: #5f36ea;
  font-size: 12px;
  line-height: 1.33;
  margin-top: 2px;
  user-select: none;
  cursor: pointer;
}

.hint {
  color: #26272a;
  font-size: 18px;
  line-height: 1.33;
  margin-top: 4px;
  text-align: center;
  width: 424px;
}

.connect-button {
  margin-top: 34px;
}

.button {
  background-color: rgba(#7c5cff, 0.04);
  border: none;
  border-radius: 160px;
  box-shadow: inset 0 -1px 0 0 rgba(#7c5cff, 0.1);
  color: #7c5cff;
  font-size: 16px;
  letter-spacing: -0.2px;
  line-height: 1.5;
  outline: 0;
  padding: 16px;
  transition: background-color 0.2s ease-in-out;
  width: 100%;

  &:hover {
    background-color: rgba(#7c5cff, 0.09);
    cursor: pointer;
  }
}

.copied {
  height: 16px;
  width: 16px;
  cursor: pointer;
  opacity: 0.5;
  margin-left: 4px;
}

.closer {
  height: 16px;
  position: absolute;
  right: 16px;
  top: 16px;
  width: 16px;
  cursor: pointer;

}
</style>
