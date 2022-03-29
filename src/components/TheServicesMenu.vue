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
          tile
          dark
          v-bind="attrs"
          v-on="on"
        >
          Services menu
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
        <v-card-actions>
          <v-spacer />

          <v-btn
            text
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="saveSelectedCategories"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import api from '@/api'
import { mapGetters } from 'vuex'

export default {
  name: 'TheServicesMenu',
  data() {
    return {
      menu: false,
      value: 'General Events',
      items: ['Tree', 'General Events', 'DApp ABC'],
      categories: [],
      options: [],
      selectedCategories: []
    }
  },
  computed: {
    ...mapGetters(['getUser'])
  },
  async created() {
    const { data } = await api.predictions.getPredictionsCategories()
    if (data) {
      this.categories = data
      data.forEach(({ title }) => { this.options[title] = false })
    }
  },
  methods: {
    saveSelectedCategories() {
      this.$emit('saveSelectedCategories', this.selectedCategories)
      this.menu = false
    },
    selectCategory(needToAdd, selectedCategoryId) {
      if (needToAdd) {
        this.selectedCategories.push(selectedCategoryId)
      } else {
        this.selectedCategories = this.selectedCategories.filter((id) => id !== selectedCategoryId)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.menu {
  position: fixed;
  left: 10px;
  top: 10px;
  z-index: 11;
}
</style>
