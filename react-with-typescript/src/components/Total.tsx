import React from "react";
import { Exercise } from "../types";

interface TotalProps {
  courseParts: Array<Exercise>;
}

const Total: React.FC<TotalProps> = ({ courseParts }) => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  );
};

export default Total;
