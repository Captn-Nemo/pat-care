import React from "react";
import { Row, Col, Card, Table } from "react-bootstrap";
import Emoji from "../../App/components/Emoji";

import Aux from "../../hoc/_Aux";
const BTable = () => {
  return (
    <Aux>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Sl No</th>
                    <th>Rooms/ Nursing Station/Department</th>
                    <th>Sevirity</th>
                    <th>Concerns</th>
                    <th>Date and Time</th>
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
                    <td>
                      <Emoji symbol="😄" label="5" />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    <td>
                      {" "}
                      <Emoji symbol="🙂" label="4" />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                    <td>
                      {" "}
                      <Emoji symbol="😐" label="3" />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    <td>
                      <Emoji symbol="🙁" label="2" />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                    <td>
                      <Emoji symbol="😡" label="1" />
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Aux>
  );
};

export default BTable;
