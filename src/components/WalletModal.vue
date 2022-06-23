<template>
  <div
    class="wallet-modal"
    :class="{ show: isShow }"
  >
    <div>
      <v-img
        src="/images/close.svg"
        alt="close icon"
        class="closer"
        @click="$emit('close')"
      />
      <div class="content">
        <div
          v-if="isSwitchModal"
          class="d-flex align-center"
        >
          <div class="connection-status">
            <div class="icon-row">
              <v-img
                src="/images/metamask.svg"
                alt="metamask icon"
                size="28px"
                height="26px"
                contain
              />
            </div>
            <v-img
              src="/images/connected.svg"
              alt="status icon"
              class="status-icon"
            />
            <div class="icon-row">
              <v-img
                src="/images/polygon.svg"
                alt="network icon"
                width="28px"
                height="26px"
                contain
              />
            </div>
          </div>
          <div class="wallet-info">
            <div class="address-container">
              <div>{{ formattedAddress }}</div>
              <v-img
                src="/images/copy.svg"
                alt="copy icon"
                class="copy-icon"
                :class="{ copied: isCopied }"
                @click="copyAddress"
              />
            </div>
            <div class="status">
              {{ hint }}
            </div>
          </div>
        </div>
        <div v-else-if="isWrongNetworkModal">
          <div class="modal-title">
            {{ title }}
          </div>
          <div class="connection-status">
            <div class="icon-row">
              <v-img
                src="/images/metamask.svg"
                alt="metamask icon"
                size="28px"
                height="26px"
                contain
              />
            </div>
            <div>
              <v-img
                src="/images/disconnected.svg"
                alt="status icon"
                class="status-icon"
                width="28px"
                contain
              />
            </div>
            <div class="icon-row">
              <v-img
                src="/images/polygon.svg"
                alt="network icon"
                width="28px"
                height="26px"
                contain
              />
            </div>
          </div>
          <div class="hint">
            {{ hint }}
          </div>
        </div>
        <template v-else>
          <div class="modal-title">
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
    <AppMetamask
      ref="metamask"
      @onComplete="onComplete"
    />
  </div>
</template>

<script>
import AppMetamask from '@/components/AppMetamask'

export default {
  name: 'WalletModal',
  components: { AppMetamask },
  props: {
    isShow: {
      type: Boolean,
      required: true
    },
    modalType: {
      type: String,
      required: true
    },
    networkName: {
      type: String,
      required: true
    },
    formattedAddress: {
      type: String,
      required: false,
      default: ''
    },
    address: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      isConnect: false,
      title: '',
      hint: '',
      buttonText: '',
      isCopied: false
    }
  },
  computed: {
    isSwitchModal () {
      return this.modalType === 'SwitchAccountModal'
    },
    isWrongNetworkModal () {
      return this.modalType === 'WrongNetworkModal'
    }
  },
  watch: {
    isShow () {
      this.validateState()
    }
  },
  mounted () {
    this.$refs.metamask.init()
  },
  methods: {
    copyAddress () {
      if (this.isCopied) return
      this.isCopied = true
      setTimeout(() => (this.isCopied = false), 1000)
      navigator.clipboard.writeText(this.address)
    },
    validateState () {
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
          this.title = 'Wrong network detected'
          this.hint = `Please connect your wallet to ${this.networkName || 'correct'} Network to start using the app.`
          this.buttonText = `Switch to ${this.networkName || 'another network'}`
          break
        case 'ConnectModal':
          this.title = 'Metamask connection is required'
          this.hint = `Please connect your wallet to ${this.networkName} Network to start using the app.`
          this.buttonText = 'Connect'
      }
    },
    async onComplete (data) {
      this.$emit('onComplete', data)
    },
    connectWallet () {
      if (this.isSwitchModal) {
        this.$emit('switchAccount')
      } else {
        this.$refs.metamask.init(true)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wallet-modal {
  position: absolute;
  top: 62px;
  right: 0;
  z-index: 14;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  width: 488px;
  padding: 16px;
  background: white;
  border-radius: 24px;
  box-shadow:
    0 2px 2px -1px rgb(0 0 0 / 2%),
    0 8px 8px -2px rgb(0 0 0 / 2%),
    0 16px 16px -4px rgb(0 0 0 / 3%),
    0 32px 32px -8px rgb(0 0 0 / 4%),
    0 64px 64px -12px rgb(0 0 0 / 3%);
  visibility: hidden;
  opacity: 0;
  transition: 0.2s ease-in-out;

  &.show {
    visibility: visible;
    opacity: 1;
  }
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
}

.modal-title {
  margin-top: 16px;
  color: #26272a;
  font-weight: 600;
  font-size: 22px;
  line-height: 1.45;
  text-align: center;
}

.wallet-info {
  margin-left: 12px;
}

.address-container {
  display: flex;
  align-items: center;
  color: #26272a;
  font-size: 18px;
  line-height: 1.33;

  .copy-button {
    margin-left: 4px;
  }
}

.status {
  margin-top: 2px;
  color: #5f36ea;
  font-size: 12px;
  line-height: 1.33;
  cursor: pointer;
  user-select: none;
}

.hint {
  margin-top: 4px;
  color: #26272a;
  font-size: 18px;
  line-height: 1.33;
  text-align: center;
}

.connect-button {
  margin-top: 34px;
}

.button {
  width: 100%;
  padding: 16px;
  color: #7c5cff;
  font-weight: 600;
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: -0.2px;
  background-color: rgba(#7c5cff, 0.04);
  border: none;
  border-radius: 160px;
  outline: 0;
  box-shadow: inset 0 -1px 0 0 rgba(#7c5cff, 0.1);
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: rgba(#7c5cff, 0.09);
    cursor: pointer;
  }
}

.copy-icon {
  width: 16px;
  height: 16px;
  margin-left: 4px;
  cursor: pointer;
  opacity: 1;

  &.copied {
    cursor: default;
    opacity: 0.5;
  }
}

.closer {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.connection-status {
  display: flex;
  align-items: center;
  justify-content: center;

  .status-icon {
    width: 28px;
    height: 28px;
    margin-right: 2px;
    margin-left: 2px;
  }

  .icon-row {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    background-color: #fafafa;
    border-radius: 50%;
    user-select: none;

    .icon {
      width: 28px;
      height: 26px;
    }
  }
}
</style>
