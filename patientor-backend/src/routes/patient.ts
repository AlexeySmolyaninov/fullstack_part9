import express from "express";
import {
  addPatient,
  getPatient,
  getPatients,
} from "../services/patientService";
import parseReqDataToNewPatientType from "../utils";
const router = express.Router();

router.get("/", (_req, res) => {
  res.send(getPatients());
});

router.post("/", (req, res) => {
  try {
    const newPatient = parseReqDataToNewPatientType(req.body);
    const savedNewPatient = addPatient(newPatient);
    res.send(savedNewPatient);
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).send({ error: e.message });
    }
  }
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  if (!id || typeof id !== "string") {
    res.status(400).send({ error: "ID should of type Strig" });
  }
  try {
    const patient = getPatient(id);
    res.send(patient);
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).send({ error: e.message });
    }
  }
});

export default router;
