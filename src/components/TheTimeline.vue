<template>
  <div class="timeline">
    <ItemChip />
  </div>
</template>

<script>
import ItemChip from '@/components/ItemChip'

export default {
  name: 'TheTimeline',
  components: {
    ItemChip
  }
}
</script>

<style lang="scss" scoped>
.timeline {
  padding: 18px 18px 0;
}
</style>
