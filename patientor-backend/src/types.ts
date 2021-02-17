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
  entries: Entry[];
};

export enum Gender {
  Male = "male",
  Female = "female",
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export enum EntryType {
  HEALTH_CHECK = "HealthCheck",
  HOSPITAL = "Hospital",
  OCCUPATIONAL_HEALTHCARE = "OccupationalHealthcare",
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose["code"]>;
}

interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HEALTH_CHECK;
  healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
  type: EntryType.HOSPITAL;
  discharge: {
    date: string;
    criteria: string;
  };
}

interface OccupationalHealhcareEntry extends BaseEntry {
  type: EntryType.OCCUPATIONAL_HEALTHCARE;
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export type Entry =
  | HealthCheckEntry
  | HospitalEntry
  | OccupationalHealhcareEntry;

export type PublicPatient = Omit<Patient, "ssn" | "entries">;

export type NewPatient = Omit<Patient, "id">;

export type NewEntry =
  | Omit<HealthCheckEntry, "id">
  | Omit<HospitalEntry, "id">
  | Omit<OccupationalHealhcareEntry, "id">;
