import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Divider, Header, Icon, Segment } from "semantic-ui-react";
import AddPatientEntryModal from "../AddPatientEntryModal";
import PatientEntry from "../components/PatientEntry/";
import { apiBaseUrl } from "../constants";
import { setDiagnoses, setPatient, useStateValue } from "../state";
import { Diagnose, Gender, Patient } from "../types";

const PatientProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient, diagnoses }, dispatch] = useStateValue();
  const [openAddEntryModel, setOpenAddEntryModel] = React.useState<boolean>(
    false
  );
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

  const onAddEntry = () => {
    setOpenAddEntryModel(true);
  };

  const onCloseModal = () => {
    setOpenAddEntryModel(false);
  };

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
          <Button color="green" onClick={onAddEntry}>
            Add Entry
          </Button>
          {patient.entries.length === 0 && <Header>No entries</Header>}
          {patient.entries.map((entry) => (
            <PatientEntry key={entry.id} entry={entry} />
          ))}
        </Segment>

        <AddPatientEntryModal
          openModal={openAddEntryModel}
          onCloseModal={onCloseModal}
        />
      </div>
    );
  }
  return null;
};

export default PatientProfile;
