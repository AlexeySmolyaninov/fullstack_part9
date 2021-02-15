import React from "react";
import { Header } from "semantic-ui-react";
import { Entry } from "../../types";

const ErrorEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  return (
    <div>
      <Header>Can not find entry of type ${entry.type}</Header>
    </div>
  );
};

export default ErrorEntry;
