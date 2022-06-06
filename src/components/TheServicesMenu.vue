<template>
  <div class="text-center menu">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="menu-button"
          tile
          dark
          v-bind="attrs"
          v-on="on"
        >
          DApps
        </v-btn>
      </template>

      <v-card>
        <v-list>
          <v-list-item>
            <v-row align="center">
              <v-col cols="12">
                <v-select
                  v-model="value"
                  :items="items"
                  :menu-props="{ top: true, offsetY: true }"
                  label="Select service"
                />
              </v-col>
            </v-row>
          </v-list-item>
        </v-list>

        <v-divider v-if="value === 'General Events'" />

        <v-list v-if="value === 'General Events'">
          <v-list-item v-for="category in categories" :key="category.id">
            <v-list-item-action>
              <v-switch
                v-model="options[category.title]"
                color="purple"
                @change="selectCategory($event, category.id)"
              />
            </v-list-item-action>
            <v-list-item-title>{{ category.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import api from '@/api'
import { mapGetters } from 'vuex'

export default {
  name: 'TheServicesMenu',
  props: {
    selectedCategories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      menu: false,
      value: 'General Events',
      items: ['Tree', 'General Events', 'DApp ABC'],
      categories: [],
      options: [],
      selectedCategoriesIds: []
    }
  },
  computed: {
    ...mapGetters(['getUser'])
  },
  mounted() {
    this.fetchPredictionsCategories()
  },
  methods: {
    async fetchPredictionsCategories() {
      const { data: categories } = await api.predictions.getPredictionsCategories()
      if (!categories) return
      this.categories = categories
      categories.forEach(({ title, id }) => (this.options[title] = this.selectedCategories.includes(id)))
    },
    selectCategory(needToAdd, selectedCategoryId) {
      if (needToAdd) {
        this.selectedCategories.push(selectedCategoryId)
      } else {
        this.selectedCategories = this.selectedCategories.filter((id) => id !== selectedCategoryId)
      }
      this.$emit('saveSelectedCategories', this.selectedCategories)
    }
  }
}
</script>

<style lang="scss" scoped>
.menu {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 11;
}

.menu-button {
  text-transform: initial;
}
</style>
