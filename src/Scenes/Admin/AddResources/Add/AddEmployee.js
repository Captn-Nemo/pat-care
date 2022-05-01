import React, { useState, useEffect } from "react";
import { Row, Col, Card, Form, Button, Modal, Spinner } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import RetryButton from "../../../../App/components/RetryButton";
import {
  EMPLOYEE,
  NURSINGSTATIONS,
  DEPARTMENTS,
  DESIGNATION,
} from "../../../../configs/apiRoutes";
import { useAxios } from "../../../../configs/useAxios";
import { RESPONSETYPES } from "../../../../constants";
import Select from "react-select";
import { EMPLOYEE_TABLE } from "../../../../configs/tableConfigs";
import TableGenerator from "../../../../App/components/TableGenerator";
import axios from "axios";
import CustomResponseMessage from "../../../../App/components/CustomResponseMessage";
import useFetch from "../../../../configs/useFetch";
import { getStation, dropDownvalues } from "../../../../configs/helpers";

const AddEmployee = () => {
  const { data: deptData, getData: fn1 } = useFetch(DEPARTMENTS);
  const { data: NSData, loading: ns, error: two, getData: fn2 } = useFetch(
    NURSINGSTATIONS
  );
  const {
    data: desigData,
    loading: desig,
    error: three,
    getData: fn3,
  } = useFetch(DESIGNATION);

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
      .get(EMPLOYEE)
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
    fn3();
    getApiData();
  };

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
    // AddNewEmployee(formdata);
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
    setValue("department", rowData.Department);
    setValue("nursingStation", rowData.NursingStation);
    setValue("designation", rowData.Designation);
    setValue("address", rowData.Address);
    setValue("photo", rowData.Photo);
    setValue("remarks", rowData.Remarks);
    setOpen(true);
  };

  const clearOutFn = () => {
    setInfo(false);
    setEditMode(false);
    setOpen(false);
    setValue("code", "");
    setValue("name", "");
    setValue("department", "");
    setValue("nursingStation", "");
    setValue("designation", "");
    setValue("address", "");
    setValue("photo", "");
    setValue("remarks", "");
    clearErrors();
  };

  const handleDeptChange = (item) => {
    setValue("department", item.value);
  };
  const handleStationChange = (item) => {
    setValue("nursingStation", item.value);
  };
  const handleDesigChange = (item) => {
    setValue("designation", item.value);
  };

  //Rendering the Table based on the Data from API
  function rendertable() {
    if (error) {
      return <RetryButton retryFn={getApiData} />;
    }
    if (data?.length == 0) {
      return <h4 className="text-success">No Data Found </h4>;
    } else if (
      data?.length > 0 &&
      deptData?.length > 0 &&
      desigData?.length > 0 &&
      NSData?.length > 0
    ) {
      const converteddata = data.map((item, i) => {
        let stationvalue = getStation(NSData, item.NursingStation);
        let deptValue = getStation(deptData, item.Department);
        let desigValue = getStation(desigData, item.Designation);
        return {
          ...item,
          station: stationvalue.label,
          dept: deptValue.label,
          desig: desigValue.label,
        };
      });
      return (
        <Row>
          <Col>
            <TableGenerator
              columns={EMPLOYEE_TABLE}
              data={converteddata}
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

  const AddNewEmployee = (apiData) => {
    console.log(apiData);
    setInfo(true);
    if (editMode) {
      const body = { ...apiData, Id: ID };
      apiRqst({
        method: "PUT",
        url: EMPLOYEE,
        data: body,
      }).then(() => {
        getApiData();
      });
    } else {
      const body = { ...apiData, Id: 0 };
      apiRqst({
        method: "POST",
        url: EMPLOYEE,
        data: body,
      }).then(() => {
        getApiData();
      });
    }
  };

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
              <form>
                <Card>
                  <Card.Header>
                    <Card.Title as="h5">Add Employee</Card.Title>
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
                          {...register("name")}
                          type="text"
                          placeholder="Name"
                          className="mb-3"
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextEmail1">
                      <Form.Label column sm="3">
                        Department
                      </Form.Label>
                      <Col sm="9">
                        <Controller
                          name="department"
                          control={control}
                          render={({ onChange, value, name, ref }) => (
                            <Select
                              className="basic-single"
                              classNamePrefix="select"
                              inputRef={ref}
                              defaultValue={
                                editMode &&
                                getStation(deptData, getValues("department"))
                              }
                              options={dropDownvalues(deptData)}
                              onChange={handleDeptChange}
                            />
                          )}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextEmail1">
                      <Form.Label column sm="3">
                        Nursing Station
                      </Form.Label>
                      <Col sm="9">
                        <Controller
                          name="nursingStation"
                          control={control}
                          render={({ onChange, value, name, ref }) => (
                            <Select
                              className="basic-single"
                              classNamePrefix="select"
                              inputRef={ref}
                              defaultValue={
                                editMode &&
                                getStation(NSData, getValues("nursingStation"))
                              }
                              options={dropDownvalues(NSData)}
                              onChange={handleStationChange}
                            />
                          )}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextEmail1">
                      <Form.Label column sm="3">
                        Designation
                      </Form.Label>
                      <Col sm="9">
                        <Controller
                          name="designation"
                          control={control}
                          render={({ onChange, value, name, ref }) => (
                            <Select
                              className="basic-single"
                              classNamePrefix="select"
                              inputRef={ref}
                              defaultValue={
                                editMode &&
                                getStation(desigData, getValues("designation"))
                              }
                              options={dropDownvalues(desigData)}
                              onChange={handleDesigChange}
                            />
                          )}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextEmail1">
                      <Form.Label column sm="3">
                        Address
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control
                          {...register("address")}
                          as="textarea"
                          rows="4"
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextEmail1">
                      <Form.Label column sm="3">
                        Photo
                      </Form.Label>
                      <Col sm="9">
                        {editMode && (
                          <img
                            src={
                              "https://avatars0.githubusercontent.com/u/7895451?s=460&v=4"
                            }
                            style={{
                              width: 40,
                              borderRadius: "50%",
                              margin: 10,
                            }}
                          />
                        )}

                        <input
                          {...register("photo")}
                          type="file"
                          accept=".jpg, .jpeg, .png"
                          id="inputAvatar"
                          onChange={() => alert("image upload started")}
                          className="hidden"
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextEmail1">
                      <Form.Label column sm="3">
                        Remarks
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control
                          {...register("remarks")}
                          type="text"
                          placeholder="Remarks"
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
                              className="shadow-5"
                              block
                              variant="primary"
                              onClick={handleSubmit(onSubmit)}
                            >
                              Submit
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
              </form>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      <Row className="mb-3">
        <Col>
          <Button onClick={() => setOpen(true)}>
            <i className="feather icon-plus" />
            Add Employee
          </Button>
        </Col>
      </Row>
      {rendertable()}
    </>
  );
};
export default AddEmployee;
