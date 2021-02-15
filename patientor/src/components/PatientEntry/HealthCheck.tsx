import React from "react";
import { Header, Icon, List } from "semantic-ui-react";
import { useStateValue } from "../../state";
import { HealthCheckEntry, HealthCheckRating } from "../../types";

const Heart: React.FC<{ healthCheckRating: HealthCheckRating }> = ({
  healthCheckRating,
}) => {
  switch (healthCheckRating) {
    case 0:
      return <Icon color="green" name="heart" />;
    case 1:
      return <Icon color="yellow" name="heart" />;
    case 2:
      return <Icon color="orange" name="heart" />;
    case 3:
      return <Icon color="red" name="heart" />;
    default:
      return null;
  }
};

const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <>
      <Header>
        {entry.date} <Icon name="user md" />
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
      {entry.healthCheckRating !== undefined && (
        <Heart healthCheckRating={entry.healthCheckRating} />
      )}
    </>
  );
};

export default HealthCheck;
