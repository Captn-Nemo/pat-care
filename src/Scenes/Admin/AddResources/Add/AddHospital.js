import React, { useState, useEffect } from "react";
import { Row, Col, Card, Form, Button, Modal, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import ErrorText from "../../../../App/components/ErrorText";
import RetryButton from "../../../../App/components/RetryButton";
import { HOSPITAL } from "../../../../configs/apiRoutes";
import { useAxios } from "../../../../configs/useAxios";
import { HOSPITAL_TABLE } from "../../../../configs/tableConfigs";
import axios from "axios";
import CustomResponseMessage from "../../../../App/components/CustomResponseMessage";
import { RESPONSETYPES } from "../../../../constants";
import TableGenerator from "../../../../App/components/TableGenerator";

/**
 * Custom Component For Adding, Viewing , Editing , Deleting Departments
 */
const AddHospital = () => {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [ID, setId] = useState("");
  const [info, setInfo] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = (formdata) => {
    console.log(formdata);
    addNewHosptial(formdata);
  };

  //Getting Dept Data from Backend
  // const { data, loading, error, getData } = useFetch(DEPARTMENTS);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const getApiData = () => {
    setLoading("loading...");
    setData(null);
    setError(null);
    axios
      .get(HOSPITAL)
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
    setValue("Code", rowData.Code);
    setValue("Name", rowData.Name);
    setValue("Address", rowData.Notes);
    setOpen(true);
  };

  //Rendering the Table based on the Data from API
  function rendertable() {
    if (error) {
      return <RetryButton retryFn={getApiData} />;
    }
    if (data?.length == 0) {
      return <h4 className="text-success">No Data Found </h4>;
    } else if (data?.length > 0) {
      return (
        <Row>
          <Col>
            <TableGenerator
              columns={HOSPITAL_TABLE}
              data={data}
              setData={setData}
              // onDeleteClick={() => alert("Delete")}
              onEditClick={changeToEditMode}
              onRefresh={getApiData}
              title="Availabel Hospitals"
              url={HOSPITAL}
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

  const addNewHosptial = (apiData) => {
    console.log(apiData);
    setInfo(true);
    if (editMode) {
      const body = { ...apiData, Id: ID };
      apiRqst({
        method: "PUT",
        url: HOSPITAL,
        data: body,
      }).then(() => {
        getApiData();
      });
    } else {
      const body = { ...apiData, Id: 0 };
      apiRqst({
        method: "POST",
        url: HOSPITAL,
        data: body,
      }).then(() => {
        getApiData();
      });
    }
  };

  const clearOutFn = () => {
    setInfo(false);
    setEditMode(false);
    setOpen(false);
    setValue("Name", "");
    setValue("Code", "");
    setValue("Notes", "");
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
                    <Card.Title as="h5">Add Hospital</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Form.Group as={Row} controlId="formPlaintextEmail1">
                      <Form.Label column sm="3">
                        Code
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control
                          // disabled={editMode ? true : false}
                          {...register("Code", { required: true })}
                          type="text"
                          placeholder="Code"
                          className="mb-3"
                        />
                        {errors.code && (
                          <ErrorText msg="This Field is Required" />
                        )}
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextEmail1">
                      <Form.Label column sm="3">
                        Name
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control
                          {...register("Name", { required: true })}
                          type="text"
                          placeholder="Name"
                          className="mb-3"
                        />
                        {errors.name && (
                          <ErrorText msg="This Field is Required" />
                        )}
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextEmail1">
                      <Form.Label column sm="3">
                        Notes
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control
                          {...register("Address", { required: true })}
                          as="textarea"
                          rows="4"
                          placeholder="Address"
                        />
                        {errors.notes && (
                          <ErrorText msg="This Field is Required" />
                        )}
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
            Add Hospital
          </Button>
        </Col>
      </Row>
      {rendertable()}
    </>
  );
};

export default AddHospital;
