import express from "express";
import Consultation from "../models/Consultation.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { date, time } = req.body;

    if (!date || !time) {
      return res.status(400).json({ error: "Data e horário são obrigatórios" });
    }

    const existingConsultation = await Consultation.findOne({ date, time });

    if (existingConsultation) {
      return res.status(400).json({ error: "Horário já está ocupado" });
    }

    const consultation = new Consultation({
      user: req.user.id,
      date,
      time
    });

    await consultation.save();

    res.status(201).json(consultation);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;