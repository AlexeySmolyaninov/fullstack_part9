import React from "react";
import { domainToASCII } from "url";
import { CoursePart } from "../index";

interface PartProps {
  data: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union memeber: ${JSON.stringify(value)}`
  );
};

const Part: React.FC<PartProps> = ({ data }) => {
  const base = (
    <>
      <p>Name: {data.name}</p>
      <p>Exercise Count: {data.exerciseCount}</p>
    </>
  );
  switch (data.name) {
    case "Fundamentals":
      return (
        <div>
          {base}
          <p>Description: {data.description}</p>
        </div>
      );
    case "Using props to pass data":
      return (
        <div>
          {base}
          <p>Group Project Count: {data.groupProjectCount}</p>
        </div>
      );
    case "Deeper type usage":
      return (
        <div>
          {base}
          <p>Description: {data.description}</p>
          <p>
            Exercise Submission Link:{" "}
            <a href={data.exerciseSubmissionLink}>
              {data.exerciseSubmissionLink}
            </a>
          </p>
        </div>
      );
    case "CI/CD":
      return (
        <div>
          {base}
          <p>Description: {data.description}</p>
          <p>Author: {data.author}</p>
        </div>
      );
    default:
      return assertNever(data);
  }
  return null;
};

export default Part;
