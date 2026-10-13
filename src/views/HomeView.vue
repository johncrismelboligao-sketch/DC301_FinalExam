<script setup>
import { computed } from 'vue'
import { state } from '../stores/useStore'
import StatCard from '../components/StatCard.vue'

const upcoming = computed(() =>
  state.sessions.filter((s) => s.status === 'Planned').sort((a, b) => a.date.localeCompare(b.date)).slice(0, 3)
)
const notFit = computed(() => state.players.filter((p) => p.fitness !== 'Fit').length)
</script>

<template>
  <section class="hero pitch">
    <div class="hero-text">
      <h1>Plan the week.<br />Run the session.</h1>
      <p>Schedule training sessions, manage your squad and build a library of drills, all in one place.</p>
      <div class="row">
        <RouterLink to="/sessions" class="btn primary">Plan a session</RouterLink>
        <RouterLink to="/players" class="btn light">View squad</RouterLink>
      </div>
    </div>
  </section>

  <section class="grid stats">
    <StatCard label="Training sessions" :value="state.sessions.length" to="/sessions" />
    <StatCard label="Players in squad" :value="state.players.length" to="/players" />
    <StatCard label="Drills in library" :value="state.drills.length" to="/drills" />
    <StatCard label="Players not fully fit" :value="notFit" to="/players" />
  </section>

  <section class="card">
    <h2>Next on the training calendar</h2>
    <ul v-if="upcoming.length" class="plain-list">
      <li v-for="s in upcoming" :key="s.id">
        <div><strong>{{ s.title }}</strong><small>{{ s.location }}, {{ s.duration }} min</small></div>
        <span class="date">{{ s.date }}</span>
      </li>
    </ul>
    <p v-else class="empty">No planned sessions yet. Add one on the Sessions page.</p>
  </section>
</template>