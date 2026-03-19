import express from "express";

const router = express.Router();

router.get("/:date", async (req, res) => {
  try {
    const { date } = req.params;

    const city = "Rio de Janeiro";

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`
    );

    const data = await response.json();

    const forecast = data.list.find(item =>
      item.dt_txt.includes(date)
    );

    if (!forecast) {
      return res.status(404).json({ error: "Previsão não encontrada" });
    }

    res.json({
      data: forecast.dt_txt,
      temperatura: forecast.main.temp,
      clima: forecast.weather[0].description,
      chanceChuva: forecast.weather[0].main === "Rain"
    });

  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar clima" });
  }
});

export default router;