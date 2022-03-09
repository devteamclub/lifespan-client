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
          <v-list-item>
            <v-list-item-action>
              <v-switch
                v-model="option1"
                color="purple"
              />
            </v-list-item-action>
            <v-list-item-title>Category 1</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-action>
              <v-switch
                v-model="option2"
                color="purple"
              />
            </v-list-item-action>
            <v-list-item-title>Category 2</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-action>
              <v-switch
                v-model="option3"
                color="purple"
              />
            </v-list-item-action>
            <v-list-item-title>Category 3</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-action>
              <v-switch
                v-model="option4"
                color="purple"
              />
            </v-list-item-action>
            <v-list-item-title>Category 4</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-action>
              <v-switch
                v-model="option5"
                color="purple"
              />
            </v-list-item-action>
            <v-list-item-title>Category 5</v-list-item-title>
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
            @click="menu = false"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>

export default {
  name: 'TheServicesMenu',
  data() {
    return {
      menu: false,
      option1: false,
      option2: true,
      option3: false,
      option4: false,
      option5: true,
      value: 'General Events',
      items: ['Tree', 'General Events', 'DApp ABC']
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
