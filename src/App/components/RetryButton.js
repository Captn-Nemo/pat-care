import React from "react";
import { Row, Col, Button } from "react-bootstrap";

const RetryButton = ({ retryFn }) => {
  return (
    <Row>
      <Col className="d-flex justify-content-center">
        <div>
          <p>Failed To Load Data Please try Again</p>
          <Button
            className="mx-auto"
            onClick={() => retryFn((oldData) => !oldData)}
          >
            Retry
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default RetryButton;
