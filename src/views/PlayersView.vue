<script setup>
import { ref, computed, watch } from 'vue'
import { state, playersApi } from '../stores/useStore'
import ConfirmModal from '../components/ConfirmModal.vue'

const positions = ['Goalkeeper', 'Defender', 'Midfielder', 'Forward']
const blank = () => ({ name: '', position: 'Midfielder', jersey: '', age: '', fitness: 'Fit' })
const DRAFT_KEY = 'football_players_form_draft_v1'

function loadDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

const draft = loadDraft()
const form = ref(draft?.form ?? blank())
const editingId = ref(draft?.editingId ?? null)
const showForm = ref(draft?.showForm ?? false)
const error = ref('')
const search = ref('')
const deleteTarget = ref(null)

const filtered = computed(() =>
  state.players.filter((p) => p.name.toLowerCase().includes(search.value.toLowerCase()))
)

watch([form, editingId, showForm], ([currentForm, currentEditingId, currentShowForm]) => {
  if (!currentShowForm) {
    try { localStorage.removeItem(DRAFT_KEY) } catch { /* storage unavailable */ }
    return
  }
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify({
      form: currentForm,
      editingId: currentEditingId,
      showForm: currentShowForm
    }))
  } catch { /* storage unavailable */ }
}, { deep: true })

function openCreate() { form.value = blank(); editingId.value = null; error.value = ''; showForm.value = true }
function openEdit(p) { form.value = { ...p }; editingId.value = p.id; error.value = ''; showForm.value = true }

function save() {
  const f = form.value
  if (!f.name.trim() || !f.jersey || !f.age) { error.value = 'Name, jersey number and age are required.'; return }
  const taken = state.players.some((p) => p.jersey === Number(f.jersey) && p.id !== editingId.value)
  if (taken) { error.value = `Jersey #${f.jersey} is already taken.`; return }
  f.jersey = Number(f.jersey); f.age = Number(f.age)
  if (editingId.value) playersApi.update(editingId.value, f)
  else playersApi.create(f)
  showForm.value = false
}
function cancelForm() { showForm.value = false }
function confirmDelete() { playersApi.remove(deleteTarget.value.id); deleteTarget.value = null }
</script>

<template>
  <div class="page-head">
    <h1>Squad</h1>
    <button class="btn primary" @click="openCreate">Add player</button>
  </div>

  <form v-if="showForm" class="card form" @submit.prevent="save">
    <h2>{{ editingId ? 'Edit player' : 'New player' }}</h2>
    <p v-if="error" class="error">{{ error }}</p>
    <div class="form-grid">
      <label>Full name<input v-model="form.name" placeholder="e.g. Matt Omus" /></label>
      <label>Position
        <select v-model="form.position"><option v-for="p in positions" :key="p">{{ p }}</option></select>
      </label>
      <label>Jersey number<input v-model="form.jersey" type="number" min="1" max="99" /></label>
      <label>Age<input v-model="form.age" type="number" min="14" max="45" /></label>
      <label>Fitness
        <select v-model="form.fitness"><option>Fit</option><option>Recovering</option><option>Injured</option></select>
      </label>
    </div>
    <div class="row end">
      <button type="button" class="btn ghost" @click="cancelForm">Cancel</button>
      <button type="submit" class="btn primary">{{ editingId ? 'Save changes' : 'Add player' }}</button>
    </div>
  </form>

  <div class="toolbar"><input v-model="search" placeholder="Search players" /></div>

  <div v-if="filtered.length" class="grid cards">
    <article v-for="p in filtered" :key="p.id" class="card player">
      <div class="jersey">{{ p.jersey }}</div>
      <div class="player-info">
        <h3>{{ p.name }}</h3>
        <p>{{ p.position }}, age {{ p.age }}</p>
        <span class="tag" :class="p.fitness.toLowerCase()">{{ p.fitness }}</span>
      </div>
      <div class="actions">
        <button class="btn small ghost" @click="openEdit(p)">Edit</button>
        <button class="btn small danger" @click="deleteTarget = p">Delete</button>
      </div>
    </article>
  </div>
  <p v-else class="empty">No players found. Add a player to build your squad.</p>

  <ConfirmModal
    :show="!!deleteTarget"
    title="Remove this player?"
    :message="deleteTarget ? `${deleteTarget.name} will be removed from the squad.` : ''"
    @confirm="confirmDelete"
    @cancel="deleteTarget = null"
  />
</template>