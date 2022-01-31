<template>
  <div class="item-chip" :class="{ 'active': isActive }" @click="isActive = !isActive">
    <div class="icon-block">
      <v-icon>
        mdi-domain
      </v-icon>
    </div>
    <v-expansion-panels tile class="expansion-panel">
      <v-expansion-panel>
        <v-expansion-panel-header expand-icon="">
          <div v-if="item.categoryList" class="category">
            <span>{{ getCategoriesList() }}</span>
          </div>
          {{ item.title }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <p>
            {{ item.description }}
          </p>
          <div v-if="item.categoryList" class="info-block">
            <span class="info-title">Year:</span>
            <span class="info-content">{{ getYear(item.startDate) }}</span>
          </div>
          <div v-else class="info-block">
            <span class="info-title">Age:</span>
            <span class="info-content">{{ age }} years old</span>
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
          <div class="info-block">
            <span class="info-title">Possibility:</span>
            <span class="info-content">
              {{ item.possibility ? `${item.possibility}%` : '' }}
            </span>
          </div>
          <button class="edit-btn">
            <v-icon size="12" color="var(--contrast-text-color)">
              mdi-pencil
            </v-icon>
          </button>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
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
    isPrediction: {
      type: Boolean,
      required: false,
      default: false
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
  --collapsed-chip-height: 80px;
  --icon-box-width: 80px;

  position: relative;
  display: flex;
  width: 100%;
  max-width: calc(400px - var(--icon-box-width));

  &.active {
    z-index: 10;
  }

  .icon-block {
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    width: var(--icon-box-width);
    height: var(--collapsed-chip-height);
    background-color: #FE9A99;
    box-shadow:
      4px 3px 1px -2px rgb(0 0 0 / 20%),
      0 2px 2px 0 rgb(0 0 0 / 14%),
      0 1px 5px 0 rgb(0 0 0 / 12%);
  }

  .expansion-panel {
    position: absolute;
    left: var(--icon-box-width);

    &::v-deep {
      .v-expansion-panel-header {
        height: var(--collapsed-chip-height);
        padding: 24px 16px 24px;
        font-size: var(--content-title-text-size);

        .category {
          position: absolute;
          top: 13px;
          color: var(--tertiary-text-color);
          font-size: var(--text-size-sm);
        }
      }

      .v-expansion-panel-content {
        position: relative;
        color: var(--primary-text-color);
        font-size: var(--content-text-size);
        line-height: 15px;

        &__wrap {
          padding: 0 16px 16px;
        }

        span,
        .link {
          font-size: var(--text-size-sm);
          font-weight: var(--font-weight-bold);
        }

        .info-block.source {
          display: flex;
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
}
</style>
