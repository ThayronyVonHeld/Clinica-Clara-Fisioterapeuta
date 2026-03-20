# 🩺 Intelligent Customer Service System - Dra. Maggessy

Um sistema inteligente de agendamento fisioterapêutico que integra APIs externas para oferecer uma experiência personalizada ao paciente, informando condições climáticas e automatizando endereços.


## 🚀 Funcionalidades Principais

- **Agendamento Inteligente:** Pacientes podem agendar horários fixos (09h às 19h), evitando conflitos.
- **Integração com Clima (OpenWeather):** Exibe a previsão do tempo no dia da consulta, avisando se haverá chuva.
- **Automação de Endereço (ViaCEP):** Preenchimento automático de logradouro, bairro e cidade através do CEP no cadastro.
- **Painel Administrativo:** Visão completa da agenda para a secretária/doutora, com gestão de todos os pacientes.
- **Segurança:** Autenticação via JWT (JSON Web Tokens) com senhas criptografadas por Bcrypt.

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Vue.js 3** (Composition API)
- **Vite** (Build tool)
- **Vue Router** (Navegação SPA)
- **Axios** (Consumo de API)
- **SweetAlert2** & **Vue-Toastification** (Feedback visual)

### Backend
- **Node.js** com **Express**
- **MongoDB** com **Mongoose** (Banco de dados NoSQL)
- **JWT** (Autenticação)
- **Bcrypt.js** (Segurança de dados)

## 🔧 Como rodar o projeto

### Pré-requisitos
- Node.js instalado
- Conta no MongoDB Atlas (ou MongoDB Local)
- Chave de API do [OpenWeatherMap](https://openweathermap.org/)

### 1. Configuração do Backend
```bash
cd backend
npm install

```
Crie um arquivo `.env` na pasta `/backend` com as seguintes chaves:
```env
PORT=3000
MONGO_URI=sua_uri_do_mongodb
JWT_SECRET=seu_segredo_jwt
WEATHER_API_KEY=sua_chave_openweather
```
Inicie o servidor:
```bash
npm start
```

### 2. Configuração do Frontend
```bash
cd frontend
npm install
npm run dev
```

## 🌐 Deploy (Links Sugeridos)
- **Frontend:** [Link do Vercel/Netlify aqui]
- **Backend:** [Link do Render/Railway aqui]

---
Desenvolvido por **Thayrony VonHeld** para o projeto de Fisioterapia da Dra. Maggessy.
```
