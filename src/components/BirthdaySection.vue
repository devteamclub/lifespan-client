<template>
  <div>
    <slot />
  </div>
</template>

<script>
import defaultIcon from '../../public/images/default-app.svg'

export default {
  name: 'BirthdaySection',
  props: {
    icon: {
      type: String,
      required: false,
      default: defaultIcon
    },
    title: {
      type: String,
      required: true
    }
  }
}
</script>
