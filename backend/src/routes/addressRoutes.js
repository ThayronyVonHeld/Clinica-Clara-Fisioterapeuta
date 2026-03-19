import express from "express";

const router = express.Router();

router.get("/:cep", async (req, res) => {
  try {
    const { cep } = req.params;

    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    if (data.erro) {
      return res.status(404).json({ error: "CEP não encontrado" });
    }

    res.json({
      cep: data.cep,
      rua: data.logradouro,
      bairro: data.bairro,
      cidade: data.localidade,
      estado: data.uf
    });

  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar CEP" });
  }
});

export default router;