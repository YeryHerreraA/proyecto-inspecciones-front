import { createRouter, createWebHistory } from 'vue-router'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Home from './components/Home.vue'
import InspeccionesList from './components/InspeccionesList.vue'
import InspeccionDetalle from './components/InspeccionDetalle.vue'
import InspeccionCrear from './components/InspeccionCrear.vue'
import CondicionCrear from './components/CondicionCrear.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/inspecciones', name: 'InspeccionesList', component: InspeccionesList },
  { path: '/inspecciones/crear', name: 'InspeccionCrear', component: InspeccionCrear },
  { path: '/inspecciones/:id', name: 'InspeccionDetalle', component: InspeccionDetalle },
  { path: '/inspecciones/:id/condiciones/crear', name: 'CondicionCrear', component: CondicionCrear },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router 