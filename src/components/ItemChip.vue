<template>
  <div class="item-chip">
    <details class="chip" :class="{ 'active': isActive }" @click="isActive = !isActive">
      <summary class="header">
        <span v-if="!item.isEvent" class="category">{{ getCategoriesList() }}</span>
        <span class="title">{{ item.title }}</span>
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
    <div class="stripe" />
  </div>
</template>

<script>
import { getYear } from '@/services/dateService'

export default {
  name: 'ItemChip',
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
  methods: {
    getYear,
    getCategoriesList() {
      const categoryListTitles = this.item.categoryList.map((item) => item.title)
      const result = categoryListTitles.join(', ')
      return result
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
      padding-bottom: 10px;
      cursor: pointer;

      .category,
      .title {
        display: block;
      }

      .category {
        margin-bottom: 5px;
        color: var(--tertiary-text-color);
        font-size: var(--text-size-sm);
      }

      .title {
        font-size: var(--content-title-text-size);
        line-height: 1.2;
      }
    }

    .content {
      .description {
        font-size: var(--content-text-size);
      }

      span,
      .link {
        font-size: var(--text-size-sm);
        font-weight: var(--font-weight-bold);
      }

      .info-block.source {
        overflow: hidden;
        display: flex;
        max-width: calc(100% - 27px);
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .info-title {
        margin-right: 5px;
        color: var(--tertiary-text-color);
      }

      .info-content {
        &.link {
          display: block;
          color: var(--link-color);
          white-space: nowrap;
          overflow: hidden;
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
