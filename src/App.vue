<script setup>
import AppNavbar from './components/AppNavbar.vue'
</script>

<template>
  <AppNavbar />
  <main class="container">
    <RouterView />
  </main>
  <footer class="footer">Football Training Session Manager · Mini Capstone built with Vue 3</footer>
</template>