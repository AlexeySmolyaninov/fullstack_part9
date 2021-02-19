import axios from "axios";
import React from "react";
import { Button, Grid, Modal, Segment } from "semantic-ui-react";
import { apiBaseUrl } from "../constants";
import { addPatientEntry, useStateValue } from "../state";
import { Entry, EntryType } from "../types";
import AddHealthCheckEntry, {
  PatientHealthCheckEntryFormValues,
} from "./AddHealthCheckEntry";
import { PatientHospitalEntryFormValues } from "./AddHospitalEntry";
import AddHospitalEntry from "./AddHospitalEntry";
import AddOccupationalHealhcareEntry, {
  PatientOccupationalHealhcareEntryFormValues,
} from "./AddOccupationalHealhcareEntry";

interface AddPatientEntryModalProps {
  openModal: boolean;
  onCloseModal: () => void;
}

const AddPatientEntryModal: React.FC<AddPatientEntryModalProps> = ({
  openModal,
  onCloseModal,
}) => {
  const [entryType, setEntryType] = React.useState<EntryType | null>(null);
  const [{ patient }, dispatch] = useStateValue();
  const [error, setError] = React.useState<string>("");

  const onClose = () => {
    setEntryType(null);
    onCloseModal();
  };

  const submitEntryForPatient = async (
    values:
      | PatientHealthCheckEntryFormValues
      | PatientHospitalEntryFormValues
      | PatientOccupationalHealhcareEntryFormValues
  ) => {
    try {
      const { data: newPatientEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patient?.id}/entries`,
        values
      );
      if (patient?.id) {
        dispatch(addPatientEntry(patient.id, newPatientEntry));
      }
      onCloseModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  return (
    <Modal open={openModal} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Adding Entry for {patient?.name}</Modal.Header>
      <Modal.Content>
        <Grid centered>
          <Grid.Column width={4}>
            <Button
              icon="user md"
              color={entryType === EntryType.HEALTH_CHECK ? "blue" : "grey"}
              content="Health Check"
              onClick={() => setEntryType(EntryType.HEALTH_CHECK)}
            />
          </Grid.Column>
          <Grid.Column width={4}>
            <Button
              icon="hospital"
              color={entryType === EntryType.HOSPITAL ? "blue" : "grey"}
              content="Hospital"
              onClick={() => setEntryType(EntryType.HOSPITAL)}
            />
          </Grid.Column>
          <Grid.Column width={4}>
            <Button
              icon="stethoscope"
              color={
                entryType === EntryType.OCCUPATIONAL_HEALTHCARE
                  ? "blue"
                  : "grey"
              }
              content="Occupational Healthcare"
              onClick={() => setEntryType(EntryType.OCCUPATIONAL_HEALTHCARE)}
            />
          </Grid.Column>
        </Grid>

        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        {entryType === EntryType.HEALTH_CHECK && (
          <AddHealthCheckEntry
            onSubmit={submitEntryForPatient}
            onCancel={onClose}
          />
        )}
        {entryType === EntryType.HOSPITAL && (
          <AddHospitalEntry
            onSubmit={submitEntryForPatient}
            onCancel={onClose}
          />
        )}
        {entryType === EntryType.OCCUPATIONAL_HEALTHCARE && (
          <AddOccupationalHealhcareEntry
            onSubmit={submitEntryForPatient}
            onCancel={onClose}
          />
        )}
      </Modal.Content>
    </Modal>
  );
};

export default AddPatientEntryModal;
