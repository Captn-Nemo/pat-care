import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";

import Aux from "../../hoc/_Aux";
import Card from "../../App/components/MainCard";
import Home from "../Dashboard/Home";
class SamplePage extends Component {
  render() {
    return (
      <Aux>
        <Row className="justify-content-md-center">
          <Col md={4} xl={4}>
            <Card title="Patient Details">
              <p>Patient name: xxxxxxxxx</p>
              <p>UHD : zzzzzzzzz</p>
              <p>IP No : xxxxxxxxxx</p>
            </Card>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md={10} xl={10}>
            <Card title="Our Services">
              <Home />
            </Card>
          </Col>
        </Row>
      </Aux>
    );
  }
}

export default SamplePage;
