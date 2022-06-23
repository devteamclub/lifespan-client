<template>
  <a
    :class="active ? 'active' : ''"
    class="wrapper"
    :href="url"
    :target="target"
  >
    <div class="card">
      <div class="card-content-container">
        <img
          :src="icon"
          class="icon"
          alt="app icon"
        >
        <div class="card-text-container">
          <div class="title">
            {{ name }}
          </div>
          <div class="description">
            {{ description }}
          </div>
        </div>
      </div>
      <div class="action-container">
        <div class="details-button">
          <img
            v-if="active"
            src="/images/arrow-right.svg"
            class="details-button-icon"
            alt="arrow right icon"
          >
        </div>
      </div>
    </div>
  </a>
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
    },
    url: {
      type: String,
      required: false,
      default: ''
    },
    target: {
      type: String,
      required: false,
      default: '_self'

    },
    active: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  background-color: #f5f5f6;
  border: solid 2px transparent;
  border-radius: 16px;
  box-shadow:
    0 2px 4px 0 rgb(0 0 0 / 6%),
    0 1px 2px 0 rgb(0 0 0 / 6%);
  cursor: default;
  transition: all 150ms ease-in-out;
  user-select: none;

  &.active {
    &:hover {
      background-color: #fafafa;
      background-image: linear-gradient(to top, rgb(255 255 255 / 0%) 100%, rgb(255 255 255 / 70%) 0%);
      border: solid 2px #fff;
      box-shadow:
        0 1px 1px 0 rgb(0 0 0 / 2%),
        0 1px 2px 0 rgb(0 0 0 / 2%),
        0 2px 4px 0 rgb(0 0 0 / 3%),
        0 4px 4px -1px rgb(0 0 0 / 4%),
        0 8px 12px -2px rgb(0 0 0 / 3%);
      cursor: pointer;
    }
  }
}

.card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  width: 100%;
  padding: 24px 20px 24px 24px;
}

.card-content-container {
  display: flex;
  align-items: center;
}

.icon {
  width: 48px;
  height: 48px;
}

.card-cext-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  padding-left: 20px;
}

.title {
  color: #26272a;
  font-weight: 500;
  font-size: 18px;
  font-family: "Avenir Next Rounded Pro", sans-serif;
  line-height: 1.33;
}

.description {
  color: #73757c;
  font-size: 16px;
  font-family: "Avenir Next Rounded Pro", sans-serif;
  line-height: 1.5;
  letter-spacing: -0.2px;
}

.action-container {
  padding-left: 16px;
}

.details-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.details-button-icon {
  width: 20px;
  height: 20px;
  transform: rotate(90deg);
  transition: all 150ms ease-in-out;

  &.open {
    transform: rotate(270deg);
  }
}
</style>
