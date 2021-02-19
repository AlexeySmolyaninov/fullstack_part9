import { Field, Form, Formik } from "formik";
import React from "react";
import { Button, Grid } from "semantic-ui-react";
import {
  DiagnosisSelection,
  NumberField,
  TextField,
} from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { EntryType, HealthCheckEntry } from "../types";
import { isDateLightCheck } from "./validators";

export type PatientHealthCheckEntryFormValues = Omit<HealthCheckEntry, "id">;

interface AddHealthCheckEntryProps {
  onSubmit: (values: PatientHealthCheckEntryFormValues) => void;
  onCancel: () => void;
}

const AddHealthCheckEntry: React.FC<AddHealthCheckEntryProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        type: EntryType.HEALTH_CHECK,
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        healthCheckRating: 0,
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
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
        if (
          !values.healthCheckRating ||
          (values.healthCheckRating > 3 && values.healthCheckRating < 0)
        ) {
          errors.healthCheckRating = "Health check rating must be in range 0-3";
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
              label="Health Check Rating"
              placeholder={0}
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
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

export default AddHealthCheckEntry;
