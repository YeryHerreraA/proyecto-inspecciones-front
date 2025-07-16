<template>
  <div class="inspecciones-list">
    <h2>Inspecciones</h2>
    <router-link class="nuevo-btn" to="/inspecciones/crear">+ Nueva Inspección</router-link>
    <div v-if="mensaje" class="mensaje-exito">{{ mensaje }}</div>
    <ul>
      <li v-for="inspeccion in inspecciones" :key="inspeccion.id" class="flex items-center justify-between">
        <router-link :to="`/inspecciones/${inspeccion.id}`">
          {{ inspeccion.area }} - {{ inspeccion.fecha }} - {{ inspeccion.tipo }}
        </router-link>
        <button
          @click="eliminarInspeccion(inspeccion.id)"
          class="ml-4 px-3 py-1 rounded bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors"
          title="Eliminar"
        >
          Eliminar
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const inspecciones = ref([])
const mensaje = ref('')

const fetchInspecciones = async () => {
  const res = await axios.get('/api/inspecciones')
  inspecciones.value = res.data
}

const eliminarInspeccion = async (id) => {
  if (confirm('¿Estás seguro de que deseas eliminar esta inspección?')) {
    try {
      await axios.delete(`/api/inspecciones/${id}`)
      inspecciones.value = inspecciones.value.filter(i => i.id !== id)
      mensaje.value = 'Inspección eliminada'
      setTimeout(() => mensaje.value = '', 2500)
    } catch (err) {
      alert('Error al eliminar la inspección')
    }
  }
}

onMounted(fetchInspecciones)
</script>

<style scoped>
.inspecciones-list {
  max-width: 600px;
  margin: 3rem auto;
  padding: 2rem 2.5rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 2px 8px #0001;
  text-align: center;
}
h2 {
  margin-bottom: 1.5rem;
  color: #222;
}
.nuevo-btn {
  display: inline-block;
  margin-bottom: 1.5rem;
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
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
li {
  margin: 0.7rem 0;
  padding: 0.7rem 0.5rem;
  border-bottom: 1px solid #eee;
  color: #222;
}
li:last-child {
  border-bottom: none;
}
li a {
  color: #007bff;
  text-decoration: none;
  font-size: 1.08rem;
  transition: color 0.2s;
}
li a:hover {
  color: #0056b3;
}
.mensaje-exito {
  background: #22c55e;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  margin-bottom: 1rem;
  font-weight: bold;
  text-align: center;
}
</style> 