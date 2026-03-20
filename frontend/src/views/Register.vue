<template>
  <div class="container">
    <div class="left">
      <div class="overlay">
        <h1>Seu bem-estar, nossa missão</h1>
      </div>
    </div>

    <div class="right">
      <div class="form-box">
        <h2 class="brand">Dra. Maggessy Fisioterapia</h2>
<h3>Cadastro</h3>

<input v-model="name" placeholder="Nome completo" />
<input v-model="email" placeholder="Email" />
<input v-model="password" type="password" placeholder="Senha" />

<div class="address-grid">
  <input v-model="cep" placeholder="CEP" @blur="searchCEP" class="cep-input" />
  <input v-model="numero" placeholder="Nº" class="numero-input" />
</div>

<input v-model="rua" placeholder="Logradouro (Rua/Av)" disabled />
<input v-model="bairro" placeholder="Bairro" disabled />

<div class="address-grid">
  <input v-model="cidade" placeholder="Cidade" disabled />
  <input v-model="estado" placeholder="UF" disabled class="uf-input" />
</div>
<button @click="register">Cadastrar</button>

        <p class="login-text">
          Já tem uma conta?
          <span 
  class="login-link" 
  @click="$router.push('/login')"
>
  Faça login
</span>
        </p>
      </div>
    </div>

  </div>
</template>

<script setup>
import { useToast } from "vue-toastification";
import { ref } from "vue";
import api from "../services/api";
import { useRouter } from "vue-router"; // Importando o router para navegação

const toast = useToast();
const router = useRouter();

const name = ref("");
const email = ref("");
const password = ref("");

const cep = ref("");
const rua = ref("");
const bairro = ref("");
const cidade = ref("");
const estado = ref("");
const numero = ref("");

const searchCEP = async () => {
  const cleanCEP = cep.value.replace(/\D/g, "");
  if (cleanCEP.length !== 8) return;

  try {
    toast.info("Buscando endereço...");
    const res = await api.get(`/address/${cleanCEP}`);
    
    rua.value = res.data.rua;
    bairro.value = res.data.bairro;
    cidade.value = res.data.cidade;
    estado.value = res.data.estado;
    
    toast.success("Endereço encontrado!");
  } catch (err) {
    toast.error("CEP não encontrado ou erro na busca.");
    rua.value = ""; bairro.value = ""; cidade.value = ""; estado.value = "";
  }
};

const register = async () => {
  try {

    await api.post("/users", {
      name: name.value,
      email: email.value,
      password: password.value,
      address: {
        cep: cep.value,
        rua: rua.value,
        bairro: bairro.value,
        cidade: cidade.value,
        estado: estado.value,
        numero: numero.value
      }
    });

    toast.success("Cadastro realizado com sucesso!");
    router.push("/login"); 
  } catch (error) {
    toast.error(error.response?.data?.error || "Erro ao cadastrar");
  }
};
</script>

<style scoped>

.container {
  display: flex;
  width: 100vw; 
  height: 100vh;
  margin: 0;
}

.left {
  flex: 0 0 60%; 
  background: url("https://images.unsplash.com/photo-1576091160550-2173dba999ef") no-repeat center;
  background-size: cover;
}

.right {
  flex: 0 0 40%; 
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  padding: 30px;
}

.form-box {
  width: 100%;
  max-width: 320px; 
}

.overlay {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(0,180,216,0.6), rgba(128,237,153,0.6));
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay h1 {
  color: white;
  font-size: 32px;
  text-align: center;
  width: 70%;
}


.right {
  width: 40%;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
}


.form-box {
  width: 70%;
}

.brand {
  color: #1d3557;
  margin-bottom: 10px;
}

h3 {
  margin-bottom: 20px;
}


input {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;

  border-radius: 8px;
  border: 1px solid #00b4d8;
}

input:focus {
  outline: none;
  border-color: #0077b6;
}


button {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;

  background: #00b4d8;
  color: white;
  font-weight: bold;

  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background: #0096c7;
}

.login-text {
  margin-top: 15px;
  font-size: 14px;
}

.login-link {
  color: #00b4d8;
  cursor: pointer;
  font-weight: bold;
}
.address-grid {
  display: grid;
  grid-template-columns: 1fr 1fr; 
  gap: 15px; 
  margin-bottom: 0px;
}

.address-grid input {
  margin-bottom: 15px;
}

.address-grid .uf-input {
  
  grid-column: span 1; 
}

.address-grid .cep-input {
  grid-column: span 1.4; 
}
.address-grid .numero-input {
  grid-column: span 0.6;
}

@media (max-width: 480px) {
  .address-grid {
    grid-template-columns: 1fr;
  }
}
</style>