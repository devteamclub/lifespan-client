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
              {{ status }} {{ networkName }}
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
import { mapActions } from 'vuex'

export default {
  components: { WalletModal },
  data () {
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
    isValidAddress () {
      return this.address && this.address.length === this.requiredAddressLength
    },
    formattedAddress () {
      if (!this.isValidAddress) return

      return `${this.address.substring(0, 6)}...${this.address.substring(this.address.length - 4, this.address.length)}`
    }
  },
  async created () {
    const { data: user } = await api.users.getUser()
    // TODO: user getUser instead of userProfile
    if (user) {
      this.setUser(user)
      this.userProfile = user
      await this.$refs.walletModal.$refs.metamask.init()
    }
    this.validateState()
  },
  methods: {
    ...mapActions(['setUserMetamaskAddress', 'setUser']),
    async switchAccount () {
      if (!this.metamaskData) return
      await window.ethereum.request({
        method: 'wallet_requestPermissions',
        params: [{
          eth_accounts: {}
        }]
      })

      // eslint-disable-next-line handle-callback-err
      window.web3.eth.getAccounts(async (err, accounts) => {
        this.metamaskData.metaMaskAddress = accounts[0]
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
      })
    },
    async registrationNewUser (metamaskData) {
      let userProfile
      const { data: plushUserProfile } = await api.users.getUserProfile()
      userProfile = plushUserProfile
      if (!this.userProfile) {
        const signature = await this.getNonceAndSignMessage(metamaskData)
        await this.loginUserToPlushSystem(metamaskData.metaMaskAddress, signature)
        const { data: plushUserProfile } = await api.users.getUserProfile()
        userProfile = plushUserProfile
      }
      const { data: user } = await api.users.registrationNewUser(userProfile.childs[0])
      this.setUser(user)
      // TODO: user getUser instead of userProfile
      this.userProfile = user
    },
    async onComplete (metamaskData) {
      this.setUserMetamaskAddress(metamaskData.metaMaskAddress)
      this.metamaskData = metamaskData
      this.closeModal()
      const { data: isUserExist } = await api.users.checkUserExist()
      if (isUserExist) {
        const { data: user } = await api.users.getUser()
        this.setUser(user)
        // TODO: user getUser instead of userProfile
        this.userProfile = user
      } else {
        await this.registrationNewUser(metamaskData)
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
    async signMessage (data, nonce) {
      const message = `Please sign this message to connect to Plush. Nonce: ${nonce}`
      return await data.web3.eth.personal.sign(message, data.metaMaskAddress.toLowerCase())
    },
    async getNonceAndSignMessage (metamaskData) {
      const { data: { nonce } } = await api.users.getNonce(metamaskData.metaMaskAddress)
      return await this.signMessage(metamaskData, nonce)
    },
    async loginUserToPlushSystem (publicAddress, signature) {
      const messageResult = { publicAddress, signature }
      await api.users.userLogin(messageResult)
    },
    closeModal () {
      this.isShowModal = false
    },
    validateState () {
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
          this.title = this.userProfile.name || 'Hey,'
          this.status = 'Connected to'
          this.iconTheme = this.userProfile.gender.toLowerCase() || 'alert'
          this.icon = this.userProfile.gender && 'child'
          this.statusClass = 'success'
          this.modalType = 'SwitchAccountModal'
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wallet-chip {
  position: relative;
  display: flex;

  .opener {
    display: flex;
    margin-left: 12px;

    &:hover {
      cursor: pointer;
    }

    .wallet-info {
      .top {
        display: flex;
        align-items: baseline;

        .wallet-title {
          color: #26272a;
          font-weight: 500;
          font-size: 16px;
          line-height: 1.25;
          user-select: none;
        }

        .address {
          margin-left: 10px;
        }
      }

      .status {
        margin-top: 2px;
        font-size: 12px;
        line-height: 1.33;
        background-color: transparent !important;
        user-select: none;

        &.error {
          color: #c234e5;
        }

        &.success {
          color: #5f36ea;
        }
      }
    }

    .button {
      display: flex;
      justify-content: center;
      width: 32px;
      height: 40px;
      user-select: none;

      .arrow {
        width: 17px;
        height: 16px;
        margin-top: 4px;
        transition: transform 0.2s ease-in-out;

        &.inverted {
          transform: rotate(-180deg);
        }
      }
    }
  }

  .icon {
    position: relative;
    width: 40px;
    height: 40px;
  }

  .connection-status {
    position: absolute;
    top: 24px;
    left: 34px;
    box-sizing: border-box;
    width: 12px;
    height: 12px;
    border: solid 2px #fff !important;
    border-radius: 50%;

    &.error {
      background-color: #d959f8;
    }

    &.success {
      background-color: #34caa7;
    }
  }

  .skull {
    padding: 6px;
    background-image: linear-gradient(135deg, #d691ed, #99d9f4);
    border-radius: 12px;
  }

  .image {
    display: block;
    width: 28px;
    height: 28px;
  }

  .alert {
    padding: 6px;
    background-image: linear-gradient(135deg, #ffacbd, #e4bbfd);
    border-radius: 12px;
  }

  .child {
    padding: 6px;
    border-radius: 12px;

    &.female {
      background-image: linear-gradient(315deg, #ffd8c8, #fba2e3);
    }

    &.male {
      background-image: linear-gradient(135deg, #b29cf6, #a1ead6);
    }
  }

  .address {
    color: #73757c;
    font-size: 12px;
    line-height: 1.4;
    user-select: none;

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
