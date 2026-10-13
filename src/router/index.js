import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    // Lazy-loaded pages: each one is only downloaded when visited
    { path: '/sessions', name: 'sessions', component: () => import('../views/SessionsView.vue') },
    { path: '/players', name: 'players', component: () => import('../views/PlayersView.vue') },
    { path: '/drills', name: 'drills', component: () => import('../views/DrillsView.vue') },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ]
})

export default router