import patients from "../../data/patients";
import { NonSensetivePatient } from "../types";

const getPatients = (): NonSensetivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export { getPatients };
