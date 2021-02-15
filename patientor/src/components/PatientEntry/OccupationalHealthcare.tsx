import React from "react";
import { Header, Icon, List } from "semantic-ui-react";
import { useStateValue } from "../../state";
import { OccupationalHealhcareEntry } from "../../types";

const OccupationalHealthcare: React.FC<{
  entry: OccupationalHealhcareEntry;
}> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <>
      <Header>
        {entry.date} <Icon name="stethoscope" />
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
    </>
  );
};

export default OccupationalHealthcare;
