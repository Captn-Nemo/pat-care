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
import { ROOMS_TABLE } from "../../../../configs/tableConfigs";
import TableGenerator from "../../../../App/components/TableGenerator";
import CustomResponseMessage from "../../../../App/components/CustomResponseMessage";
import { getStation, dropDownvalues } from "../../../../configs/helpers";
import axios from "axios";

const AssignRooms = () => {
  const { data: NSData, loading: ns, error: two, getData: fn1 } = useFetch(
    NURSINGSTATIONS
  );
  const {
    data: RoomData,
    loading: roomLoading,
    error: roomError,
    getData: fn2,
  } = useFetch(NURSINGSTATIONS);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [ID, setId] = useState("");
  const [info, setInfo] = useState(true);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const getApiData = () => {
    setLoading("loading...");
    setData(null);
    setError(null);
    axios
      .get(ROOMS)
      .then((res) => {
        setLoading(false);
        setData(res.data);
      })
      .catch((err) => {
        setLoading(false);
        setError("An error occurred. Awkward..");
      });
  };
  useEffect(() => {
    getApiData();
  }, []);

  const refresh = () => {
    fn1();
    fn2();
    getApiData();
  };

  // const getStation = (data, id) => {
  //   let val = data.filter((item) => item.Id == id)[0];
  //   return { label: val.Name, value: val.Id };
  // };

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = (formdata) => {
    console.log(formdata);
    AddNewRoom(formdata);
  };

  //Getting Dept Data from Backend
  const {
    response: postData,
    error: postError,
    loading: postLoading,
    apiRqst,
  } = useAxios();

  // Edit Modal Configuration Function
  const changeToEditMode = (rowData) => {
    console.log(rowData);
    setEditMode(true);
    setId(rowData.Id);
    setValue("nursingStationId", rowData.CategoryId);
    setOpen(true);
  };

  const clearOutFn = () => {
    setInfo(false);
    setEditMode(false);
    setOpen(false);
    setValue("nursingStationId", "");
    clearErrors();
  };

  const handleCatChange = (item) => {
    setValue("nursingStationId", item.value);
  };
  const handleRoomsChange = (item) => {
    console.log(item);
  };

  const AddNewRoom = (apiData) => {
    console.log(apiData);
    setInfo(true);
    if (editMode) {
      const body = { ...apiData, Id: ID };
      console.log(body);
      apiRqst({
        method: "PUT",
        url: GET_ASSIGNED_ROOMS,
        data: body,
      }).then(() => {
        // const dataUpdate = data.splice();
        // objIndex = dataUpdate.findIndex((obj) => obj.Id === ID);
        // dataUpdate[objIndex] = body;
        // setData([...dataUpdate]);
        getApiData();
      });
    } else {
      const body = { ...apiData, Id: 0 };
      console.log(body);
      apiRqst({
        method: "POST",
        url: GET_ASSIGNED_ROOMS,
        data: body,
      }).then(() => {
        getApiData();
        //  const dataUpdate = data.splice();
        //  dataUpdate.push(body);
        //  setData([...dataUpdate]);
      });
    }
  };

  function rendertable() {
    if (loading) {
      return <RetryButton retryFn={getApiData} />;
    } else if (NSData?.length > 0 && RoomData?.length > 0) {
      return (
        <>
          {info && postData ? (
            <CustomResponseMessage
              type={RESPONSETYPES.SUCCESS}
              msg={postData}
            />
          ) : null}
          {info && postError ? (
            <CustomResponseMessage type={RESPONSETYPES.ERROR} />
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
                      <Controller
                        name="nursingStationId"
                        control={control}
                        render={({ onChange, value, name, ref }) => (
                          <Select
                            className="basic-single"
                            classNamePrefix="select"
                            inputRef={ref}
                            defaultValue={
                              editMode &&
                              getStation(NSData, getValues("nursingStationId"))
                            }
                            options={dropDownvalues(NSData)}
                            onChange={handleCatChange}
                          />
                        )}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formPlaintextEmail1">
                    <Form.Label column sm="3">
                      Select Rooms
                    </Form.Label>
                    <Col sm="9">
                      <Controller
                        name="rooms"
                        control={control}
                        render={({ onChange, value, name }) => (
                          <Select
                            isMulti
                            className="basic-single"
                            classNamePrefix="select"
                            // defaultValue={
                            //   editMode &&
                            //   getStation(NSData, getValues("roo"))
                            // }
                            options={dropDownvalues(RoomData)}
                            onChange={handleRoomsChange}
                          />
                        )}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formPlaintextEmail1">
                    <Form.Label column sm="3">
                      Section
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control
                        type="text"
                        {...register("section")}
                        placeholder="Name"
                        className="mb-3"
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
                            onClick={handleSubmit(onSubmit)}
                            className="shadow-5"
                            block
                            variant="primary"
                          >
                            {postLoading ? "wait ..." : "submit"}
                          </Button>
                        </Col>
                        <Col>
                          <Button
                            block
                            className="shadow-5"
                            variant="danger"
                            onClick={() => clearOutFn()}
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

          {rendertable()}
        </>
      );
    }
  }

  return <>{rendertable()}</>;
};

export default AssignRooms;
