<template>
  <div class="up-down-rating">
    <v-icon
      size="20"
      class="up"
      :class="{ 'active': prediction.isPositive }"
      @click="changeRate(true)"
    >
      mdi-arrow-up-bold-outline
    </v-icon>
    <v-icon
      size="20"
      class="down"
      :class="{ 'active': prediction.isPositive === false }"
      @click="changeRate(false)"
    >
      mdi-arrow-down-bold-outline
    </v-icon>
  </div>
</template>

<script>
import api from '@/api'
import { mapGetters } from 'vuex'

export default {
  name: 'UpDownRating',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      prediction: { ...this.item }
    }
  },
  computed: {
    ...mapGetters(['getUser'])
  },
  methods: {
    async changeRate(isPositive) {
      if (this.loading) return

      if (this.prediction.isPositive === isPositive) {
        this.prediction.isPositive = null
      } else {
        this.prediction.isPositive = isPositive
      }

      const rating = {
        isPositive: this.prediction.isPositive,
        userId: this.getUser.id
      }

      this.loading = true
      await api.users.setPredictionRating(this.prediction.id, rating)
      this.loading = false
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
