<template>
  <div class="crear-inspeccion">
    <h2>Nueva Inspección</h2>
    <form @submit.prevent="crear">
      <div>
        <label>Área:</label>
        <input v-model="area" required />
      </div>
      <div>
        <label>Fecha:</label>
        <input type="date" v-model="fecha" required />
      </div>
      <div>
        <label>Tipo:</label>
        <input v-model="tipo" required />
      </div>
      <div>
        <label>Observaciones:</label>
        <textarea v-model="observaciones"></textarea>
      </div>
      <div v-if="error" class="error">{{ error }}</div>
      <button type="submit">Crear</button>
    </form>
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
.crear-inspeccion { max-width: 400px; margin: 2rem auto; }
.error { color: red; margin-top: 1rem; }
</style> 