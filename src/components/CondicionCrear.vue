<template>
  <div class="crear-condicion">
    <h2>Nueva Condición</h2>
    <form @submit.prevent="crear">
      <div class="form-group">
        <label>Tipo:</label>
        <input v-model="tipo" required />
      </div>
      <div class="form-group">
        <label>Categoría:</label>
        <input v-model="categoria" required />
      </div>
      <div class="form-group">
        <label>Descripción:</label>
        <textarea v-model="descripcion" required></textarea>
      </div>
      <div class="form-group">
        <label>Criticidad:</label>
        <select v-model="criticidad" required>
          <option value="Bajo">Bajo</option>
          <option value="Medio">Medio</option>
          <option value="Alto">Alto</option>
          <option value="Crítico">Crítico</option>
        </select>
      </div>
      <div class="form-group">
        <label>Evidencia (imagen):</label>
        <input type="file" @change="onFileChange" />
      </div>
      <div v-if="error" class="error">{{ error }}</div>
      <button type="submit">Crear</button>
    </form>
    <div style="margin-top: 1rem; text-align: center;">
      <router-link :to="`/inspecciones/${route.params.id}`">Volver al detalle</router-link>
      <span> | </span>
      <router-link to="/inspecciones">Volver al listado</router-link>
    </div>
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
.crear-condicion {
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
input, textarea, select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #bbb;
  border-radius: 5px;
  font-size: 1rem;
  color: #222; /* Texto del input/textarea/select oscuro */
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