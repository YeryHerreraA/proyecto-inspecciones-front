<template>
  <div class="inspecciones-list">
    <h2>Inspecciones</h2>
    <router-link to="/inspecciones/crear">Nueva Inspección</router-link>
    <ul>
      <li v-for="inspeccion in inspecciones" :key="inspeccion.id">
        <router-link :to="`/inspecciones/${inspeccion.id}`">
          {{ inspeccion.area }} - {{ inspeccion.fecha }} - {{ inspeccion.tipo }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const inspecciones = ref([])

const fetchInspecciones = async () => {
  const res = await axios.get('/api/inspecciones')
  inspecciones.value = res.data
}

onMounted(fetchInspecciones)
</script>

<style scoped>
.inspecciones-list { max-width: 600px; margin: 2rem auto; }
ul { list-style: none; padding: 0; }
li { margin: 0.5rem 0; }
</style> 