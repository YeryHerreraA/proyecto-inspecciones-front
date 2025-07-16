<template>
  <div class="register-container">
    <h2>Registrarse</h2>
    <form @submit.prevent="register" autocomplete="off">
      <div class="form-group">
        <label for="name">Nombre:</label>
        <input type="text" v-model="name" required autocomplete="off" />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" v-model="email" required autocomplete="off" />
      </div>
      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input type="password" v-model="password" required autocomplete="new-password" />
      </div>
      <div class="form-group">
        <label for="password_confirmation">Confirmar Contraseña:</label>
        <input type="password" v-model="password_confirmation" required autocomplete="new-password" />
      </div>
      <div v-if="error" class="error">{{ error }}</div>
      <button type="submit">Registrarse</button>
    </form>
    <div class="login-link">
      ¿Ya tienes cuenta? <router-link to="/">Inicia sesión</router-link>
    </div>
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
    await axios.get('/sanctum/csrf-cookie', { withCredentials: true })
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
.register-container {
  max-width: 400px;
  margin: 3rem auto;
  padding: 2rem 2.5rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  background: #fafbfc;
  box-shadow: 0 2px 8px #0001;
  text-align: center;
  color: #222; /* Color de texto oscuro para todo el contenedor */
}
h2 {
  margin-bottom: 1.5rem;
  color: #222; /* Título oscuro */
}
.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 1.2rem;
}
label {
  margin-bottom: 0.3rem;
  font-weight: 500;
  color: #222; /* Label oscuro */
}
input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #bbb;
  border-radius: 5px;
  font-size: 1rem;
  color: #222; /* Texto del input oscuro */
  background: #fff;
}
button {
  width: 100%;
  padding: 0.7rem;
  background: #2563eb; /* Azul Tailwind */
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: background 0.2s;
}
button:hover {
  background: #1d4ed8; /* Azul más oscuro al hacer hover */
}
.error {
  color: #e74c3c;
  margin-bottom: 1rem;
  width: 100%;
  text-align: left;
}
.login-link {
  margin-top: 1.5rem;
  text-align: center;
  color: #2563eb;
}
.login-link a {
  color: #2563eb;
  text-decoration: underline;
}
</style> 