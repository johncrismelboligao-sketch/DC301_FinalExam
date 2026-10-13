<script setup>
// Props: data passed down from the parent
defineProps({
  label: { type: String, required: true },
  value: { type: [Number, String], required: true },
  to: { type: String, default: '' }
})
</script>

<template>
  <RouterLink v-if="to" :to="to" class="stat">
    <strong>{{ value }}</strong>
    <span>{{ label }}</span>
  </RouterLink>
  <div v-else class="stat">
    <strong>{{ value }}</strong>
    <span>{{ label }}</span>
  </div>
</template>