<script setup>
import { resetData } from '../stores/useStore'

const requirements = [
  'Node.js (LTS version) and npm',
  'Visual Studio Code with the Vue (Official) extension',
  'Git and a GitHub account',
  'A modern browser (Chrome, Edge or Firefox)'
]

const steps = [
  { cmd: 'node -v && npm -v', note: 'Check that Node.js and npm are installed.' },
  { cmd: 'npm create vite@latest minicapstone_vue', note: 'Create the project. Choose Vue and JavaScript.' },
  { cmd: 'cd minicapstone_vue && npm install', note: 'Install the dependencies.' },
  { cmd: 'npm install vue-router', note: 'Add Vue Router for page navigation.' },
  { cmd: 'npm run dev', note: 'Start the dev server (Vite) at http://localhost:5173.' },
  { cmd: 'npm run build', note: 'Build the production version into /dist.' }
]

const concepts = [
  { topic: 'Project structure', where: 'src/, main.js, App.vue, index.html' },
  { topic: 'Single File Components', where: 'Every .vue file (template, script, style)' },
  { topic: 'Vue Router (SPA navigation)', where: 'router/index.js, AppNavbar.vue' },
  { topic: 'Reactivity: ref, reactive, computed', where: 'SessionsView.vue, stores/useStore.js' },
  { topic: 'Directives: v-if, v-for, v-model, :key', where: 'All views' },
  { topic: 'Event handling and form submit', where: '@click, @submit.prevent in all views' },
  { topic: 'Props and emits (component communication)', where: 'StatCard.vue, ConfirmModal.vue' },
  { topic: 'CRUD: create, read, update, delete', where: 'Sessions, Players, Drills pages' },
  { topic: 'Search and filtering', where: 'Sessions, Players, Drills pages' },
  { topic: 'Watchers and localStorage persistence', where: 'stores/useStore.js' }
]
</script>

<template>
  <div class="page-head"><h1>Project setup</h1></div>

  <section class="card">
    <h2>Requirements</h2>
    <ul class="check-list"><li v-for="r in requirements" :key="r">{{ r }}</li></ul>
  </section>

  <section class="card">
    <h2>Creating the Vue application</h2>
    <ol class="steps">
      <li v-for="s in steps" :key="s.cmd">
        <code>{{ s.cmd }}</code>
        <span>{{ s.note }}</span>
      </li>
    </ol>
  </section>

  <section class="card">
    <h2>Topics covered in this project</h2>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Topic</th><th>Where to find it</th></tr></thead>
        <tbody><tr v-for="c in concepts" :key="c.topic"><td>{{ c.topic }}</td><td>{{ c.where }}</td></tr></tbody>
      </table>
    </div>
  </section>

  <section class="card">
    <h2>Demo data</h2>
    <p class="muted">Restore the sample sessions, players and drills before your presentation.</p>
    <button class="btn danger" @click="resetData">Reset demo data</button>
  </section>
</template>