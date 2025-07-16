<template>
  <div v-if="inspeccion" class="inspeccion-detalle">
    <h2>Detalle de Inspección</h2>
    <p><strong>Área:</strong> {{ inspeccion.area }}</p>
    <p><strong>Fecha:</strong> {{ inspeccion.fecha }}</p>
    <p><strong>Tipo:</strong> {{ inspeccion.tipo }}</p>
    <p><strong>Observaciones:</strong> {{ inspeccion.observaciones }}</p>
    <h3>Condiciones</h3>
    <ul>
      <li v-for="cond in inspeccion.condiciones" :key="cond.id">
        <strong>{{ cond.tipo }}</strong> - {{ cond.categoria }} - {{ cond.criticidad }}<br>
        {{ cond.descripcion }}<br>
        <span v-if="cond.evidencia">Evidencia: <a :href="evidenciaUrl(cond.evidencia)" target="_blank">Ver imagen</a></span>
      </li>
    </ul>
    <router-link :to="`/inspecciones/${inspeccion.id}/condiciones/crear`">Agregar Condición</router-link>
  </div>
  <div v-else>Cargando...</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const inspeccion = ref(null)

const fetchInspeccion = async () => {
  const res = await axios.get(`/api/inspecciones/${route.params.id}`)
  inspeccion.value = res.data
}

const evidenciaUrl = (path) => path ? `http://localhost:8000/storage/${path}` : ''

onMounted(fetchInspeccion)
</script>

<style scoped>
.inspeccion-detalle { max-width: 600px; margin: 2rem auto; }
ul { list-style: none; padding: 0; }
li { margin: 0.5rem 0; }
</style> 