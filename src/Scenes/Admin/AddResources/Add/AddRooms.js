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
import { ROOMS, ROOMCATEGORY } from "../../../../configs/apiRoutes";
import useFetch from "../../../../configs/useFetch";
import { useAxios } from "../../../../configs/useAxios";
import MaterialTable from "material-table";
import { ROOMS_TABLE } from "../../../../configs/tableConfigs";
import TableGenerator from "../../../../App/components/TableGenerator";
import CustomResponseMessage from "../../../../App/components/CustomResponseMessage";
import { getStation, dropDownvalues } from "../../../../configs/helpers";
import axios from "axios";

const AddRooms = () => {
  const {
    data: roomCatData,
    loading: dept,
    error: one,
    getData: fn1,
  } = useFetch(ROOMCATEGORY);

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
    setValue("code", rowData.Code);
    setValue("name", rowData.Name);
    setValue("categoryId", rowData.CategoryId);
    setValue("floor", rowData.Floor);
    setValue("section", rowData.Section);
    setValue("notes", rowData.Notes);
    setOpen(true);
  };

  const clearOutFn = () => {
    setInfo(false);
    setEditMode(false);
    setOpen(false);
    setValue("code", "");
    setValue("name", "");
    setValue("categoryId", "");
    setValue("floor", "");
    setValue("section", "");
    setValue("notes", "");
    clearErrors();
  };

  const handleCatChange = (item) => {
    setValue("categoryId", item.value);
  };

  const AddNewRoom = (apiData) => {
    console.log(apiData);
    setInfo(true);
    if (editMode) {
      const body = { ...apiData, Id: ID };
      console.log(body);
      apiRqst({
        method: "PUT",
        url: ROOMS,
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
        url: ROOMS,
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
    if (error) {
      return <RetryButton retryFn={getApiData} />;
    }
    if (data?.length == 0) {
      return <h4 className="text-success">No Data Found </h4>;
    } else if (data?.length > 0 && roomCatData?.length > 0) {
      const converteddata = data.map((item, i) => {
        let catvalue = getStation(roomCatData, item.CategoryId);
        return {
          ...item,
          cat: catvalue.label,
        };
      });
      return (
        <Row>
          <Col>
            <TableGenerator
              columns={ROOMS_TABLE}
              data={converteddata}
              url={ROOMS}
              onDeleteClick={() => alert("Delete")}
              onEditClick={changeToEditMode}
              onRefresh={refresh}
              title="Available Employees"
            />
          </Col>
        </Row>
      );
    } else {
      return (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="info" />;
        </div>
      );
    }
  }

  return (
    <>
      <Modal centered show={open} onHide={() => clearOutFn()} size="lg">
        {info && postData ? (
          <CustomResponseMessage type={RESPONSETYPES.SUCCESS} msg={postData} />
        ) : null}
        {info && postError ? (
          <CustomResponseMessage type={RESPONSETYPES.ERROR} />
        ) : null}

        <Modal.Body>
          <Row className="justify-content-md-center">
            <Col>
              <Card>
                <Card.Header>
                  <Card.Title as="h5">Add Room</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form.Group as={Row} controlId="formPlaintextEmail1">
                    <Form.Label column sm="3">
                      Code
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control
                        {...register("code")}
                        type="text"
                        placeholder="Code"
                        className="mb-3"
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formPlaintextEmail1">
                    <Form.Label column sm="3">
                      Name
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control
                        type="text"
                        {...register("name")}
                        placeholder="Name"
                        className="mb-3"
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formPlaintextEmail1">
                    <Form.Label column sm="3">
                      Category
                    </Form.Label>
                    <Col sm="9">
                      <Controller
                        name="categoryId"
                        control={control}
                        render={({ onChange, value, name, ref }) => (
                          <Select
                            className="basic-single"
                            classNamePrefix="select"
                            inputRef={ref}
                            defaultValue={
                              editMode &&
                              getStation(roomCatData, getValues("categoryId"))
                            }
                            options={dropDownvalues(roomCatData)}
                            onChange={handleCatChange}
                          />
                        )}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formPlaintextEmail1">
                    <Form.Label column sm="3">
                      Floor
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control
                        type="text"
                        {...register("floor")}
                        placeholder="Name"
                        className="mb-3"
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
                    <Form.Label column sm="3">
                      Notes
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control
                        {...register("notes")}
                        as="textarea"
                        rows="4"
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
        </Modal.Body>
      </Modal>
      <Row className="mb-3">
        <Col>
          <Button onClick={() => setOpen(true)}>
            <i className="feather icon-plus" />
            Add Room
          </Button>
        </Col>
      </Row>
      {rendertable()}
    </>
  );
};

export default AddRooms;
