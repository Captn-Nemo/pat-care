import React, { useState } from "react";
import SamplePage from "../Other/SamplePage";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import Select from "react-select";
import { useAxios } from "../../configs/useAxios";
import { BOOKING } from "../../configs/apiRoutes";
import CustomResponseMessage from "../../App/components/CustomResponseMessage";
import { RESPONSETYPES } from "../../constants";
import { dropDownvalues } from "../../configs/helpers";

const severityEmojis = [
  {
    id: 1,
    value: 2,
    label: "Risky",
    symbol: "⚠️",
  },
  {
    id: 2,
    value: 1,
    label: "High",
    symbol: "😟",
  },
  {
    id: 3,
    value: 0,
    label: "Normal",
    symbol: "😦",
  },
];

const Booking = ({ onCancel, category, data }) => {
  console.log(category);
  const categorySelected = data.findIndex(
    (service) => service.Id === category.Id
  );

  const [emoji, setSelectedEmoji] = useState(0);
  const [severity, setSeverity] = useState(0);
  const [dept, setDept] = useState(dropDownvalues(data)[categorySelected]);
  const [NS, setNS] = useState("");
  const [concerns, setConcers] = useState("");
  const [info, setInfo] = useState(true);

  const {
    response: postData,
    error: postError,
    loading: postLoading,
    apiRqst,
  } = useAxios();

  function getEmojiStyle(id) {
    if (emoji === id) return "emoji-selected";
    else return "emoji";
  }

  const AddBooking = () => {
    setInfo(true);
    let user = JSON.parse(localStorage.getItem("user"));
    let byStanderId = JSON.parse(localStorage.getItem("byStanderId"));

    const body = {
      bystanderId: byStanderId,
      patientId: user.Id,
      statusId: 0,
      roomId: user.RoomId,
      severity: severity,
      departmentId: dept.value,
      concerns: concerns,
      voice: null,
      statusId: 0,
      respondedStatusId: 0,
    };
    console.log(body);
    apiRqst({
      method: "POST",
      url: BOOKING,
      data: body,
    })
      .then((res) => {
        console.log(res);
        console.log("Successfully added");
      })
      .catch(() => {
        console.log("Failed to add");
      });
  };

  return (
    <>
      <Row className="justify-content-md-center">
        <Col>
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
              <Card.Title as="h5">Booking</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form.Group as={Row} controlId="formPlaintextEmail1">
                <Form.Label column sm="3">
                  Departments
                </Form.Label>
                <Col sm="9">
                  {/* <Select
                    className="basic-single"
                    classNamePrefix="select"
                    defaultValue={dropDownvalues(data)[categorySelected]}
                    name="color"
                    options={dropDownvalues(data)}
                    onChange={(newVAL) => setDept(newVAL.label)}
                  /> */}

                  <Form.Control
                    type="text"
                    disabled={true}
                    value={category.Name}
                    className="mb-3"
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formPlaintextEmail1">
                <Form.Label column sm="3">
                  Concerns
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    as="textarea"
                    rows="4"
                    onChange={(e) => setConcers(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextEmail1">
                <Form.Label column sm="3">
                  Severity
                </Form.Label>
                <Col sm="9">
                  <Row className="mx-1">
                    {severityEmojis.map((symbol) => {
                      return (
                        <Col
                          key={symbol.id}
                          className={`d-flex flex-column align-items-center justify-content-center ${getEmojiStyle(
                            symbol.id
                          )}`}
                          onClick={() => {
                            setSelectedEmoji(symbol.id);
                            setSeverity(symbol.value);
                          }}
                        >
                          <span style={{ fontSize: 45 }}>{symbol.symbol}</span>
                          <span>{symbol.label} </span>
                        </Col>
                      );
                    })}
                  </Row>
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
                        onClick={() => AddBooking()}
                        disabled={postLoading}
                      >
                        {postLoading ? "wait" : " Submit"}
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        block
                        className="shadow-5"
                        variant="danger"
                        onClick={() => {
                          onCancel();
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

export default Booking;
