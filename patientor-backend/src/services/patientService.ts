import { v4 as uuid } from "uuid";
import patients from "../../data/patients";
import { NewPatient, PublicPatient, Patient, NewEntry, Entry } from "../types";

const getPatients = (): PublicPatient[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const addPatient = (patient: NewPatient): Patient => {
  const id: string = uuid();
  const newPatient = { id, ...patient };
  patients.push(newPatient);
  return newPatient;
};

const getPatient = (id: string): Patient => {
  const patient = patients.find((obj) => obj.id === id);
  if (!patient) {
    throw new Error(`Can't find patient by id ${id}`);
  }
  return patient;
};

const addEntry = (patientId: string, entry: NewEntry): Entry => {
  const id: string = uuid();
  const newEntry = { id, ...entry };
  const patient = patients.find((patient) => patient.id === patientId);
  if (!patient) {
    throw new Error(`Patient with id ${id} not found`);
  }
  patient.entries.push(newEntry);
  return newEntry;
};

export { getPatients, addPatient, getPatient, addEntry };
