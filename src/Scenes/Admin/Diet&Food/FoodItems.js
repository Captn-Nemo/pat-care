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
import { useForm } from "react-hook-form";
import ErrorText from "../../../App/components/ErrorText";
import RetryButton from "../../../App/components/RetryButton";
import { FOOD_ITEMS } from "../../../configs/apiRoutes";
import useFetch from "../../../configs/useFetch";
import { useAxios } from "../../../configs/useAxios";
import { FOOD_ITEMS_TABLE } from "../../../configs/tableConfigs";
import TableGenerator from "../../../App/components/TableGenerator";
import Notifications from "../../../App/components/Notifications";
import CustomResponseMessage from "../../../App/components/CustomResponseMessage";
import { RESPONSETYPES } from "../../../constants";
import axios from "axios";

const FoodItems = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm();

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [ID, setId] = useState("");
  const [info, setInfo] = useState(true);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(false);

  const getApiData = () => {
    setLoading("loading...");
    setData(null);
    setError(null);
    axios
      .get(FOOD_ITEMS)
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

  const clearOutFn = () => {
    setInfo(false);
    setEditMode(false);
    setOpen(false);
    setImage(false);
    setValue("name", "");
    setValue("code", "");
    setValue("description", "");
    setValue("imagePath", "");
    clearErrors();
  };

  const {
    response: postData,
    error: postError,
    loading: postLoading,
    apiRqst,
  } = useAxios();

  function getBase64(e) {
    // setImage(false);
    // var file = e.target.files[0];
    // let reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onload = () => {
    //   setValue("imgPath", reader.result);
    //   setImage(true);
    // };
    // reader.onerror = function(error) {
    //   console.log("Error: ", error);
    // };

    setValue("imagePath", null);
  }

  const AddNewFood = (apiData) => {
    console.log(apiData);
    setInfo(true);
    if (editMode) {
      const body = { ...apiData, Id: ID };
      apiRqst({
        method: "PUT",
        url: FOOD_ITEMS,
        data: body,
      }).then(() => {
        getApiData();
      });
    } else {
      const body = { ...apiData, Id: 0 };
      apiRqst({
        method: "POST",
        url: FOOD_ITEMS,
        data: body,
      }).then(() => {
        getApiData();
      });
    }
  };

  const onSubmit = (formdata) => {
    console.log(formdata);
    AddNewFood(formdata);
  };

  const changeToEditMode = (rowData) => {
    setEditMode(true);
    setId(rowData.Id);
    setValue("code", rowData.Code);
    setValue("name", rowData.Name);
    setValue("description", rowData.Notes);
    setValue("imagePath", null);
    setOpen(true);
  };

  //Rendering the Table based on the Data from API
  function rendertable() {
    if (error) {
      return <RetryButton retryFn={getApiData} />;
    }
    if (data?.length > 0) {
      return (
        <Row>
          <Col>
            <TableGenerator
              columns={FOOD_ITEMS_TABLE}
              data={data}
              url={FOOD_ITEMS}
              onDeleteClick={() => alert("Delete")}
              onEditClick={changeToEditMode}
              onRefresh={getApiData}
              title="Available Food Items"
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
                    <Card.Title as="h5">Add Food Item</Card.Title>
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
                          {...register("description", { required: true })}
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
                      <Form.Label column sm="3">
                        Notes
                      </Form.Label>
                      <Col sm="9">
                        {/* {editMode && (
                          <img
                            src={getValues("rowData")}
                            style={{
                              width: 40,
                              borderRadius: "50%",
                              margin: 10,
                            }}
                          />
                        )} */}
                        {getValues("imagePath") != "" && (
                          <img
                            src={getValues("imagePath")}
                            style={{
                              width: 40,
                              borderRadius: "50%",
                              margin: 10,
                            }}
                          />
                        )}
                        <input
                          // {...register("imagePath")}
                          type="file"
                          accept=".jpg, .jpeg, .png"
                          id="inputAvatar"
                          onChange={getBase64}
                          className="hidden"
                        />
                      </Col>
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
          <Button variant="success" onClick={() => setOpen(true)}>
            <i className="feather icon-plus" />
            Add Food Item
          </Button>
        </Col>
      </Row>
      {rendertable()}
    </>
  );
};

export default FoodItems;
