<template>
  <div class="metamask">
    <div>
      <div class="wallet">
        <div class="icon">
          <div :class="[icon, iconTheme]">
            <v-img
              :src="`/images/${icon}.png`"
              :alt="icon"
              class="image"
            />
          </div>
          <div :class="iconTheme" />
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
              src="@/assets/images/arrow-bottom.svg"
              class="arrow"
              :class="{ inverted: isModalOpen }"
              alt="arrow bottom"
            >
          </div>
        </div>
        <WalletModal
          v-if="isShowModal"
          :network-name="networkName"
          :address="formattedAddress"
          :modal-type="modalType"
          @onComplete="onComplete"
        />
      </div>
    </div>
  </div>
</template>

<script>
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
      isModalOpen: false,
      state: 'USER_NOT_FOUND',
      gender: 'male',
      address: '',
      icon: '',
      modalType: '',
      requiredAddressLength: 42,
      networkName: ''
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
  created() {
    this.validateState()
  },
  methods: {
    onComplete(data) {
      this.isShowModal = false
      console.log(data)
      if (data.type === 'NO_LOGIN') {
        this.state = 'DISCONNECTED'
        this.address = ''
        console.log(1)
      } else {
        console.log(2)
        this.networkName = data.type
        this.state = 'USER_FOUND'
        this.address = data.metaMaskAddress
      }
      this.validateState()
    },
    validateState() {
      switch (this.state) {
        case 'DISCONNECTED':
          this.title = 'Hey,'
          this.status = 'You are disconnected'
          this.iconTheme = 'WARNING'
          this.icon = 'alert'
          this.statusClass = 'error'
          this.modalType = 'ConnectModal'
          this.address = ''
          this.networkName = ''
          break
        case 'WRONG_NETWORK':
          this.title = 'Hey,'
          this.status = 'Wrong network!'
          this.iconTheme = 'WARNING'
          this.icon = 'alert'
          this.statusClass = 'error'
          this.modalType = 'WrongNetworkModal'
          this.address = ''
          this.networkName = ''
          break
        case 'USER_NOT_FOUND':
          this.title = 'No account'
          this.status = 'Sign up to continue'
          this.iconTheme = 'ERROR'
          this.icon = 'skull'
          this.statusClass = 'error'
          this.modalType = 'RegisterModal'
          break
        case 'USER_FOUND':
          this.title = 'Jessica'
          this.status = 'Connected to'
          this.iconTheme = this.gender || 'ERROR'
          this.icon = this.gender && 'child'
          this.statusClass = 'success'
          this.modalType = 'SwitchAccountModal'
          break
      }
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

.wallet {
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

  .switchAccountModal, .wrongNetworkModal, .registerModal, .connectModal {
    position: absolute;
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

    &.female {
      background-image: linear-gradient(315deg, #ffd8c8, #fba2e3);
    }

    &.male {
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
