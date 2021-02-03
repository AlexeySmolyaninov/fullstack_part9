import express from "express";
import { addPatient, getPatients } from "../services/patientService";
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

export default router;
