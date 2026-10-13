<script setup>
// Props down, events up: the parent decides what happens on confirm/cancel
defineProps({
  show: Boolean,
  title: { type: String, default: 'Are you sure?' },
  message: { type: String, default: '' }
})
const emit = defineEmits(['confirm', 'cancel'])
</script>

<template>
  <div v-if="show" class="overlay" @click.self="emit('cancel')">
    <div class="modal" role="dialog" aria-modal="true">
      <h3>{{ title }}</h3>
      <p>{{ message }}</p>
      <div class="row end">
        <button class="btn ghost" @click="emit('cancel')">Keep it</button>
        <button class="btn danger" @click="emit('confirm')">Delete</button>
      </div>
    </div>
  </div>
</template>