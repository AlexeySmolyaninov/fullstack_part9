export type Diagnose = {
  code: string;
  name: string;
  latin?: string;
};

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
};

export enum Gender {
  male = "male",
  female = "female",
}

export type NonSensetivePatient = Omit<Patient, "ssn">;

export type NewPatient = Omit<Patient, "id">;
