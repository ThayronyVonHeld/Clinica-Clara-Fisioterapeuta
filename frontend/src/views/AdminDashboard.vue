<template>
  <div class="dashboard">

    <nav class="navbar">
      <h2>Painel do Secretário</h2>
      <button @click="logout">Sair</button>
    </nav>

    <div class="header">
      <h1>Consultas Agendadas</h1>
      <p>Gerencie todas as consultas da clínica</p>
    </div>

    <div class="list">

      <div 
        v-for="c in consultations" 
        :key="c._id" 
        class="card"
      >
        <p><strong>👤</strong> {{ c.user.name }}</p>
        <p><strong>📧</strong> {{ c.user.email }}</p>
        <p><strong>📅</strong> {{ c.date }}</p>
        <p><strong>⏰</strong> {{ c.time }}</p>

        <button @click="deleteConsultation(c._id)">
          Cancelar
        </button>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../services/api";
import { useToast } from "vue-toastification";

const toast = useToast();
const consultations = ref([]);

const loadConsultations = async () => {
  try {
    const res = await api.get("/consultations/all");
    consultations.value = res.data;
  } catch (err) {
    toast.error("Acesso negado ou erro ao carregar");
  }
};

const deleteConsultation = async (id) => {
  try {
    await api.delete(`/consultations/${id}`);
    toast.success("Consulta cancelada!");
    loadConsultations();
  } catch {
    toast.error("Erro ao cancelar");
  }
};

const logout = () => {
  localStorage.removeItem("token");
  location.reload();
};

onMounted(loadConsultations);
</script>

<style scoped>
.dashboard {
  min-height: 100vh;
  background: linear-gradient(135deg, #a8e6ff, #b9fbc0);
  padding: 20px;
}

.navbar {
  display: flex;
  justify-content: space-between;
  background: white;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.navbar button {
  width: auto;
  background: #ff6b6b;
  border: none;
  padding: 8px 15px;
  color: white;
  border-radius: 8px;
}

.header {
  margin-bottom: 20px;
}

.list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.card {
  background: white;
  padding: 15px;
  border-radius: 10px;
}

button {
  margin-top: 10px;
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: #ff6b6b;
  color: white;
}
</style>