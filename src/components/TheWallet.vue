<template>
  <div class="wallet">
    <div>
      <div class="wallet-chip">
        <div class="icon">
          <div :class="[icon, iconTheme]">
            <v-img
              :src="`/images/${icon}.png`"
              :alt="icon"
              class="image"
            />
          </div>
        </div>

        <div
          ref="openerRef"
          class="opener"
          @click="isShowModal = !isShowModal"
        >
          <div class="wallet-info">
            <div class="top">
              <div class="wallet-title">
                {{ title }}
              </div>
              <div class="address">
                {{ formattedAddress }}
              </div>
            </div>
            <div
              class="connection-status"
              :class="statusClass"
            />
            <div
              class="status"
              :class="statusClass"
            >
              {{ status }}
              <span class="network-name">{{ networkName }}</span>
            </div>
          </div>
          <div class="button">
            <img
              src="/images/arrow-bottom.svg"
              class="arrow"
              :class="{ inverted: isShowModal }"
              alt="arrow bottom"
            >
          </div>
        </div>
        <WalletModal
          ref="walletModal"
          :is-show="isShowModal"
          :network-name="networkName"
          :formatted-address="formattedAddress"
          :address="address"
          :modal-type="modalType"
          @onComplete="onComplete"
          @switchAccount="switchAccount"
          @close="closeModal"
        />
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import WalletModal from '@/components/WalletModal'

