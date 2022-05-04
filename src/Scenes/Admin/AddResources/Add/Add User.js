import React, { useState, useEffect } from "react";
import { Row, Col, Card, Form, Button, Modal, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import ErrorText from "../../../../App/components/ErrorText";
import RetryButton from "../../../../App/components/RetryButton";
import { DEPARTMENTS, USER, USER_GROUP } from "../../../../configs/apiRoutes";
import { useAxios } from "../../../../configs/useAxios";
import { DEPARTMENT_TABLE, USERS } from "../../../../configs/tableConfigs";
import axios from "axios";
import CustomResponseMessage from "../../../../App/components/CustomResponseMessage";
import { RESPONSETYPES } from "../../../../constants";
import TableGenerator from "../../../../App/components/TableGenerator";
import { dropDownvalues, getStation } from "../../../../configs/helpers";
import Select from "react-select";
import useFetch from "../../../../configs/useFetch";

/**
 * Custom Component For Adding, Viewing , Editing , Deleting Departments
 */
const AddUser = () => {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [ID, setId] = useState("");
  const [info, setInfo] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm();

  const changeUserGroup = (item) => {
    setValue("userGroupId", item.value);
  };

  //Getting Dept Data from Backend
  const { data: UGData, loading, error: UGError, getData } = useFetch(
    USER_GROUP
  );
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const getApiData = () => {
    setData(null);
    setError(null);
    axios
      .get(USER)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setError("An error occurred. Awkward..");
      });
  };
  useEffect(() => {
    getApiData();
  }, []);

  const {
    response: postData,
    error: postError,
    loading: postLoading,
    apiRqst,
  } = useAxios();

  const onSubmit = (formdata) => {
    SubmitUserRole(formdata);
  };
  const SubmitUserRole = (apiData) => {
    setInfo(true);
    if (editMode) {
      const body = { ...apiData, Id: ID };
      apiRqst({
        method: "PUT",
        url: USER,
        data: body,
      }).then(() => {
        // const dataUpdate = data.splice();
        // objIndex = dataUpdate.findIndex((obj) => obj.Id === ID);
        // dataUpdate[objIndex] = body;
        // setData([...dataUpdate]);
        getApiData();
      });
    } else {
      const body = { ...apiData };
      apiRqst({
        method: "POST",
        url: USER,
        data: body,
      }).then(() => {
        getApiData();
        //  const dataUpdate = data.splice();
        //  dataUpdate.push(body);
        //  setData([...dataUpdate]);
      });
    }
  };

  // Edit Modal Configuration Function
  const changeToEditMode = (rowData) => {
    setEditMode(true);
    setId(rowData.Id);
    setValue("firstName", rowData.FirstName);
    setValue("lastName", rowData.LastName);
    setValue("email", rowData.Email);
    setValue("password", rowData.Password);
    setValue("userGroupId", rowData.UserGroupId);
    setOpen(true);
  };

  //Rendering the Table based on the Data from API
  function rendertable() {
    if (error) {
      return <RetryButton retryFn={getApiData} />;
    }
    if (data?.length == 0) {
      return <h4 className="text-success">No Data Found </h4>;
    } else if (data?.length > 0 && UGData?.length > 0) {
      const converteddata = data.map((item, i) => {
        let UGvalue = getStation(UGData, item.UserGroupId);

        return {
          ...item,
          userGroup: UGvalue.label,
        };
      });

      return (
        <Row>
          <Col>
            <TableGenerator
              columns={USERS}
              data={converteddata}
              setData={setData}
              onDeleteClick={() => alert("Delete")}
              onEditClick={changeToEditMode}
              onRefresh={getApiData}
              title="Available Users"
              url={USER}
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

  const clearOutFn = () => {
    setInfo(false);
    setEditMode(false);
    setOpen(false);
    setValue("firstName", "");
    setValue("lastName", "");
    setValue("email", "");
    setValue("password", "");
    setValue("userGroupId", "");
    clearErrors();
  };

  return (
    <>
      <Modal
        centered
        show={open}
        onHide={() => {
          clearOutFn();
        }}
        size="lg"
      >
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
                    <Card.Title as="h5">Add User</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Form.Group as={Row} controlId="formPlaintextEmail1">
                      <Form.Label column sm="3">
                        First Name
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control
                          // disabled={editMode ? true : false}
                          {...register("firstName", { required: true })}
                          type="text"
                          placeholder="First Name"
                          className="mb-3"
                        />
                        {errors.firstName && (
                          <ErrorText msg="This Field is Required" />
                        )}
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextEmail1">
                      <Form.Label column sm="3">
                        Last Name
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control
                          {...register("lastName")}
                          type="text"
                          placeholder="LastName"
                          className="mb-3"
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextEmail1">
                      <Form.Label column sm="3">
                        Email
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control
                          {...register("email", { required: true })}
                          type="text"
                          placeholder="Enter email"
                          className="mb-3"
                        />
                        {errors.email && (
                          <ErrorText msg="This Field is Required" />
                        )}
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextEmail1">
                      <Form.Label column sm="3">
                        Password
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control
                          {...register("password", { required: true })}
                          type="text"
                          placeholder="Enter Password"
                          className="mb-3"
                        />
                        {errors.password && (
                          <ErrorText msg="This Field is Required" />
                        )}
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextEmail1">
                      <Form.Label column sm="3">
                        User Role
                      </Form.Label>
                      {UGData?.length > 0 && (
                        <Col sm="9">
                          <Select
                            className="basic-single"
                            classNamePrefix="select"
                            defaultValue={
                              editMode &&
                              getStation(UGData, getValues("userGroupId"))
                            }
                            options={dropDownvalues(UGData)}
                            onChange={changeUserGroup}
                          />
                        </Col>
                      )}
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextEmail1">
                      <Form.Label column sm="3"></Form.Label>
                      <Col sm="9">
                        <Row>
                          <Col>
                            <Button
                              type="submit"
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
                              onClick={() => {
                                clearOutFn();
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
              </form>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      <Row className="mb-3">
        <Col>
          <Button onClick={() => setOpen(true)}>
            <i className="feather icon-plus" />
            Add User
          </Button>
        </Col>
      </Row>
      {rendertable()}
    </>
  );
};

export default AddUser;
