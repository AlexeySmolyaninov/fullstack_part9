import express from "express";
import {
  addEntry,
  addPatient,
  getPatient,
  getPatients,
} from "../services/patientService";
import parseReqDataToNewPatientType from "../utils/parseReqDataToNewPatientType";
import parseReqDataToNewPatientEntry from "../utils/parseReqDataToNewPatientEntry";
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
  try {
    const patient = getPatient(id);
    res.send(patient);
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).send({ error: e.message });
    }
  }
});

router.post("/:id/entries", (req, res) => {
  const { id } = req.params;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const newEntry = parseReqDataToNewPatientEntry(req.body);
  try {
    const persistedEntry = addEntry(id, newEntry);
    res.send(persistedEntry);
  } catch (e) {
    if (e instanceof Error) {
      res.send({ error: e.message });
    }
  }
});

export default router;
