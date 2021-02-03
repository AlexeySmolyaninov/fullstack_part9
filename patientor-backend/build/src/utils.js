"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
/* eslint-disable @typescript-eslint/no-explicit-any */
const parseReqDataToNewPatientType = (obj) => {
    return {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        name: parseName(obj.name),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        dateOfBirth: parseDateOfBirth(obj.dateOfBirth),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        ssn: parseSSN(obj.ssn),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        gender: parseGender(obj.gender),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        occupation: parseOccupation(obj.occupation),
    };
};
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error("Type of NAME parameter isn't correct!");
    }
    return name;
};
const parseDateOfBirth = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error("Type of DATEOFBIRTH parameter isn't correct");
    }
    return date;
};
const parseSSN = (ssn) => {
    if (!ssn || !isString(ssn)) {
        throw new Error("Type of SSN parameter insn't correct");
    }
    return ssn;
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error("Type of GENDER parameter isn't correct");
    }
    return gender;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error("Type of Occupation isn't correct");
    }
    return occupation;
};
const isGender = (gender) => {
    return Object.values(types_1.Gender).includes(gender);
};
/* since we have a strange data this method should be excluded */
/*
const isSsnLightValidation = (ssn: string): boolean => {
  return ssn.length === 11 && Number(ssn.slice(0, 6)) >= 0;
};
*/
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const isString = (value) => {
    return typeof value === "string" || value instanceof String;
};
exports.default = parseReqDataToNewPatientType;
