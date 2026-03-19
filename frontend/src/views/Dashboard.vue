<template>
  <div class="dashboard">

    <nav class="navbar">
      <h2>Dra. Maggessy</h2>
      <button @click="logout">Sair</button>
    </nav>

    <div class="header">
      <h1>Bem-vindo 👋</h1>
      <p>Gerencie suas consultas de forma simples e rápida</p>
    </div>

    
    <div class="grid">

      <div class="card">
        <h3>Agendar Consulta</h3>

        <input type="date" v-model="date" />
        <input type="time" v-model="time" min="09:00" max="19:00"  />

        <button @click="createConsultation">
          Agendar
        </button>
      </div>

      
      <div class="card">
        <h3>Minhas Consultas</h3>

        <div v-if="consultations.length === 0">
          Nenhuma consulta agendada
        </div>
<div 
  v-for="c in consultations" 
  :key="c._id" 
  class="consultation"
>
  <div>
    <p><strong>📅</strong> {{ c.date }}</p>
    <p><strong>⏰</strong> {{ c.time }}</p>
  </div>

  <button class="cancel-btn" @click="cancelConsultation(c._id)">
    Cancelar
  </button>
</div>

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
const date = ref("");
const time = ref("");

const isSunday = (date) => {
  const [year, month, day] = date.split("-");

  const d = new Date(year, month - 1, day);

  return d.getDay() === 0;
};

const isValidTime = (time) => {
  const [hour] = time.split(":").map(Number);
  return hour >= 9 && hour <= 19;
};

const loadConsultations = async () => {
  try {
    const res = await api.get("/consultations");
    consultations.value = res.data;
  } catch {
    toast.error("Erro ao carregar consultas");
  }
};

const createConsultation = async () => {
  try {

    if (isSunday(date.value)) {
      return toast.error("Não atendemos aos domingos");
    }

    if (!isValidTime(time.value)) {
      return toast.error("Horário permitido: 09h às 19h");
    }

    const [hour, minute] = time.value.split(":");
    const h = parseInt(hour);

    const period = h >= 12 ? "PM" : "AM";
    const formattedHour = h % 12 || 12;

    const formattedTime = `${formattedHour}:${minute} ${period}`;

    await api.post("/consultations", {
      date: date.value,
      time: formattedTime
    });

    toast.success("Consulta agendada!");
    loadConsultations();

  } catch (err) {
    toast.error(err.response?.data?.error || "Erro ao agendar");
  }
};

const deleteConsultation = async (id) => {
  try {
    await api.delete(`/consultations/${id}`);

    toast.success("Consulta cancelada!");

    loadConsultations(); 

  } catch (err) {
    toast.error("Erro ao cancelar consulta");
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
  font-family: Arial, sans-serif;
}


.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;

  background: white;
  padding: 15px 30px;
  border-radius: 10px;

  margin-bottom: 30px;
}

.navbar h2 {
  color: #0077b6;
}

.navbar button {
  width: auto; 
  background: #ff6b6b;
  border: none;
  padding: 8px 15px;
  color: white;
  border-radius: 8px;
  cursor: pointer;
}

.header {
  margin-bottom: 30px;
}

.header h1 {
  margin-bottom: 10px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.card {
  background: white;
  padding: 20px;
  border-radius: 15px;

  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.card h3 {
  margin-bottom: 15px;
}


input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;

  border-radius: 8px;
  border: 1px solid #ccc;
}

button {
  width: 100%;
  padding: 10px;

  border: none;
  border-radius: 8px;

  background: linear-gradient(135deg, #00b4d8, #80ed99);
  color: white;
  font-weight: bold;

  cursor: pointer;
}

.consultation {
  display: flex;
  justify-content: space-between;
  align-items: center;

  background: #f1faff;
  padding: 12px;
  margin-top: 10px;
  border-radius: 10px;
}

.cancel-btn {
  background: #ff6b6b;
  border: none;
  padding: 6px 12px;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  width: auto;
}

.cancel-btn:hover {
  background: #e63946;
}

</style>