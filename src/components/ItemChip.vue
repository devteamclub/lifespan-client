<template>
  <div class="item-chip" :style="item.isEvent ? '' : `transform: scale(${getScaleSize})`">
    <details class="chip" :class="{ 'active': isActive }" @click="isActive = !isActive">
      <summary class="header">
        <span v-if="!item.isEvent" class="category">{{ getCategoriesList() }}</span>
        <span class="title">{{ item.title }}</span>
        <UpDownRating v-if="!item.isEvent" :item="item" class="rating" />
      </summary>
      <div class="content">
        <p class="description">
          {{ item.description }}
        </p>
        <template v-if="!item.isEvent">
          <div class="info-block">
            <span class="info-title">Year:</span>
            <span class="info-content">{{ getYear(item.startDate) }}</span>
          </div>
          <div class="info-block source">
            <span class="info-title">Source:</span>
            <a
              v-for="(source, i) in item.sources"
              :key="i"
              :href="source"
              target="_blank"
              class="info-content link"
            >
              {{ source }}
            </a>
          </div>
        </template>
        <div v-else class="info-block">
          <span class="info-title">Age:</span>
          <span class="info-content">{{ age }} years old</span>
        </div>

        <button class="edit-btn">
          <v-icon size="12" color="var(--contrast-text-color)">
            mdi-pencil
          </v-icon>
        </button>
      </div>
    </details>
    <div class="stripe">
      <div
        v-for="category in item.categoryList"
        :key="category.id"
        class="stripe-item"
        :style="{ backgroundColor: item.isEvent ? '' : category.color }"
      />
    </div>
  </div>
</template>

<script>
import { getYear } from '@/services/dateService'
import UpDownRating from '@/components/UpDownRating'

export default {
  name: 'ItemChip',
  components: {
    UpDownRating
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    age: {
      type: [Number, String],
      required: false,
      default: null
    }
  },
  data() {
    return {
      isActive: false
    }
  },
  computed: {
    getScaleSize() {
      const averageRatingValue = (this.item.ratingPositive - this.item.ratingNegative) / 2
      if (averageRatingValue >= 1000) return '1.45'
      if (averageRatingValue >= 500) return '1.4'
      if (averageRatingValue >= 200) return '1.35'
      if (averageRatingValue >= 100) return '1.3'
      if (averageRatingValue >= 50) return '1.25'
      if (averageRatingValue >= 10) return '1.2'
      if (averageRatingValue > 0) return '1.15'
      if (averageRatingValue < 0) return '0.95'
      return '1'
    }
  },
  methods: {
    getYear,
    getCategoriesList() {
      const categoryListTitles = this.item.categoryList.map((item) => item.title)
      return categoryListTitles.join(', ')
    }
  }
}
</script>

<style lang="scss" scoped>
.item-chip {
  position: relative;
  width: 320px;

  .stripe {
    position: absolute;
    top: 0;
    left: 0;
    display: grid;
    width: 7px;
    height: 100%;
    background-color: var(--primary-color);
  }

  .chip {
    display: flex;
    padding: 13px 17px;
    background-color: var(--primary-background-color);
    box-shadow: var(--default-shadow);

    &.active {
      z-index: 10;
    }

    .header {
      position: relative;
      padding-bottom: 10px;
      outline: none;
      cursor: pointer;

      .category,
      .title {
        display: block;
      }

      .category {
        margin-bottom: 5px;
        color: var(--tertiary-text-color);
        font-size: var(--text-size-xs);
      }

      .title {
        font-size: var(--content-title-text-size);
        line-height: 1.2;
      }

      .rating {
        position: absolute;
        right: -11px;
        bottom: -7px;
      }
    }

    .content {
      .description {
        font-size: var(--content-text-size);
      }

      span,
      .link {
        font-weight: var(--font-weight-bold);
        font-size: var(--text-size-sm);
      }

      .info-block.source {
        display: flex;
        max-width: calc(100% - 27px);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .info-title {
        margin-right: 5px;
        color: var(--tertiary-text-color);
      }

      .info-content {
        &.link {
          display: block;
          overflow: hidden;
          color: var(--link-color);
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }

      .edit-btn {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 27px;
        height: 27px;
        background-color: #414141;
      }
    }
  }
}
</style>
