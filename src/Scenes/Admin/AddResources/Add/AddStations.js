import React, { useState, useEffect } from "react";
import { Row, Col, Card, Form, Button, Modal, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import ErrorText from "../../../../App/components/ErrorText";
import RetryButton from "../../../../App/components/RetryButton";
import { NURSINGSTATIONS } from "../../../../configs/apiRoutes";
import { useAxios } from "../../../../configs/useAxios";
import { NS_TABLE } from "../../../../configs/tableConfigs";
import TableGenerator from "../../../../App/components/TableGenerator";
import axios from "axios";
import { RESPONSETYPES } from "../../../../constants";
import CustomResponseMessage from "../../../../App/components/CustomResponseMessage";

const AddStations = () => {
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
      .get(NURSINGSTATIONS)
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
    AddNursingStation(formdata);
  };
  const {
    response: postData,
    error: postError,
    loading: postLoading,
    apiRqst,
  } = useAxios();

  const changeToEditMode = (rowData) => {
    setEditMode(true);
    setId(rowData.Id);
    setValue("code", rowData.Code);
    setValue("name", rowData.Name);
    setValue("notes", rowData.Notes);
    setOpen(true);
  };

  const AddNursingStation = (apiData) => {
    setInfo(true);
    if (editMode) {
      const body = { ...apiData, Id: ID };
      console.log(body);
      apiRqst({
        method: "PUT",
        url: NURSINGSTATIONS,
        data: body,
      }).then(() => {
        getApiData();
      });
    } else {
      const body = { ...apiData, Id: 0 };
      console.log(body);
      apiRqst({
        method: "POST",
        url: NURSINGSTATIONS,
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
    setValue("name", "");
    setValue("code", "");
    setValue("notes", "");
    clearErrors();
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
              columns={NS_TABLE}
              data={data}
              onDeleteClick={() => alert("Delete")}
              onEditClick={changeToEditMode}
              onRefresh={getApiData}
              title="Available Stations"
              url={NURSINGSTATIONS}
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
              <form>
                <Card>
                  <Card.Header>
                    <Card.Title as="h5">Add Nursing Station</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Form.Group as={Row} controlId="formPlaintextEmail1">
                      <Form.Label column sm="3">
                        Code
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control
                          {...register("code", { required: true })}
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
                          {...register("name", { required: true })}
                          type="text"
                          placeholder="name"
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
                          {...register("notes", { required: true })}
                          as="textarea"
                          rows="4"
                          placeholder="Notes"
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
            Add Nursing Station
          </Button>
        </Col>
      </Row>
      {rendertable()}
    </>
  );
};

export default AddStations;
