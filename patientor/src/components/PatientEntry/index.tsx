import React from "react";
import { Entry } from "../../types";
import Hospital from "./Hospital";
import OccupationalHealthcare from "./OccupationalHealthcare";
import HealthCheck from "./HealthCheck";
import ErrorEntry from "./ErrorEntry";

const setEntry = (entry: Entry) => {
  switch (entry.type) {
    case "Hospital":
      return <Hospital entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={entry} />;
    case "HealthCheck":
      return <HealthCheck entry={entry} />;
    default:
      return <ErrorEntry entry={entry} />;
  }
};

const PatientEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  const entryJSX = setEntry(entry);
  return entryJSX;
};

export default PatientEntry;
