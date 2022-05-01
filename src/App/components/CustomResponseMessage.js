import React from "react";
import { Alert } from "react-bootstrap";
import { RESPONSETYPES } from "../../constants";

const CustomResponseMessage = ({ type, msg = "", customMessage = false }) => {
  if (customMessage) {
    return (
      <Alert variant="danger">
        <Alert.Heading as="h4">
          {msg === "" ? "Please fill all the fields" : msg}
        </Alert.Heading>
        {/* <p>Request Failed Please Try Again</p> */}
      </Alert>
    );
  } else if (type === RESPONSETYPES.SUCCESS)
    return (
      <Alert variant="success">
        <Alert.Heading as="h4">Success!</Alert.Heading>
        <p>{msg}</p>
      </Alert>
    );
  else if (type === RESPONSETYPES.ERROR) {
    return (
      <Alert variant="danger">
        <Alert.Heading as="h4">Failed!</Alert.Heading>
        <p>Request Failed Please Try Again</p>
      </Alert>
    );
  }
};
export default CustomResponseMessage;
