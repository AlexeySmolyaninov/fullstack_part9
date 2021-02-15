import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Divider, Header, Icon, Segment } from "semantic-ui-react";
import PatientEntry from "../components/PatientEntry/";
import { apiBaseUrl } from "../constants";
import { setDiagnoses, setPatient, useStateValue } from "../state";
import { Diagnose, Gender, Patient } from "../types";

const PatientProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient, diagnoses }, dispatch] = useStateValue();
  useEffect(() => {
    const fetchPatient = async () => {
      const { data: patientFromApi } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );
      dispatch(setPatient(patientFromApi));
    };

    const fetchDiagnoses = async () => {
      const { data: diagnosesFromApi } = await axios.get<Array<Diagnose>>(
        `${apiBaseUrl}/diagnoses`
      );
      dispatch(setDiagnoses(diagnosesFromApi));
    };

    if (!patient || patient.id !== id) {
      fetchPatient();
    }

    if (diagnoses.length === 0) {
      fetchDiagnoses();
    }
  }, [dispatch]);

  console.log("diagnoses _> ", diagnoses);
  if (patient) {
    return (
      <div>
        <Segment>
          <Header as="h1">
            {patient.name}{" "}
            {patient.gender === Gender.Male ? (
              <Icon name="mars" />
            ) : patient.gender === Gender.Female ? (
              <Icon name="venus" />
            ) : (
              <Icon name="genderless" />
            )}
          </Header>
          <p>ssn: {patient.ssn}</p>
          <p>occupation {patient.occupation}</p>

          <Divider horizontal>Entries</Divider>
          {patient.entries.length === 0 && <Header>No entries</Header>}
          {patient.entries.map((entry) => (
            <PatientEntry key={entry.id} entry={entry} />
          ))}
        </Segment>
      </div>
    );
  }
  return null;
};

export default PatientProfile;
