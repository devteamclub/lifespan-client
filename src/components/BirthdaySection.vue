<template>
  <div>
    <div class="wrapper">
      <div class="card">
        <div class="left-column">
          <img class="icon" :src="icon" alt="image" />
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
    padding: 24px;
    background: #fdfdfd;
    border: solid 2px transparent;
    border-radius: 16px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 6%), 0 1px 2px 0 rgb(0 0 0 / 6%);

    .card {
      align-items: center;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;

      .left-column {
        display: flex;
        
        .icon {
          height: 48px;
          width: 48px;
        }

        .title {
          display: flex;
          align-items: center;
          box-sizing: border-box;
          padding-left: 20px;
          color: #26272a;
          font-size: 18px;
          font-weight: 500;
          line-height: 1.33;
          font-family: "Avenir Next Rounded Pro",Arial,Helvetica,sans-serif;
        }
      }
    }

    .content {
      padding-top: 24px;
      padding-left: 70px;
    }
  }
</style>
