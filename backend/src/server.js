import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";
import consultationRoutes from "./routes/consultationRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import weatherRoutes from "./routes/weatherRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API rodando");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

app.use("/consultations", consultationRoutes);
app.use("/address", addressRoutes);
app.use("/weather", weatherRoutes);