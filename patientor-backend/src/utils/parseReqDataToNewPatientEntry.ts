import diagnoses from "../../data/diagnoses";
import { Diagnose, EntryType, HealthCheckRating, NewEntry } from "../types";
import {
  isDate,
  isEntryType,
  isHealthCheckRating,
  isNumber,
  isString,
} from "./dataTypesCheck";

const ERROR_MESSAGE_FOR_PARAPETER = "has a wrong value";

/* eslint-disable @typescript-eslint/no-explicit-any */
const parseReqDataToNewPatientEntry = (obj: any): NewEntry => {
  const basicEntryParams = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    description: parseDescription(obj.description),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    date: parseDate(obj.date),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    specialist: parseSpecialist(obj.specialist),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    type: parseType(obj.type),
  };

  let baseEntry = null;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (obj.diagnosisCodes && obj.diagnosisCodes.length > 0) {
    baseEntry = {
      ...basicEntryParams,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      diagnosisCodes: parseDiagnosisCodes(obj.diagnosisCodes),
    };
  } else {
    baseEntry = basicEntryParams;
  }

  switch (baseEntry.type) {
    case EntryType.HEALTH_CHECK:
      const healthCheckType = baseEntry.type as EntryType.HEALTH_CHECK;
      return {
        ...baseEntry,
        type: healthCheckType,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        healthCheckRating: parseHealthCheckRating(obj.healthCheckRating),
      };
    case EntryType.HOSPITAL:
      const hospitalType = baseEntry.type as EntryType.HOSPITAL;
      return {
        ...baseEntry,
        type: hospitalType,
        discharge: {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          date: parseDate(obj.discharge.date),
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          criteria: parseCriteria(obj.discharge.criteria),
        },
      };
    case EntryType.OCCUPATIONAL_HEALTHCARE:
      const occupationHealthcareType = baseEntry.type as EntryType.OCCUPATIONAL_HEALTHCARE;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (obj.sickLeave) {
        return {
          ...baseEntry,
          type: occupationHealthcareType,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          employerName: parseEmployerName(obj.employerName),
          sickLeave: {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            startDate: parseDate(obj.sickLeave.startDate),
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            endDate: parseDate(obj.sickLeave.endDate),
          },
        };
      }
      return {
        ...baseEntry,
        type: occupationHealthcareType,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        employerName: parseEmployerName(obj.employerName),
      };
    default:
      throw new Error(`Unknown type of entry `);
  }
};

const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error(`DESCRIPTION ${ERROR_MESSAGE_FOR_PARAPETER}`);
  }

  return description;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`DATE ${ERROR_MESSAGE_FOR_PARAPETER}`);
  }
  return date;
};

const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error(`SPECIALIST ${ERROR_MESSAGE_FOR_PARAPETER}`);
  }
  return specialist;
};

const parseDiagnosisCodes = (diagnosisCodes: any): Array<Diagnose["code"]> => {
  if (!Array.isArray(diagnosisCodes)) {
    throw new Error("DiagnosisCodes should be an array");
  }
  const diagnosisCodesToString = diagnosisCodes.map((code) => {
    if (!isString(code)) {
      throw new Error("Code isn't type of string");
    }
    const diagnosis = diagnoses.filter((diagnose) => diagnose.code === code);
    if (!diagnosis) {
      throw new Error(`uknown diagnosis code ${code}`);
    }
    return code;
  });

  return diagnosisCodesToString;
};

const parseHealthCheckRating = (healthCheckRaiting: any): HealthCheckRating => {
  if (
    !healthCheckRaiting ||
    !isNumber(healthCheckRaiting) ||
    !isHealthCheckRating(healthCheckRaiting)
  ) {
    throw new Error(`HealthCheckRaiting ${ERROR_MESSAGE_FOR_PARAPETER}`);
  }
  return healthCheckRaiting;
};

const parseType = (type: any): EntryType => {
  if (!type || !isString(type) || !isEntryType(type)) {
    throw new Error(`Type ${ERROR_MESSAGE_FOR_PARAPETER}`);
  }
  return type;
};

const parseCriteria = (criteria: any): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error(`CRITERIS ${ERROR_MESSAGE_FOR_PARAPETER}`);
  }
  return criteria;
};

const parseEmployerName = (employerName: any): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error(`EMPLOYERNAME ${ERROR_MESSAGE_FOR_PARAPETER}`);
  }
  return employerName;
};

export default parseReqDataToNewPatientEntry;
