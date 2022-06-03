<template>
  <div class="wrapper">
    <div class="card">
      <div class="cardContentContainer">
        <img
          :src="icon"
          class="icon"
          alt="app icon"
        >
        <div class="cardTextContainer">
          <div class="title">
            {{ name }}
          </div>
          <div class="description">
            {{ description }}
          </div>
        </div>
      </div>
      <div class="actionContainer">
        <div class="detailsButton">
          <img
            src="/images/arrow-right.svg"
            class="detailsButtonIconClassName"
            alt="arrow right icon"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppCard',
  props: {
    name: {
      type: String,
      required: false,
      default: ''
    },
    description: {
      type: String,
      required: false,
      default: ''
    },
    icon: {
      type: String,
      required: false,
      default: '/images/default-app.svg'
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  background-color: #F5F5F6;
  border: solid 2px transparent;
  border-radius: 16px;
  box-shadow:
    0 2px 4px 0 rgba(0, 0, 0, 0.06),
    0 1px 2px 0 rgba(0, 0, 0, 0.06);
  transition: all 150ms ease-in-out;
  user-select: none;

  &:hover {
    background-color: #FAFAFA;
    background-image: linear-gradient(to top, rgba(255, 255, 255, 0) 100%, rgba(255, 255, 255, 0.7) 0%);
    border: solid 2px #fff;
    box-shadow:
      0 1px 1px 0 rgba(0, 0, 0, 0.02),
      0 1px 2px 0 rgba(0, 0, 0, 0.02),
      0 2px 4px 0 rgba(0, 0, 0, 0.03),
      0 4px 4px -1px rgba(0, 0, 0, 0.04),
      0 8px 12px -2px rgba(0, 0, 0, 0.03);
    cursor: pointer;
  }

  &.open {
    background-color: white;

    &:hover {
      border: solid 2px transparent;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.06), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
      cursor: default;
    }
  }
}

.card {
  width: 100%;
  align-items: center;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  padding: 24px 20px 24px 24px;

  &:hover {
    cursor: pointer;
  }
}

.cardContentContainer {
  align-items: center;
  display: flex;
}

.icon {
  height: 48px;
  width: 48px;
}

.cardTextContainer {
  box-sizing: border-box;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.title {
  color: #26272A;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.33;
  font-family: Avenir Next Rounded Pro, sans-serif;
}

.description {
  color: #73757c;
  font-size: 16px;
  letter-spacing: -0.2px;
  line-height: 1.5;
  font-family: Avenir Next Rounded Pro, sans-serif;
}

.actionContainer {
  padding-left: 16px;
}

.detailsButton {
  align-items: center;
  border-radius: 50%;
  display: flex;
  height: 48px;
  justify-content: center;
  width: 48px;
}

.detailsButtonIcon {
  height: 20px;
  transform: rotate(90deg);
  transition: all 150ms ease-in-out;
  width: 20px;

  &.open {
    transform: rotate(270deg);
  }
}
</style>
