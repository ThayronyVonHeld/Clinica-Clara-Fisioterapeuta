<template>
  <Home v-if="page === 'home'" @goRegister="page='register'" @goLogin="page='login'" />
  <Register v-if="page === 'register'" @goLogin="page='login'" />
  <Login v-if="page === 'login'" @goDashboard="page='dashboard'" @goAdmin="page='admin'"/>
  <Dashboard v-if="page === 'dashboard'" /> <AdminDashboard v-if="page === 'admin'" />
</template>

<script setup>
import { ref } from "vue";
import Home from "./views/Home.vue";
import Register from "./views/Register.vue";
import Login from "./views/Login.vue";
import Dashboard from "./views/Dashboard.vue";
import AdminDashboard from "./views/AdminDashboard.vue";

const page = ref("home");
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.app {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  /* 🎨 Degradê */
  background: linear-gradient(135deg, #a8e6ff, #b9fbc0);
}
</style>