<template>
  <div class="inspecciones-list">
    <h2>Inspecciones</h2>
    <router-link class="nuevo-btn" to="/inspecciones/crear">+ Nueva Inspección</router-link>
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
</style> 