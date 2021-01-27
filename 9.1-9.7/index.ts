import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
  if (!req.query.height || !req.query.weight) {
    res.status(400).json({
      error: "parameters are missing",
    });
  }

  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (isNaN(height) || isNaN(weight)) {
    res.status(400).json({
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

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body;
  if (typeof daily_exercises === "undefined" || typeof target === "undefined") {
    return res.status(400).json({ error: "parameters missing" });
  }

  if (
    typeof target === "number" &&
    Array.isArray(daily_exercises) &&
    daily_exercises.every((num) => typeof num === "number")
  ) {
    const result = calculateExercises(target, daily_exercises);
    return res.status(200).json(result);
  }

  return res.status(400).json({ error: "malformatted parameters" });
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
