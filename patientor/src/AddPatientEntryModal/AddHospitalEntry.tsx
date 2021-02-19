import { Field, Form, Formik } from "formik";
import React from "react";
import { Button, Grid, Header } from "semantic-ui-react";
import { DiagnosisSelection, TextField } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { EntryType, HospitalEntry } from "../types";
import { isDateLightCheck } from "./validators";

export type PatientHospitalEntryFormValues = Omit<HospitalEntry, "id">;

interface AddHospitalEntryProps {
  onSubmit: (values: PatientHospitalEntryFormValues) => void;
  onCancel: () => void;
}

const AddHospitalEntry: React.FC<AddHospitalEntryProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        type: EntryType.HOSPITAL,
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        discharge: {
          date: "",
          criteria: "",
        },
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: {
          [field: string]: string | { date: string; criteria: string };
        } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!isDateLightCheck(values.date)) {
          errors.date = "date isn't type of YYYY-MM-DD";
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        errors.discharge = {
          date: "",
          criteria: "",
        };
        if (!values.discharge.date) {
          errors.discharge = { ...errors.discharge, date: requiredError };
        }
        if (!isDateLightCheck(values.discharge.date)) {
          errors.discharge = {
            ...errors.discharge,
            date: "date isn't type of YYYY-MM-DD",
          };
        }
        if (!values.discharge.criteria) {
          errors.discharge = { ...errors.discharge, criteria: requiredError };
        }
        if (!errors.discharge.date && !errors.discharge.criteria) {
          delete errors.discharge;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              diagnoses={diagnoses}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
            <Header>Discharge</Header>
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Criteria"
              placeholder="criteria"
              name="discharge.criteria"
              component={TextField}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddHospitalEntry;
