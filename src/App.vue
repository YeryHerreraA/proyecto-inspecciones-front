<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div>
    <nav style="padding: 1rem; background: #f5f5f5;">
      <router-link to="/">Inicio</router-link>
      <router-link to="/inspecciones" style="margin-left: 1rem;">Inspecciones</router-link>
      <router-link to="/login" style="margin-left: 1rem;">Login</router-link>
      <router-link to="/register" style="margin-left: 1rem;">Registro</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
nav a {
  text-decoration: none;
  color: #333;
}
nav a.router-link-exact-active {
  font-weight: bold;
  color: #007bff;
}
</style>
