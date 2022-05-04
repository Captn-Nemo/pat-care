import { colourOptions, RESPONSETYPES } from "../../../../constants";
import Select from "react-select";
import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  Modal,
  Table,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import ErrorText from "../../../../App/components/ErrorText";
import RetryButton from "../../../../App/components/RetryButton";
import {
  ROOMS,
  ROOMCATEGORY,
  NURSINGSTATIONS,
  GET_ASSIGNED_ROOMS,
} from "../../../../configs/apiRoutes";
import useFetch from "../../../../configs/useFetch";
import { useAxios } from "../../../../configs/useAxios";
import MaterialTable from "material-table";
import CustomResponseMessage from "../../../../App/components/CustomResponseMessage";
import { getStation, dropDownvalues } from "../../../../configs/helpers";
import axios from "axios";
import moment from "moment";
const AssignRooms = () => {
  const { data: NSData, loading: ns, error: two, getData: fn1 } = useFetch(
    NURSINGSTATIONS
  );
  const {
    data: RoomData,
    loading: roomLoading,
    error: roomError,
    getData: fn2,
  } = useFetch(ROOMS);

  const refresh = () => {
    fn1();
    fn2();
  };

  const dept = JSON.parse(localStorage.getItem("dept"));
  console.log(dept);
  const [NSID, setNSID] = useState(0);
  const [info, setInfo] = useState(true);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const handleCatChange = (item) => {
    setNSID(item.value);
  };
  const handleRoomsChange = (item) => {
    console.log(item);
    setData(item);
  };

  function make_api_call(id) {
    let body = {
      nursingStationId: NSID,
      roomId: id,
      assignedDate: moment().toISOString(),
      assignedBy: dept.value,
    };
    // return body;
    return axios.post(GET_ASSIGNED_ROOMS, body);
  }

  async function processUsers() {
    let result;
    let list = [];
    for (let i = 0; i < data.length; i++) {
      result = await make_api_call(data[i].value);
      list[i] = result;
    }
    console.log(list);
    return list;
  }

  async function doTask() {
    setLoading(true);
    setInfo(true);
    if (data.length == 0 || NSID == 0) {
      console.log("inside");
      setErrMessage("Please select atleast one room and Nursing Station");
      setError(true);
      clearOut();
      return;
    } else {
      setInfo(true);
      let result = await processUsers()
        .then((res) => {
          setError(false);
          setErrMessage("");
          setSuccess(true);
          setData([]);
          clearOut();
        })
        .catch((err) => {
          console.log(err);
          setErrMessage(err);
          setError(true);
          clearOut();
        });
    }
  }

  function clearOut() {
    setLoading(false);
    setTimeout(() => {
      setInfo(false);
      setSuccess(false);
    }, 2000);
  }

  function rendertable() {
    if (ns && roomLoading) {
      return <RetryButton retryFn={refresh} />;
    } else if (NSData?.length > 0 && RoomData?.length > 0) {
      return (
        <>
          {info && success ? (
            <CustomResponseMessage type={RESPONSETYPES.SUCCESS} />
          ) : null}
          {info && error ? (
            <CustomResponseMessage
              type={RESPONSETYPES.ERROR}
              customMessage
              msg={errMessage}
            />
          ) : null}

          <Row className="justify-content-md-center">
            <Col>
              <Card>
                <Card.Header>
                  <Card.Title as="h5">Add Room</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form.Group as={Row} controlId="formPlaintextEmail1">
                    <Form.Label column sm="3">
                      Select Nursing Station
                    </Form.Label>
                    <Col sm="9">
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        options={dropDownvalues(NSData)}
                        onChange={handleCatChange}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formPlaintextEmail1">
                    <Form.Label column sm="3">
                      Select Rooms
                    </Form.Label>
                    <Col sm="9">
                      <Select
                        isMulti
                        className="basic-single"
                        classNamePrefix="select"
                        value={data}
                        options={dropDownvalues(RoomData)}
                        onChange={handleRoomsChange}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formPlaintextEmail1">
                    <Form.Label column sm="3"></Form.Label>
                    <Col sm="9">
                      <Row>
                        <Col>
                          <Button
                            type="submite"
                            onClick={() => doTask()}
                            className="shadow-5"
                            block
                            variant="primary"
                          >
                            {loading ? "wait ..." : "submit"}
                          </Button>
                        </Col>
                        {/* <Col>
                          <Button
                            block
                            className="shadow-5"
                            variant="danger"
                            // onClick={() => clearOutFn()}
                          >
                            Cancel
                          </Button>
                        </Col> */}
                      </Row>
                    </Col>
                  </Form.Group>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      );
    }
  }

  return <>{rendertable()}</>;
};

export default AssignRooms;
