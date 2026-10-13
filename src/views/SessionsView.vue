<script setup>
import { ref, computed } from 'vue'
import { state, sessionsApi } from '../stores/useStore'
import ConfirmModal from '../components/ConfirmModal.vue'

const focusOptions = ['Passing', 'Shooting', 'Defending', 'Fitness', 'Tactics']
const blank = () => ({ title: '', date: '', location: '', focus: 'Passing', duration: 60, status: 'Planned' })

const form = ref(blank())
const editingId = ref(null)
const showForm = ref(false)
const error = ref('')
const search = ref('')
const filterFocus = ref('All')
const deleteTarget = ref(null)

const filtered = computed(() =>
  state.sessions
    .filter((s) => (filterFocus.value === 'All' || s.focus === filterFocus.value)
      && s.title.toLowerCase().includes(search.value.toLowerCase()))
    .sort((a, b) => a.date.localeCompare(b.date))
)

function openCreate() {
  form.value = blank(); editingId.value = null; error.value = ''; showForm.value = true
}
function openEdit(s) {
  form.value = { ...s }; editingId.value = s.id; error.value = ''; showForm.value = true
}
function save() {
  if (!form.value.title.trim() || !form.value.date || !form.value.location.trim()) {
    error.value = 'Title, date and location are required.'
    return
  }
  form.value.duration = Number(form.value.duration)
  if (editingId.value) sessionsApi.update(editingId.value, form.value)
  else sessionsApi.create(form.value)
  showForm.value = false
}
function confirmDelete() {
  sessionsApi.remove(deleteTarget.value.id)
  deleteTarget.value = null
}
</script>

<template>
  <div class="page-head">
    <h1>Training sessions</h1>
    <button class="btn primary" @click="openCreate">Add session</button>
  </div>

  <form v-if="showForm" class="card form" @submit.prevent="save">
    <h2>{{ editingId ? 'Edit session' : 'New session' }}</h2>
    <p v-if="error" class="error">{{ error }}</p>
    <div class="form-grid">
      <label>Title<input v-model="form.title" placeholder="e.g. Passing Triangles" /></label>
      <label>Date<input v-model="form.date" type="date" /></label>
      <label>Location<input v-model="form.location" placeholder="e.g. Main Pitch" /></label>
      <label>Focus
        <select v-model="form.focus"><option v-for="f in focusOptions" :key="f">{{ f }}</option></select>
      </label>
      <label>Duration (minutes)<input v-model="form.duration" type="number" min="10" max="180" /></label>
      <label>Status
        <select v-model="form.status"><option>Planned</option><option>Completed</option><option>Cancelled</option></select>
      </label>
    </div>
    <div class="row end">
      <button type="button" class="btn ghost" @click="showForm = false">Cancel</button>
      <button type="submit" class="btn primary">{{ editingId ? 'Save changes' : 'Add session' }}</button>
    </div>
  </form>

  <div class="toolbar">
    <input v-model="search" placeholder="Search sessions" />
    <select v-model="filterFocus">
      <option>All</option><option v-for="f in focusOptions" :key="f">{{ f }}</option>
    </select>
  </div>

  <div class="table-wrap" v-if="filtered.length">
    <table>
      <thead><tr><th>Title</th><th>Date</th><th>Location</th><th>Focus</th><th>Min</th><th>Status</th><th></th></tr></thead>
      <tbody>
        <tr v-for="s in filtered" :key="s.id">
          <td>{{ s.title }}</td>
          <td>{{ s.date }}</td>
          <td>{{ s.location }}</td>
          <td>{{ s.focus }}</td>
          <td>{{ s.duration }}</td>
          <td><span class="tag" :class="s.status.toLowerCase()">{{ s.status }}</span></td>
          <td class="actions">
            <button class="btn small ghost" @click="openEdit(s)">Edit</button>
            <button class="btn small danger" @click="deleteTarget = s">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <p v-else class="empty">No sessions match. Add a session or clear the filters.</p>

  <ConfirmModal
    :show="!!deleteTarget"
    title="Delete this session?"
    :message="deleteTarget ? `“${deleteTarget.title}” will be removed permanently.` : ''"
    @confirm="confirmDelete"
    @cancel="deleteTarget = null"
  />
</template>