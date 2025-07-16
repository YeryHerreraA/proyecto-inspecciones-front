<template>
  <div class="crear-inspeccion">
    <h2>Nueva Inspección</h2>
    <form @submit.prevent="crear">
      <div class="form-group">
        <label>Área:</label>
        <input v-model="area" required />
      </div>
      <div class="form-group">
        <label>Fecha:</label>
        <input type="date" v-model="fecha" required />
      </div>
      <div class="form-group">
        <label>Tipo:</label>
        <input v-model="tipo" required />
      </div>
      <div class="form-group">
        <label>Observaciones:</label>
        <textarea v-model="observaciones"></textarea>
      </div>
      <div v-if="error" class="error">{{ error }}</div>
      <button type="submit">Crear</button>
    </form>
    <div style="margin-top: 1rem; text-align: center;">
      <router-link to="/inspecciones">Volver al listado</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const area = ref('')
const fecha = ref('')
const tipo = ref('')
const observaciones = ref('')
const error = ref('')
const router = useRouter()

const crear = async () => {
  error.value = ''
  try {
    await axios.post('/api/inspecciones', {
      area: area.value,
      fecha: fecha.value,
      tipo: tipo.value,
      observaciones: observaciones.value
    })
    router.push('/inspecciones')
  } catch (err) {
    error.value = err.response?.data?.message || 'Error al crear inspección'
  }
}
</script>

<style scoped>
.crear-inspeccion {
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
input, textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #bbb;
  border-radius: 5px;
  font-size: 1rem;
  color: #222; /* Texto del input/textarea oscuro */
  background: #fff;
}
textarea {
  min-height: 60px;
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
</style> 