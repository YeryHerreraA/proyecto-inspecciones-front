import { createRouter, createWebHistory } from 'vue-router'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import InspeccionesList from './components/InspeccionesList.vue'
import InspeccionDetalle from './components/InspeccionDetalle.vue'
import InspeccionCrear from './components/InspeccionCrear.vue'
import CondicionCrear from './components/CondicionCrear.vue'

const routes = [
  { path: '/', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/inspecciones', name: 'InspeccionesList', component: InspeccionesList, meta: { requiresAuth: true } },
  { path: '/inspecciones/crear', name: 'InspeccionCrear', component: InspeccionCrear, meta: { requiresAuth: true } },
  { path: '/inspecciones/:id', name: 'InspeccionDetalle', component: InspeccionDetalle, meta: { requiresAuth: true } },
  { path: '/inspecciones/:id/condiciones/crear', name: 'CondicionCrear', component: CondicionCrear, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation guard para proteger rutas
import axios from 'axios'
router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    try {
      await axios.get('/api/user')
      next()
    } catch {
      next({ name: 'Login' })
    }
  } else {
    next()
  }
})

export default router 