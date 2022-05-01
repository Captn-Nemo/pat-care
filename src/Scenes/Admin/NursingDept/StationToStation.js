import React from "react";

import { Row, Col, Card, Form, Button } from "react-bootstrap";

import Select from "react-select";
import { colourOptions } from "../../../constants";
const StationToStation = () => {
  return (
    <>
      <Row className="justify-content-md-center">
        <Col md={8} xl={8}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">
                Nursing Stations to Other Nursing Stations
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Form.Group as={Row} controlId="formPlaintextEmail1">
                <Form.Label column sm="3">
                  From
                </Form.Label>
                <Col sm="9">
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    defaultValue={colourOptions[0]}
                    name="color"
                    options={colourOptions}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextEmail1">
                <Form.Label column sm="3">
                  From
                </Form.Label>
                <Col sm="9">
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    defaultValue={colourOptions[0]}
                    name="color"
                    options={colourOptions}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextEmail1">
                <Form.Label column sm="3">
                  Room
                </Form.Label>
                <Col sm="9">
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    defaultValue={colourOptions[0]}
                    name="color"
                    options={colourOptions}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextEmail1">
                <Form.Label column sm="3">
                  Concerns
                </Form.Label>
                <Col sm="9">
                  <Form.Control as="textarea" rows="4" />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextEmail1">
                <Form.Label column sm="3">
                  Priority
                </Form.Label>
                <Col sm="9">
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    defaultValue={colourOptions[0]}
                    name="color"
                    options={colourOptions}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextEmail1">
                <Form.Label column sm="3"></Form.Label>
                <Col sm="9">
                  <Row>
                    <Col>
                      <Button className="shadow-5" block variant="primary">
                        Submit
                      </Button>
                    </Col>
                    <Col>
                      <Button block className="shadow-5" variant="danger">
                        Cancel
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default StationToStation;
