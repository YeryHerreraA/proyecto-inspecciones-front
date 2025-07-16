<template>
  <div class="crear-condicion">
    <h2>Nueva Condición</h2>
    <form @submit.prevent="crear">
      <div>
        <label>Tipo:</label>
        <input v-model="tipo" required />
      </div>
      <div>
        <label>Categoría:</label>
        <input v-model="categoria" required />
      </div>
      <div>
        <label>Descripción:</label>
        <textarea v-model="descripcion" required></textarea>
      </div>
      <div>
        <label>Criticidad:</label>
        <select v-model="criticidad" required>
          <option value="Bajo">Bajo</option>
          <option value="Medio">Medio</option>
          <option value="Alto">Alto</option>
          <option value="Crítico">Crítico</option>
        </select>
      </div>
      <div>
        <label>Evidencia (imagen):</label>
        <input type="file" @change="onFileChange" />
      </div>
      <div v-if="error" class="error">{{ error }}</div>
      <button type="submit">Crear</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

const tipo = ref('')
const categoria = ref('')
const descripcion = ref('')
const criticidad = ref('Bajo')
const evidencia = ref(null)
const error = ref('')
const route = useRoute()
const router = useRouter()

const onFileChange = (e) => {
  evidencia.value = e.target.files[0]
}

const crear = async () => {
  error.value = ''
  const formData = new FormData()
  formData.append('inspeccion_id', route.params.id)
  formData.append('tipo', tipo.value)
  formData.append('categoria', categoria.value)
  formData.append('descripcion', descripcion.value)
  formData.append('criticidad', criticidad.value)
  if (evidencia.value) {
    formData.append('evidencia', evidencia.value)
  }
  try {
    await axios.post('/api/condiciones', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    router.push(`/inspecciones/${route.params.id}`)
  } catch (err) {
    error.value = err.response?.data?.message || 'Error al crear condición'
  }
}
</script>

<style scoped>
.crear-condicion { max-width: 400px; margin: 2rem auto; }
.error { color: red; margin-top: 1rem; }
</style> 