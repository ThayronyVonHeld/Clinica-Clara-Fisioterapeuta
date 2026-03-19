import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Criar usuário
router.post("/", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const user = new User({
      name,
      email,
      password,
      role
    });

    await user.save();

    res.status(201).json(user);
  } catch (error) {
     if (error.code === 11000) {
    return res.status(400).json({ error: "Email já cadastrado" });
  }

  res.status(500).json({ error: error.message });
  }
  
});

export default router;