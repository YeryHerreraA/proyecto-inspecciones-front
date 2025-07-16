<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import axios from 'axios'
import { useRouter, useRoute } from 'vue-router'

const user = ref(null)
const router = useRouter()
const route = useRoute()

const fetchUser = async () => {
  try {
    const res = await axios.get('/api/user')
    user.value = res.data
  } catch {
    user.value = null
  }
}

const logout = async () => {
  await axios.post('/api/logout')
  user.value = null
  router.push('/')
}

onMounted(fetchUser)
watch(route, fetchUser)

// Mostrar menú solo en rutas de inspecciones
const showMenu = computed(() => {
  return user.value && route.path.startsWith('/inspecciones')
})
</script>

<template>
  <div>
    <nav v-if="showMenu" class="menu-bar">
      <span class="menu-user">Hola, {{ user.name }}</span>
      <button class="logout-btn" @click="logout">Cerrar sesión</button>
    </nav>
    <router-view />
  </div>
</template>

<style>
nav.menu-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem;
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
}
.menu-user {
  color: #222;
  font-weight: 500;
  font-size: 1.1rem;
}
.logout-btn {
  background: #e74c3c;
  color: #fff;
  border: none;
  padding: 0.4rem 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  transition: background 0.2s;
}
.logout-btn:hover {
  background: #c0392b;
}
nav a {
  text-decoration: none;
  color: #007bff;
  font-weight: 500;
}
nav a.router-link-exact-active {
  font-weight: bold;
  color: #0056b3;
}
</style>
