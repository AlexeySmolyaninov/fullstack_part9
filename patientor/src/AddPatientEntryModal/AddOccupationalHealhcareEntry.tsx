import { Field, Form, Formik } from "formik";
import React from "react";
import { Button, Grid, Header } from "semantic-ui-react";
import { DiagnosisSelection, TextField } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { EntryType, OccupationalHealhcareEntry } from "../types";
import { isDateLightCheck } from "./validators";

export type PatientOccupationalHealhcareEntryFormValues = Omit<
  OccupationalHealhcareEntry,
  "id"
>;

interface AddOccupationalHealhcareEntryProps {
  onSubmit: (values: PatientOccupationalHealhcareEntryFormValues) => void;
  onCancel: () => void;
}

const AddOccupationalHealhcareEntry: React.FC<AddOccupationalHealhcareEntryProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        type: EntryType.OCCUPATIONAL_HEALTHCARE,
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: "",
        },
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: {
          [field: string]: string | { startDate: string; endDate: string };
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

        if (!values.employerName) {
          errors.employerName = requiredError;
        }

        errors.sickLeave = {
          startDate: "",
          endDate: "",
        };
        if (values.sickLeave) {
          if (!values.sickLeave.startDate) {
            errors.sickLeave = {
              ...errors.sickLeave,
              startDate: requiredError,
            };
          }
          if (!isDateLightCheck(values.sickLeave.startDate)) {
            errors.discharge = {
              ...errors.sickLeave,
              startDate: "date isn't type of YYYY-MM-DD",
            };
          }
          if (!values.sickLeave.endDate) {
            errors.sickLeave = {
              ...errors.sickLeave,
              endDate: requiredError,
            };
          }
          if (!isDateLightCheck(values.sickLeave.endDate)) {
            errors.discharge = {
              ...errors.sickLeave,
              endDate: "date isn't type of YYYY-MM-DD",
            };
          }
        }

        if (!errors.sickLeave.startDate && !errors.sickLeave.endDate) {
          delete errors.sickLeave;
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
            <Field
              label="Employer Name"
              placeholder="employer name"
              name="employerName"
              component={TextField}
            />
            <Header>Sick Leave</Header>
            <Field
              label="Start date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="End date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
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

export default AddOccupationalHealhcareEntry;
