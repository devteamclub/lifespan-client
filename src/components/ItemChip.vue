<template>
  <div
    :style="getTransformStyles"
    :class="{ lasting: isLasting }"
    class="item-chip"
  >
    <details class="chip" :class="{ 'active': isActive }" @click="isActive = !isActive">
      <summary class="header">
        <span v-if="!item.isEvent" class="category">{{ getCategoriesList() }}</span>
        <!--TODO: remove total -->
        <span class="title">
          {{ item.title }}
          <v-chip
            v-if="item.isMemorized"
            class="ml-2"
            label
            small
            outlined
            color="success"
          >
            Memorized
          </v-chip>
        </span>
        <UpDownRating v-if="!item.isEvent" :item="item" class="rating" />
      </summary>
      <div class="content">
        <p class="description">
          {{ item.description }}
        </p>
        <template v-if="!item.isEvent">
          <div class="info-block">
            <span class="info-title">Year:</span>
            <span class="info-content" @click="dateMenu = true">
              {{ itemStartYear }}
              <v-icon size="14">
                mdi-pencil
              </v-icon>
            </span>
            <v-menu
              v-model="dateMenu"
              top
              attach
            >
              <v-date-picker
                ref="picker"
                v-model="itemStartYear"
                width="100"
                active-picker="YEAR"
                no-title
                :min="itemStartYear"
                @click:year="saveYear"
              />
            </v-menu>
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
          <span class="info-content" @click="isShowMemorizeModal = true">
            {{ getAge }} years old
            <v-icon size="14">
              mdi-pencil
            </v-icon>
          </span>
          <v-dialog
            v-model="isShowMemorizeModal"
            width="500"
          >
            <v-card>
              <v-card-title class="text-h5 lighten-2">
                {{ item.title }}
              </v-card-title>

              <v-card-text>
                {{ item.description }}
                <div class="d-flex">
                  <v-checkbox
                    v-model="item.isMemorized"
                    label="Memorize"
                  />
                </div>
                <v-row>
                  <v-col cols="6">
                    <v-menu
                      v-model="isShowStartDateMenu"
                      :close-on-content-click="false"
                    >
                      <template #activator="{ on, attrs }">
                        <v-text-field
                          :value="formatISOdate(item.startDate)"
                          label="Start date"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        />
                      </template>
                      <v-date-picker
                        v-model="itemStartDate"
                        color="var(--primary-color)"
                        @input="setStartDate"
                      />
                    </v-menu>
                  </v-col>
                  <v-col v-if="!item.isRange" cols="6">
                    <v-menu
                      v-model="isShowEndDateMenu"
                      :close-on-content-click="false"
                    >
                      <template #activator="{ on, attrs }">
                        <v-text-field
                          :value="formatISOdate(item.endDate)"
                          label="End date"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        />
                      </template>
                      <v-date-picker
                        v-model="itemEndDate"
                        color="var(--primary-color)"
                        @input="setEndDate"
                      />
                    </v-menu>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-divider />

              <v-card-actions>
                <v-spacer />
                <v-btn
                  text
                  @click="closeModal"
                >
                  Close
                </v-btn>
                <v-btn
                  color="green"
                  text
                  @click="saveAndCloseModal"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </div>
    </details>
    <div class="stripe">
      <div
        v-for="(category, i) in item.categoryList"
        :key="i + category.color"
        class="stripe-item"
        :style="{ backgroundColor: item.isEvent ? '' : category.color }"
      />
    </div>
  </div>
</template>

<script>
import { getYear, formatISOdate } from '@/services/dateService'
import UpDownRating from '@/components/UpDownRating'
import api from '@/api'
import { mapGetters } from 'vuex'

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
    isLasting: {
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
      isActive: false,
      dateMenu: false,
      isShowMemorizeModal: false,
      isShowStartDateMenu: false,
      isShowEndDateMenu: false,
      itemStartYear: getYear(this.item.startDate),
      isYearSaved: false,
      itemStartDate: new Date(this.item.startDate).toISOString().substr(0, 10),
      itemEndDate: new Date(this.item.endDate).toISOString().substr(0, 10)
    }
  },
  computed: {
    ...mapGetters(['getUser']),
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
    },
    getTransformStyles() {
      let style = 'transform: '
      if (!this.item.isEvent) {
        style += `scale(${this.getScaleSize})`
      }
      if (this.isYearSaved) {
        style += 'translateY(2000px); opacity: 0;'
      }
      return style
    },
    getAge() {
      if (this.getYear(this.item.startDate) < this.getYear(this.getUser.birthday)) return 0
      return this.getYear(this.item.startDate) - this.getYear(this.getUser.birthday)
    }
  },
  watch: {
    dateMenu(val) {
      val && this.$nextTick(() => (this.$refs.picker.internalActivePicker = 'YEAR'))
    }
  },
  methods: {
    formatISOdate,
    async saveYear(year) {
      if (+this.itemStartYear === year) return
      const dateWithNewYear = new Date(this.item.startDate).setFullYear(year)
      this.isYearSaved = true
      const prediction = {
        eventId: this.item.id,
        startDate: new Date(dateWithNewYear).toISOString(),
        endDate: this.item.endDate
      }
      await api.users.updatePrediction(prediction)
      this.$emit('fetchPredictions')
      this.$refs.picker.internalActivePicker = 'YEAR'
    },
    getYear,
    getCategoriesList() {
      const categoryListTitles = this.item.categoryList.map((item) => item.title)
      return categoryListTitles.join(', ')
    },
    closeModal() {
      this.isShowMemorizeModal = false
    },
    async saveAndCloseModal() {
      this.closeModal()
      await api.users.updatePersonalEvents(this.item)
    },
    setStartDate() {
      this.item.startDate = new Date(this.itemStartDate).toISOString()
      this.isShowStartDateMenu = false
    },
    setEndDate() {
      this.item.endDate = new Date(this.itemEndDate).toISOString()
      this.isShowEndDateMenu = false
    }
  }
}
</script>

<style lang="scss" scoped>
.info-block {
  position: relative;
}

.item-chip {
  position: relative;
  width: 320px;
  transition: all 1s ease;
  z-index: 1;
  &.lasting {
    margin-left: 30%;
  }

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
        cursor: pointer;
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
