<script setup>
const links = [
  { to: '/', label: 'Home' },
  { to: '/sessions', label: 'Sessions' },
  { to: '/players', label: 'Players' },
  { to: '/drills', label: 'Drills' }
]
</script>

<template>
  <header class="navbar">
    <RouterLink to="/" class="brand">Touchline<span>Training</span></RouterLink>
    <nav>
      <RouterLink v-for="l in links" :key="l.to" :to="l.to" class="nav-link">{{ l.label }}</RouterLink>
    </nav>
  </header>
</template>