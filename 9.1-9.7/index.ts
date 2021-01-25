import express from "express";
import { calculateBmi } from "./bmiCalculator";
const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
  if (!req.query.height || !req.query.weight) {
    res.status(500).json({
      error: "parameters are missing",
    });
  }

  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (isNaN(height) || isNaN(weight)) {
    res.status(500).json({
      error: "malformatted parameters",
    });
  }
  const message = calculateBmi(height, weight);
  res.json({
    weight,
    height,
    bmi: message,
  });
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
