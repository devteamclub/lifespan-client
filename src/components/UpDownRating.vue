<template>
  <div class="up-down-rating">
    <v-icon
      size="20"
      class="up"
      :class="{ 'active': isUpActive }"
      @click="changeRate"
    >
      mdi-arrow-up-bold-outline
    </v-icon>
    <v-icon
      size="20"
      class="down"
      :class="{ 'active': isDownActive }"
      @click="changeRate"
    >
      mdi-arrow-down-bold-outline
    </v-icon>
  </div>
</template>

<script>
export default {
  name: 'UpDownRating',
  data() {
    return {
      isUpActive: false,
      isDownActive: false
    }
  },
  methods: {
    changeRate(value) {
      if (value > 0) {
        this.isUpActive = true
        this.isDownActive = false
      } else {
        this.isUpActive = false
        this.isDownActive = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.up-down-rating {
  display: flex;
  align-items: center;
  gap: 7px;

  .up,
  .down {
    transition: color 0.2s ease-in-out;
  }

  .up {
    &.active,
    &:hover {
      color: var(--accept-color);
    }
  }

  .down {
    &.active,
    &:hover {
      color: var(--error-color);
    }
  }
}
</style>
