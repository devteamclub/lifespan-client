<template>
  <div class="item-chip">
    <div class="icon-block">
      <v-icon>
        mdi-domain
      </v-icon>
    </div>
    <v-expansion-panels tile class="expansion-panel">
      <v-expansion-panel>
        <v-expansion-panel-header expand-icon="">
          Item
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <p>
            Lorem ipsum dolor sit amet, consectetur adip lorem ipsum dolor sit
            amet, consectetur adip ipsum dolor sit amet, consectetur
          </p>
          <div class="info-block">
            <span class="info-title">Age:</span>
            <span class="info-content">24 years old</span>
          </div>
          <div class="info-block">
            <span class="info-title">Source:</span>
            <span class="info-content link">census.gov</span>
          </div>
          <div class="info-block">
            <span class="info-title">Possibility:</span>
            <span class="info-content">89%</span>
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
export default {
  name: 'ItemChip'
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
        font-size: var(--content-title-text-size);
      }

      .v-expansion-panel-content {
        position: relative;
        color: var(--primary-text-color);
        font-size: var(--content-text-size);
        line-height: 15px;

        span {
          font-size: var(--text-size-sm);
          font-weight: var(--font-weight-bold);
        }

        .info-title {
          margin-right: 5px;
          color: var(--tertiary-text-color);
        }

        .info-content {
          &.link {
            color: var(--link-color);
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
