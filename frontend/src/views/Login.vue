<template>
  <div class="container">

    <div class="left">
      <div class="overlay">
        <h1>Bem-vindo de volta</h1>
      </div>
    </div>

    <div class="right">
      <div class="form-box">
        <h2 class="brand">Dra. Maggessy Fisioterapia</h2>
        <h3>Login</h3>

        <input v-model="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Senha" />

        <button @click="login">Entrar</button>

        <p class="login-text">
          Não tem uma conta?
          <span class="login-link" @click="$router.push('/register')">
            Cadastre-se
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
import { useRouter } from 'vue-router';
const router = useRouter();

const toast = useToast();
const email = ref("");
const password = ref("");


const emit = defineEmits(["goDashboard", "goAdmin", "goRegister"]);

const login = async () => {
  try {
    const response = await api.post("/users/login", {
      email: email.value,
      password: password.value
    });

    localStorage.setItem("token", response.data.token);

    let payload = {};
    try {
      payload = JSON.parse(atob(response.data.token.split(".")[1]));
    } catch (err) {
      toast.error("Erro ao decodificar token");
      return;
    }

    toast.success("Login realizado!");

    if (payload.role === "secretario") {
      router.push("/admin");
    } else {
      router.push("/dashboard");
    }

  } catch (error) {
    toast.error(error.response?.data?.error || "Erro no login");
  }
};
</script>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.container {
  display: flex;
  width: 100vw;
  height: 100vh;
  margin: 0;
  overflow: hidden;
}


.left {
  flex: 0 0 60%;
  background: url("https://images.unsplash.com/photo-1580281657527-47b0c1a3b8d3") no-repeat center;
  background-size: cover;
  display: block;
}

.overlay {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(0, 180, 216, 0.6), rgba(128, 237, 153, 0.6));
  display: flex;
  justify-content: center;
  align-items: center;
}


.overlay h1 {
  color: white;
  font-size: 2.5rem;
  font-weight: bold;
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

h2.brand {
  font-size: 1.6rem;
  color: #0077b6;
  margin-bottom: 5px;
  text-align: center;
}

h3 {
  margin-bottom: 25px;
  color: #333;
  text-align: center;
}

input {
  width: 100%;
  /* Ocupa 100% da form-box */
  padding: 12px;
  margin-bottom: 15px;
  border-radius: 8px;
  border: 1.5px solid #00b4d8;
  font-size: 16px;
  display: block;
  outline: none;
}

input:focus {
  border-color: #80ed99;
  box-shadow: 0 0 5px rgba(128, 237, 147, 0.3);
}

button {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: #00b4d8;
  color: white;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s, transform 0.1s;
}

button:hover {
  background: #0096b1;
}

button:active {
  transform: scale(0.98);
  /* Efeito de clique */
}

.login-text {
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
  color: #666;
}

.login-link {
  color: #00b4d8;
  cursor: pointer;
  font-weight: bold;
}

@media (max-width: 768px) {
  .left {
    display: none;
  flex: 0 0 60%;
  background: url("/frontend/src/assets/LogoClara.png") no-repeat center;
  background-size: cover;
}

  .right {
    flex: 0 0 100%;
    width: 100%;
    height: 100vh;
  }
}
</style>