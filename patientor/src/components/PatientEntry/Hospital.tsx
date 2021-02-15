import React from "react";
import { Header, Icon, List } from "semantic-ui-react";
import { useStateValue } from "../../state";
import { HospitalEntry } from "../../types";

const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <>
      <Header>
        {entry.date} <Icon name="hospital" />
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

export default Hospital;
