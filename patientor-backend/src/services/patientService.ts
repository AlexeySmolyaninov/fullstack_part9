import { v4 as uuid } from "uuid";
import patients from "../../data/patients";
import { NewPatient, NonSensetivePatient, Patient } from "../types";

const getPatients = (): NonSensetivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const id: string = uuid();
  const newPatient = { id, ...patient };
  patients.push(newPatient);
  return newPatient;
};

export { getPatients, addPatient };
