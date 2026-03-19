import express from "express";

const router = express.Router();

router.get("/:date", async (req, res) => {
  try {
    const { date } = req.params;

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=-22.90&lon=-43.20&appid=${process.env.WEATHER_API_KEY}&units=metric`
    );

    const data = await response.json();

    if (!data.list) {
      return res.status(400).json({
        error: "Erro na API externa",
        response: data
      });
    }

    const forecast = data.list.find(item =>
      item.dt_txt.startsWith(date)
    );

    if (!forecast) {
      return res.status(404).json({
        error: "Previsão não encontrada (máx 5 dias)"
      });
    }

    res.json({
      data: forecast.dt_txt,
      temperatura: forecast.main.temp,
      clima: forecast.weather[0].description,
      chanceChuva: forecast.weather[0].main === "Rain"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao buscar clima" });
  }
});

export default router;