import React from "react";
import { Row, Col, Card, Table } from "react-bootstrap";
const MyOrderstable = () => {
  return (
    <>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Sl No</th>
                    <th>Date and Time</th>
                    <th>Sevirity</th>
                    <th>Concerns</th>
                    <th>Department</th>
                    <th>Status</th>
                    <th>Satisfactory</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default MyOrderstable;
