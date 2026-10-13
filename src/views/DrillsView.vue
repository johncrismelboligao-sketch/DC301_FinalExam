<script setup>
import { ref, computed } from 'vue'
import { state, drillsApi } from '../stores/useStore'
import ConfirmModal from '../components/ConfirmModal.vue'

const categories = ['Passing', 'Shooting', 'Defending', 'Fitness', 'Tactics']
const blank = () => ({ name: '', category: 'Passing', duration: 15, difficulty: 'Easy', description: '' })

const form = ref(blank())
const editingId = ref(null)
const showForm = ref(false)
const error = ref('')
const filterCat = ref('All')
const deleteTarget = ref(null)

const filtered = computed(() =>
  filterCat.value === 'All' ? state.drills : state.drills.filter((d) => d.category === filterCat.value)
)
const totalMinutes = computed(() => filtered.value.reduce((sum, d) => sum + d.duration, 0))

function openCreate() { form.value = blank(); editingId.value = null; error.value = ''; showForm.value = true }
function openEdit(d) { form.value = { ...d }; editingId.value = d.id; error.value = ''; showForm.value = true }

function save() {
  if (!form.value.name.trim() || !form.value.description.trim()) { error.value = 'Name and description are required.'; return }
  form.value.duration = Number(form.value.duration)
  if (editingId.value) drillsApi.update(editingId.value, form.value)
  else drillsApi.create(form.value)
  showForm.value = false
}
function confirmDelete() { drillsApi.remove(deleteTarget.value.id); deleteTarget.value = null }
</script>

<template>
  <div class="page-head">
    <h1>Drill library</h1>
    <button class="btn primary" @click="openCreate">Add drill</button>
  </div>

  <form v-if="showForm" class="card form" @submit.prevent="save">
    <h2>{{ editingId ? 'Edit drill' : 'New drill' }}</h2>
    <p v-if="error" class="error">{{ error }}</p>
    <div class="form-grid">
      <label>Drill name<input v-model="form.name" placeholder="e.g. Rondo 4v2" /></label>
      <label>Category
        <select v-model="form.category"><option v-for="c in categories" :key="c">{{ c }}</option></select>
      </label>
      <label>Duration (minutes)<input v-model="form.duration" type="number" min="5" max="60" /></label>
      <label>Difficulty
        <select v-model="form.difficulty"><option>Easy</option><option>Medium</option><option>Hard</option></select>
      </label>
    </div>
    <label>Description<textarea v-model="form.description" rows="3" placeholder="How does the drill work?"></textarea></label>
    <div class="row end">
      <button type="button" class="btn ghost" @click="showForm = false">Cancel</button>
      <button type="submit" class="btn primary">{{ editingId ? 'Save changes' : 'Add drill' }}</button>
    </div>
  </form>

  <div class="toolbar">
    <select v-model="filterCat"><option>All</option><option v-for="c in categories" :key="c">{{ c }}</option></select>
    <span class="muted">{{ filtered.length }} drills, {{ totalMinutes }} minutes in total</span>
  </div>

  <div v-if="filtered.length" class="grid cards">
    <article v-for="d in filtered" :key="d.id" class="card">
      <div class="row between">
        <h3>{{ d.name }}</h3>
        <span class="tag" :class="d.difficulty.toLowerCase()">{{ d.difficulty }}</span>
      </div>
      <p class="muted">{{ d.category }}, {{ d.duration }} min</p>
      <p>{{ d.description }}</p>
      <div class="actions">
        <button class="btn small ghost" @click="openEdit(d)">Edit</button>
        <button class="btn small danger" @click="deleteTarget = d">Delete</button>
      </div>
    </article>
  </div>
  <p v-else class="empty">No drills in this category yet.</p>

  <ConfirmModal
    :show="!!deleteTarget"
    title="Delete this drill?"
    :message="deleteTarget ? `“${deleteTarget.name}” will be removed from the library.` : ''"
    @confirm="confirmDelete"
    @cancel="deleteTarget = null"
  />
</template>