<template>
  <div
    class="cell"
    :class="{ 'filled': isFilled, 'bold': isBold }"
    :style="{ 'background-color': isFilled ? color : 'transparent', 'border-color': color }"
  />
</template>

<script>
export default {
  name: 'AgeTableCell',
  props: {
    color: {
      type: String,
      required: true,
      default: '#000000'
    },
    isFilled: {
      type: Boolean,
      required: false,
      default: false
    },
    isBold: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .cell {
    box-sizing: border-box;
    width: 16px;
    height: 16px;
    border-style: solid;
    border-width: 1px;
    border-radius: 4px;

    &.bold {
      border-width: 4px;
    }
  }
</style>
