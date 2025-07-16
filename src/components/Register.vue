<template>
  <div class="register-container">
    <h2>Registrarse</h2>
    <form @submit.prevent="register">
      <div>
        <label for="name">Nombre:</label>
        <input type="text" v-model="name" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Contraseña:</label>
        <input type="password" v-model="password" required />
      </div>
      <div>
        <label for="password_confirmation">Confirmar Contraseña:</label>
        <input type="password" v-model="password_confirmation" required />
      </div>
      <div v-if="error" class="error">{{ error }}</div>
      <button type="submit">Registrarse</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const name = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')
const error = ref('')
const router = useRouter()

const register = async () => {
  error.value = ''
  try {
    // Obtener CSRF cookie primero
    await axios.get('/sanctum/csrf-cookie', { withCredentials: true })
    // Intentar registro
    await axios.post('/api/register', {
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: password_confirmation.value
    }, { withCredentials: true })
    router.push('/')
  } catch (err) {
    error.value = err.response?.data?.message || 'Error al registrarse'
  }
}
</script>

<style scoped>
.register-container { max-width: 400px; margin: 2rem auto; padding: 2rem; border: 1px solid #ccc; border-radius: 8px; }
.error { color: red; margin-top: 1rem; }
</style> 