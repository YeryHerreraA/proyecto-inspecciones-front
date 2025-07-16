<template>
  <div v-if="inspeccion" class="inspeccion-detalle">
    <h2>Detalle de Inspección</h2>
    <div class="detalle-campos">
      <p><strong>Área:</strong> {{ inspeccion.area }}</p>
      <p><strong>Fecha:</strong> {{ inspeccion.fecha }}</p>
      <p><strong>Tipo:</strong> {{ inspeccion.tipo }}</p>
      <p><strong>Observaciones:</strong> <span class="texto-largo">{{ inspeccion.observaciones }}</span></p>
    </div>
    <h3>Condiciones</h3>
    <ul>
      <li v-for="cond in inspeccion.condiciones" :key="cond.id">
        <strong>{{ cond.tipo }}</strong> - {{ cond.categoria }} - {{ cond.criticidad }}<br>
        <span class="texto-largo">{{ cond.descripcion }}</span><br>
        <span v-if="cond.evidencia">
          Evidencia:<br>
          <img :src="evidenciaUrl(cond.evidencia)" alt="Evidencia" style="max-width: 300px; max-height: 200px; margin: 0.5rem 0; border-radius: 8px; border: 1px solid #ccc;" />
        </span>
      </li>
    </ul>
    <router-link class="nuevo-btn" :to="`/inspecciones/${inspeccion.id}/condiciones/crear`">Agregar Condición</router-link>
    <br><br>
    <router-link class="volver-link" to="/inspecciones">Volver al listado</router-link>
  </div>
  <div v-else class="cargando">Cargando...</div>
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
.inspeccion-detalle {
  max-width: 600px;
  margin: 3rem auto;
  padding: 2rem 2.5rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 2px 8px #0001;
  text-align: center;
  color: #222;
}
h2 {
  margin-bottom: 1.5rem;
  color: #222;
}
.detalle-campos {
  text-align: left;
  margin-bottom: 1.5rem;
}
h3 {
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #222;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
}
li {
  margin: 0.7rem 0;
  padding: 0.7rem 0.5rem;
  border-bottom: 1px solid #eee;
  text-align: left;
  color: #222;
}
li:last-child {
  border-bottom: none;
}
.nuevo-btn {
  display: inline-block;
  margin-bottom: 0.5rem;
  padding: 0.5rem 1.2rem;
  background: #007bff;
  color: #fff;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.2s;
}
.nuevo-btn:hover {
  background: #0056b3;
}
.volver-link {
  display: inline-block;
  margin-top: 0.5rem;
  color: #007bff;
  text-decoration: underline;
  font-size: 1rem;
}
.cargando {
  text-align: center;
  margin-top: 4rem;
  font-size: 1.2rem;
}
.texto-largo {
  white-space: pre-line;
  word-break: break-word;
  color: #222;
}
</style> 