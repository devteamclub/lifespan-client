<template>
  <div class="metamask">
    <div v-if="!address" @click="isShow = true">
      CONNECT
    </div>
    <div v-else>
      <div class="wallet">
        <div class="icon">
          <div :class="{ icon, iconTheme }">
            <img
              src="../assets/images/child.png"
              :alt="icon"
              class="image"
            >
          </div>
          <div :class="iconTheme" />
        </div>

        <div
          ref="openerRef"
          class="opener"
        >
          <div class="info">
            <div class="top">
              <div class="title">
                {{ title }}
              </div>
              {{ address }}
            </div>
            <div
              class="status"
              :class="statusClass"
            >
              {{ status }}
            </div>
          </div>
          <div class="button">
            <img
              src="../../public/images/arrow-bottom.svg"
              class="arrow"
              :class="{ inverted: isModalOpen }"
              alt="arrow bottom"
            >
          </div>
        </div>
        <!--{modal()}-->
      </div>
    </div>
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
      iconTheme: '',
      status: '',
      title: '',
      statusClass: '',
      isModalOpen: false,
      state: 'USER_FOUND',
      gender: 'MALE',
      address: '',
      icon: ''
    }
  },
  computed: {
    getIconUrl() {
      return '../assets/images/child.png'
    }
  },
  created() {
    this.validateState()
  },
  methods: {
    onComplete(data) {
      this.address = data.metaMaskAddress
    },
    validateState() {
      switch (this.state) {
        case 'DISCONNECTED':
          this.title = 'Hey,'
          this.status = 'You are disconnected'
          this.iconTheme = 'WARNING'
          this.icon = 'alert'
          this.statusClass = 'error'
          break
        case 'WRONG_NETWORK':
          this.title = 'Hey,'
          this.status = 'Wrong network!'
          this.iconTheme = 'WARNING'
          this.icon = 'alert'
          this.statusClass = 'error'
          break
        case 'USER_NOT_FOUND':
          this.title = 'No account'
          this.status = 'Sign up to continue'
          this.iconTheme = 'ERROR'
          this.icon = 'skull'
          this.statusClass = 'error'
          break
        case 'USER_FOUND':
          this.title = ''
          this.status = 'Connected to'
          this.iconTheme = this.gender || 'ERROR'
          this.icon = this.gender && 'child'
          this.statusClass = 'success'
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

    .info {
      .top {
        align-items: baseline;
        display: flex;

        .title {
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

  .status {
    border: solid 2px #fff;
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

    .female {
      background-image: linear-gradient(315deg, #ffd8c8, #fba2e3);
    }

    .male {
      background-image: linear-gradient(135deg, #b29cf6, #a1ead6);
    }
  }
}
</style>
