import React from "react";
import { Header, Icon, List, Segment } from "semantic-ui-react";
import { useStateValue } from "../state";
import { Entry } from "../types";

const IconForProperEntryType = (entry: Entry) => {
  switch (entry.type) {
    case "Hospital":
      return <Icon name="hospital" />;
    case "OccupationalHealthcare":
      return <Icon name="stethoscope" />;
    case "HealthCheck":
      return <Icon name="user md" />;
    default:
      return <Icon name="question circle" />;
  }
};

const PatientEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Segment key={entry.id}>
      <Header>
        {entry.date} {IconForProperEntryType(entry)}
      </Header>
      <p>{entry.description}</p>
      <List bulleted>
        {entry.diagnosisCodes &&
          entry.diagnosisCodes.map((code) => {
            const diagnose = diagnoses.find((obj) => obj.code === code);
            if (diagnose) {
              return (
                <List.Item key={code}>
                  {diagnose.code} {diagnose.name}
                </List.Item>
              );
            }
            return <List.Item key={code}>{code} !!UNKNOW CODE</List.Item>;
          })}
      </List>
    </Segment>
  );
};

export default PatientEntry;
