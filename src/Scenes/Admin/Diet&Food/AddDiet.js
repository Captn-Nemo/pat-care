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
import ErrorText from "../../../App/components/ErrorText";
import CustomResponseMessage from "../../../App/components/CustomResponseMessage";
import { DINING_TIMES } from "../../../constants";
import { useAxios } from "../../../configs/useAxios";
import Select from "react-select";

const AddDiet = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
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

  const clearOutFn = () => {
    setInfo(false);
    setEditMode(false);
    setOpen(false);
    setValue("name", "");
    setValue("code", "");
    setValue("notes", "");
    clearErrors();
  };

  const {
    response: postData,
    error: postError,
    loading: postLoading,
    apiRqst,
  } = useAxios();

  const onSubmit = (formdata) => {
    console.log(formdata);
    // AddNewCategory(formdata);
  };

  return (
    <Row className="justify-content-md-center">
      <Col md={6}>
        <form>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Add Diet</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form.Group as={Row} controlId="formPlaintextEmail1">
                <Form.Label column sm="3">
                  Code
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    {...register("code", {
                      required: true,
                    })}
                    type="text"
                    placeholder="Code"
                    className="mb-3"
                  />
                  {errors.code && <ErrorText msg="This Field is Required" />}
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextEmail1">
                <Form.Label column sm="3">
                  Name
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    {...register("name", {
                      required: true,
                    })}
                    type="text"
                    placeholder="Name"
                    className="mb-3"
                  />
                  {errors.name && <ErrorText msg="This Field is Required" />}
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextEmail1">
                <Form.Label column sm="3">
                  Notes
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
                        // defaultValue={
                        //   editMode &&
                        //   getStation(desigData, getValues("designation"))
                        // }
                        options={DINING_TIMES}
                        // onChange={handleDiningChnage}
                      />
                    )}
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

              <Row className="m-3">
                <Col md={12}>
                  <div className="form-group text-left">
                    <div className="checkbox checkbox-fill d-inline">
                      <input
                        type="checkbox"
                        name="checkbox-fill-1"
                        id="checkbox-fill-a1"
                      />
                      <label htmlFor="checkbox-fill-a1" className="cr">
                        {" "}
                        Item 1
                      </label>
                    </div>
                  </div>
                </Col>
                <Col md={12}>
                  <div className="form-group text-left">
                    <div className="checkbox checkbox-fill d-inline">
                      <input
                        type="checkbox"
                        name="checkbox-fill-2"
                        id="checkbox-fill-a2"
                      />
                      <label htmlFor="checkbox-fill-a2" className="cr">
                        {" "}
                        Item 1
                      </label>
                    </div>
                  </div>
                </Col>
                <Col md={12}>
                  <div className="form-group text-left">
                    <div className="checkbox checkbox-fill d-inline">
                      <input
                        type="checkbox"
                        name="checkbox-fill-3"
                        id="checkbox-fill-a3"
                      />
                      <label htmlFor="checkbox-fill-a3" className="cr">
                        {" "}
                        Item 1
                      </label>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </form>
      </Col>
    </Row>
  );
};

export default AddDiet;
