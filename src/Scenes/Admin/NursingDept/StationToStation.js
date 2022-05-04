import React, { useEffect } from "react";

import { Row, Col, Card, Form, Button } from "react-bootstrap";

import Select from "react-select";
import { FORWARD_NS, NURSINGSTATIONS } from "../../../configs/apiRoutes";
import { dropDownvalues } from "../../../configs/helpers";
import { useAxios } from "../../../configs/useAxios";
import moment from "moment";
import CustomResponseMessage from "../../../App/components/CustomResponseMessage";
import { RESPONSETYPES } from "../../../constants";
import axios from "axios";

const StationToStation = ({ stationId, booking, getApiData, onCancel }) => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [info, setInfo] = React.useState(false);
  const [reason, setReason] = React.useState("");
  const [toStationId, setToStationId] = React.useState(null);

  const getNSData = () => {
    setLoading(true);
    axios
      .get(NURSINGSTATIONS)
      .then((res) => {
        setData(dropDownvalues(res.data));
        setLoading(null);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const onChangeNS = (item) => {
    setToStationId(item.value);
  };

  const {
    response: postData,
    error: postError,
    loading: postLoading,
    apiRqst,
  } = useAxios();

  const submitForward = () => {
    setInfo(true);
    const body = {
      bookingId: booking.Id,
      fromNursingStation: stationId.value,
      toNursingStation: toStationId,
      reason: reason,
      forwardedTime: moment().toISOString(),
    };
    console.log(body);

    apiRqst({
      method: "POST",
      url: FORWARD_NS,
      data: body,
    }).then(() => {
      getApiData();
      setTimeout(() => {
        setInfo(false);
      }, 2000);
    });
  };

  useEffect(() => {
    getNSData();
  }, []);

  return (
    <>
      <Row className="justify-content-md-center">
        <Col md={8} xl={8}>
          {info && postData ? (
            <CustomResponseMessage
              type={RESPONSETYPES.SUCCESS}
              msg={postData}
            />
          ) : null}
          {info && postError ? (
            <CustomResponseMessage type={RESPONSETYPES.ERROR} />
          ) : null}
          <Card>
            <Card.Header>
              <Card.Title as="h5">Forward to Nursing Stations</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form.Group as={Row} controlId="formPlaintextEmail1">
                <Form.Label column sm="3">
                  Current Station
                </Form.Label>
                <Col sm="2" md="9">
                  <Form.Control
                    disabled={true}
                    type="text"
                    placeholder="RoomID"
                    value={stationId.label}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextEmail1">
                <Form.Label column sm="3">
                  To Station
                </Form.Label>
                <Col sm="9">
                  {data.length > 0 && (
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      name="color"
                      options={data}
                      onChange={onChangeNS}
                    />
                  )}
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextEmail1">
                <Form.Label column sm="3">
                  Reason
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    as="textarea"
                    rows="4"
                    onChange={(e) => setReason(e.target.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formPlaintextEmail1">
                <Form.Label column sm="3"></Form.Label>
                <Col sm="9">
                  <Row>
                    <Col>
                      <Button
                        className="shadow-5"
                        block
                        variant="primary"
                        onClick={() => submitForward()}
                      >
                        Submit
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        block
                        className="shadow-5"
                        variant="danger"
                        onClick={() => onCancel()}
                      >
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
