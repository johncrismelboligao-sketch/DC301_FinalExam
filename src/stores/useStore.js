// Simple shared state (no extra library needed).
// Data is saved in localStorage so it survives a page refresh.
import { reactive, watch } from 'vue'

const KEY = 'football_training_v1'

const seed = {
  sessions: [
    { id: 1, title: 'Passing Triangles', date: '2026-10-20', location: 'Main Pitch', focus: 'Passing', duration: 60, status: 'Planned' },
    { id: 2, title: 'Finishing Under Pressure', date: '2026-10-22', location: 'Field B', focus: 'Shooting', duration: 75, status: 'Planned' },
    { id: 3, title: 'Back Four Shape', date: '2026-10-10', location: 'Main Pitch', focus: 'Defending', duration: 90, status: 'Completed' }
  ],
  players: [
    { id: 1, name: 'Matt Omus', position: 'Midfielder', jersey: 8, age: 22, fitness: 'Fit' },
    { id: 2, name: 'Klint Joseph Taylaran', position: 'Forward', jersey: 9, age: 24, fitness: 'Fit' },
    { id: 3, name: 'John Crismel J. Boligao', position: 'Defender', jersey: 4, age: 26, fitness: 'Injured' },
    { id: 4, name: 'Paya Corsiga', position: 'Goalkeeper', jersey: 1, age: 27, fitness: 'Recovering' }
  ],
  drills: [
    { id: 1, name: 'Rondo 4v2', category: 'Passing', duration: 15, difficulty: 'Easy', description: 'Four players keep the ball away from two defenders in a small grid.' },
    { id: 2, name: '1v1 to Goal', category: 'Shooting', duration: 20, difficulty: 'Medium', description: 'Attacker beats a defender and finishes within five seconds.' },
    { id: 3, name: 'Shuttle Sprints', category: 'Fitness', duration: 10, difficulty: 'Hard', description: 'Repeated 20m sprints with 30 seconds of rest between rounds.' }
  ]
}

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : structuredClone(seed)
  } catch {
    return structuredClone(seed)
  }
}

export const state = reactive(load())

watch(state, () => {
  try { localStorage.setItem(KEY, JSON.stringify(state)) } catch { /* storage unavailable */ }
}, { deep: true })

const nextId = (list) => list.reduce((max, item) => Math.max(max, item.id), 0) + 1

// Generic CRUD helpers used by every page
function makeCrud(name) {
  return {
    create(item) {                       // CREATE
      state[name].push({ ...item, id: nextId(state[name]) })
    },
    update(id, data) {                   // UPDATE
      const i = state[name].findIndex((x) => x.id === id)
      if (i !== -1) state[name][i] = { ...state[name][i], ...data, id }
    },
    remove(id) {                         // DELETE
      state[name] = state[name].filter((x) => x.id !== id)
    }
  }
}

export const sessionsApi = makeCrud('sessions')
export const playersApi = makeCrud('players')
export const drillsApi = makeCrud('drills')