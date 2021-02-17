import { EntryType, Gender, HealthCheckRating } from "../types";

const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const isHealthCheckRating = (
  healthCheckRating: number
): healthCheckRating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(healthCheckRating);
};

const isEntryType = (type: any): type is EntryType => {
  return Object.values(EntryType).includes(type);
};

/* since we have a strange data this method should be excluded */
/*
const isSsnLightValidation = (ssn: string): boolean => {
  return ssn.length === 11 && Number(ssn.slice(0, 6)) >= 0;
};
*/

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isString = (value: any): value is string => {
  return typeof value === "string" || value instanceof String;
};

const isNumber = (value: any): value is number => {
  return typeof value === "number";
};

export {
  isGender,
  isDate,
  isString,
  isNumber,
  isHealthCheckRating,
  isEntryType,
};
