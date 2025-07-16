<template>
  <div class="login-container">
    <h2>Iniciar Sesión</h2>
    <form @submit.prevent="login">
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Contraseña:</label>
        <input type="password" v-model="password" required />
      </div>
      <div v-if="error" class="error">{{ error }}</div>
      <button type="submit">Entrar</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const login = async () => {
  error.value = ''
  try {
    // Obtener CSRF cookie primero
    await axios.get('/sanctum/csrf-cookie', { withCredentials: true })
    // Intentar login
    await axios.post('/api/login', {
      email: email.value,
      password: password.value
    }, { withCredentials: true })
    router.push('/')
  } catch (err) {
    error.value = err.response?.data?.message || 'Error al iniciar sesión'
  }
}
</script>

<style scoped>
.login-container { max-width: 400px; margin: 2rem auto; padding: 2rem; border: 1px solid #ccc; border-radius: 8px; }
.error { color: red; margin-top: 1rem; }
</style> 