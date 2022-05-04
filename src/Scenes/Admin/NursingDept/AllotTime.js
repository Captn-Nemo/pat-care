import { SentimentSatisfiedOutlined } from "@material-ui/icons";
import moment from "moment";
import React, { useState } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import Datetime from "react-datetime";
import CustomResponseMessage from "../../../App/components/CustomResponseMessage";
import { BOOKING } from "../../../configs/apiRoutes";
import { useAxios } from "../../../configs/useAxios";
import { RESPONSETYPES } from "../../../constants";
const AllotTime = ({ rowData, onCancel, getApiData }) => {
  const [date, setDate] = useState("");
  const [info, setInfo] = useState(false);

  const onDateChange = (date) => {
    setDate(moment(date).toISOString());
  };

  const {
    response: postData,
    error: postError,
    loading: postLoading,
    apiRqst,
  } = useAxios();

  const submitallotment = () => {
    setInfo(true);
    const body = {
      bookingId: rowData.Id,
      RespondedStatusId: 1,
      allottedFor: date,
    };

    console.log(body);
    apiRqst({
      method: "PUT",
      url: `${BOOKING}/${body.RespondedStatusId}/${body.bookingId}/${body.allottedFor}`,
      data: body,
    })
      .then(() => {
        getApiData();
        setTimeout(() => {
          setInfo(false);
        }, 2000);
      })
      .catch((err) => {});
  };

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
          <Card as={Row}>
            <Card.Header>
              <Card.Title as="h5">Allot Time for Lab</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form.Group as={Row} controlId="formPlaintextEmail1">
                <Form.Label column sm="3">
                  Concern
                </Form.Label>
                <Col sm="9">
                  <Form.Label column sm="9" className="text-info">
                    {rowData.Concerns}
                  </Form.Label>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextEmail1">
                <Form.Label column sm="3">
                  Room No :
                </Form.Label>
                <Col sm="9">
                  <Form.Label column sm="9" className="text-info">
                    {rowData.Room}
                  </Form.Label>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextEmail1">
                <Form.Label column sm="3">
                  Select Date and Time
                </Form.Label>
                <Col sm="9">
                  <Datetime onChange={onDateChange} />
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
                        onClick={() => submitallotment()}
                      >
                        Submit
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        block
                        className="shadow-5"
                        variant="danger"
                        onClick={() => {
                          onCancel(false);
                          setInfo(false);
                        }}
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

export default AllotTime;
