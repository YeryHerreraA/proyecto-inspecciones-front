<template>
  <div class="login-container">
    <h2>Iniciar Sesión</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input type="password" v-model="password" required />
      </div>
      <div v-if="error" class="error">{{ error }}</div>
      <button type="submit">Entrar</button>
    </form>
    <div class="register-link">
      ¿No tienes cuenta? <router-link to="/register">Regístrate</router-link>
    </div>
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
    await axios.get('/sanctum/csrf-cookie', { withCredentials: true })
    await axios.post('/api/login', {
      email: email.value,
      password: password.value
    }, { withCredentials: true })
    router.push('/inspecciones')
  } catch (err) {
    error.value = err.response?.data?.message || 'Error al iniciar sesión'
  }
}
</script>

<style scoped>
.login-container {
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
.register-link {
  margin-top: 1.5rem;
  text-align: center;
  color: #2563eb;
}
.register-link a {
  color: #2563eb;
  text-decoration: underline;
}
</style> 