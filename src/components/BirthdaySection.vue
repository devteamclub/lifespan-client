<template>
  <div>
    <div class="wrapper">
      <div class="card">
        <div class="left-column">
          <img class="icon" :src="icon" alt="image">
          <div class="title">
            <slot name="title" />
          </div>
        </div>
        <div class="progress">
          <slot name="progress" />
        </div>
      </div>
      <div class="content">
        <slot name="content" />
      </div>
    </div>
  </div>
</template>

<script>
import defaultIcon from '../../public/images/default-app.svg'

export default {
  name: 'BirthdaySection',
  props: {
    icon: {
      type: String,
      required: false,
      default: defaultIcon
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrapper {
    background: #fdfdfd;
    border: solid 2px transparent;
    border-radius: 16px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 6%), 0 1px 2px 0 rgb(0 0 0 / 6%);

    .card {
      background: #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 24px;
      border-top-left-radius: 16px;
      border-top-right-radius: 16px;

      .left-column {
        display: flex;

        .icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
        }

        .title {
          display: flex;
          align-items: center;
          box-sizing: border-box;
          padding-left: 20px;
          color: #26272a;
          font-weight: 500;
          font-size: 18px;
          font-family: "Avenir Next Rounded Pro", Arial, Helvetica, sans-serif;
          line-height: 1.33;
        }
      }
    }

    .content {
      padding: 24px 24px 24px 94px;
    }
  }
</style>