export default {
  components: { WalletModal },
  data() {
    return {
      isShowModal: false,
      iconTheme: '',
      status: '',
      title: '',
      statusClass: '',
      state: 'USER_NOT_FOUND',
      gender: 'male',
      address: '',
      icon: '',
      modalType: '',
      requiredAddressLength: 42,
      networkName: '',
      userProfile: null,
      metamaskData: null
    }
  },
  computed: {
    isValidAddress() {
      return this.address && this.address.length === this.requiredAddressLength
    },
    formattedAddress() {
      if (!this.isValidAddress) return

      return `${this.address.substring(0, 6)}...${this.address.substring(this.address.length - 4, this.address.length)}`
    }
  },
  async created() {
    const { data } = await api.users.getUserProfile()
    if (data) await this.$refs.walletModal.$refs.metamask.init()
    this.validateState()
  },
  methods: {
    async switchAccount() {
      if (!this.metamaskData) return
      const [data] = await window.ethereum.request({
        method: 'wallet_requestPermissions',
        params: [{
          eth_accounts: {}
        }]
      })
      this.metamaskData.metaMaskAddress = data.caveats[0].value[0]
      const signature = await this.getNonceAndSignMessage(this.metamaskData)
      await this.loginUserToPlushSystem(this.metamaskData.metaMaskAddress, signature)
      const { data: userProfile } = await api.users.getUserProfile()
      this.userProfile = userProfile
      // TODO: dry
      if (this.metamaskData.type === 'NO_LOGIN') {
        this.state = 'DISCONNECTED'
        this.address = ''
      } else {
        this.networkName = this.metamaskData.type
        this.state = 'USER_FOUND'
        this.address = this.metamaskData.metaMaskAddress
      }
      this.validateState()
    },
    async onComplete(metamaskData) {
      this.metamaskData = metamaskData
      this.closeModal()
      const { data } = await api.users.getUserProfile()
      this.userProfile = data
      if (!this.userProfile) {
        const signature = await this.getNonceAndSignMessage(metamaskData)
        console.log(signature)
        await this.loginUserToPlushSystem(metamaskData.metaMaskAddress, signature)
        const { data } = await api.users.getUserProfile()
        this.userProfile = data
      }
      if (metamaskData.type === 'NO_LOGIN') {
        this.state = 'DISCONNECTED'
        this.address = ''
      } else {
        this.networkName = metamaskData.type
        this.state = 'USER_FOUND'
        this.address = metamaskData.metaMaskAddress
      }
      this.validateState()
    },
    async signMessage(data, nonce) {
      const message = `Please sign this message to connect to Plush. Nonce: ${nonce}`
      return await data.web3.eth.personal.sign(message, data.metaMaskAddress.toLowerCase())
    },
    async getNonceAndSignMessage(metamaskData) {
      const { data: { nonce } } = await api.users.getNonce(metamaskData.metaMaskAddress)
      return await this.signMessage(metamaskData, nonce)
    },
    async loginUserToPlushSystem(publicAddress, signature) {
      const messageResult = { publicAddress, signature }
      await api.users.userLogin(messageResult)
    },
    closeModal() {
      this.isShowModal = false
    },
    validateState() {
      switch (this.state) {
        case 'DISCONNECTED':
          this.title = 'Hey,'
          this.status = 'You are disconnected'
          this.iconTheme = 'skull'
          this.icon = 'alert'
          this.statusClass = 'error'
          this.modalType = 'ConnectModal'
          this.address = ''
          this.networkName = ''
          break
        case 'WRONG_NETWORK':
          this.title = 'Hey,'
          this.status = 'Wrong network!'
          this.iconTheme = 'alert'
          this.icon = 'alert'
          this.statusClass = 'error'
          this.modalType = 'WrongNetworkModal'
          this.address = ''
          this.networkName = ''
          break
        case 'USER_NOT_FOUND':
          this.title = 'No account'
          this.status = 'Sign up to continue'
          this.iconTheme = 'alert'
          this.icon = 'skull'
          this.statusClass = 'error'
          this.modalType = 'RegisterModal'
          break
        case 'USER_FOUND':
          this.title = this.userProfile.childs[0].name || 'Hey,'
          this.status = 'Connected to'
          this.iconTheme = this.userProfile.childs[0].gender || 'alert'
          this.icon = this.userProfile.childs[0].gender && 'child'
          this.statusClass = 'success'
          this.modalType = 'SwitchAccountModal'
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wallet {
  position: fixed;
  left: 195px;
  top: 10px;
  z-index: 11;
}

.wallet-chip {
  display: flex;
  position: relative;

  .opener {
    display: flex;
    margin-left: 12px;

    &:hover {
      cursor: pointer;
    }

    .wallet-info {
      .top {
        align-items: baseline;
        display: flex;

        .wallet-title {
          color: #26272a;
          font-size: 16px;
          font-weight: 500;
          line-height: 1.25;
          user-select: none;
        }

        .address {
          margin-left: 10px;
        }
      }

      .status {
        font-size: 12px;
        line-height: 1.33;
        margin-top: 2px;
        user-select: none;
        background-color: transparent !important;

        &.error {
          color: #c234e5;
        }

        &.success {
          color: #5f36ea;
        }
      }

      .network-name {
        text-transform: lowercase;
      }
    }

    .button {
      display: flex;
      height: 40px;
      justify-content: center;
      user-select: none;
      width: 32px;

      .arrow {
        height: 16px;
        margin-top: 4px;
        transition: transform .2s ease-in-out;
        width: 17px;

        &.inverted {
          transform: rotate(-180deg);
        }
      }
    }
  }

  .icon {
    height: 40px;
    position: relative;
    width: 40px;
  }

  .connection-status {
    border: solid 2px #fff !important;
    border-radius: 50%;
    box-sizing: border-box;
    height: 12px;
    left: 34px;
    position: absolute;
    top: 24px;
    width: 12px;

    &.error {
      background-color: #d959f8;
    }

    &.success {
      background-color: #34caa7;
    }
  }

  .skull {
    background-image: linear-gradient(135deg, #d691ed, #99d9f4);
    border-radius: 12px;
    padding: 6px;
  }

  .image {
    display: block;
    height: 28px;
    width: 28px;
  }

  .alert {
    background-image: linear-gradient(135deg, #ffacbd, #e4bbfd);
    border-radius: 12px;
    padding: 6px;
  }

  .child {
    border-radius: 12px;
    padding: 6px;

    &.FEMALE {
      background-image: linear-gradient(315deg, #ffd8c8, #fba2e3);
    }

    &.MALE {
      background-image: linear-gradient(135deg, #b29cf6, #a1ead6);
    }
  }
  .address {
    user-select: none;
    color: #73757c;
    font-size: 12px;
    line-height: 1.4;

    &.primary {
      color: #73757c;
      font-size: 12px;
      line-height: 1.4;
    }

    &.secondary {
      color: #26272a;
      font-size: 18px;
      line-height: 1.33;
    }
  }
}
</style>
