import Axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Header, Icon } from "semantic-ui-react";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Gender, Patient } from "../types";

const PatientProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient }, dispatch] = useStateValue();
  useEffect(() => {
    const fetchPatient = async () => {
      const { data: patientFromApi } = await Axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );
      dispatch({ type: "SET_PATIENT", payload: patientFromApi });
    };
    if (!patient || patient.id !== id) {
      fetchPatient();
    }
  }, [dispatch]);

  if (patient) {
    return (
      <div>
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
      </div>
    );
  }
  return null;
};

export default PatientProfile;
